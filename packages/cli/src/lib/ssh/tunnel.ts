import { Buffer } from "node:buffer";
import process from "node:process";
import WebSocket from "ws";
import type { Dispatch, SetStateAction } from "react";
import {
  BaseStream,
  KeyExchangeAlgorithm,
  ObjectDisposedError,
  PublicKeyAlgorithm,
  SshAlgorithms,
  SshClientSession,
  SshDisconnectReason,
  SshProtocolExtensionNames,
  SshSessionConfiguration,
  type Stream,
} from "@microsoft/dev-tunnels-ssh";
import { PortForwardingService } from "@microsoft/dev-tunnels-ssh-tcp";
import { BAS_INTERNAL_PROXY_PORT, PROXY_LOCAL_PORT } from "@/utils/consts.ts";

const sessionMap: Map<string, SshClientSession> = new Map();

/* istanbul ignore next */
class connectionClientStream extends BaseStream {
  public constructor(private readonly connection: WebSocket) {
    super();
    connection.on(
      "message",
      (data: WebSocket.RawData, isBinary: boolean) => {
        if (isBinary) {
          const buffer: Buffer<ArrayBufferLike> = Buffer.isBuffer(data)
            ? data
            : Buffer.from(data as ArrayBuffer);
          this.onData(buffer);
        }
      },
    );
    connection.on("close", (code?: number, reason?: string) => {
      if (!code) {
        this.onEnd();
      } else {
        const error = new Error(reason) as Error & { code?: number };
        error.code = code ?? 1011;
        this.onError(error);
      }
    });
  }

  public write(data: Buffer): Promise<void> {
    if (this.disposed) {
      throw new ObjectDisposedError(this);
    }
    if (!data) {
      throw new TypeError("Data is required.");
    }

    this.connection.send(data);
    return Promise.resolve();
  }

  public close(error?: Error): Promise<void> {
    if (this.disposed) {
      throw new ObjectDisposedError(this);
    }

    if (!error) {
      this.connection.close();
    } else {
      this.connection.close(
        (error as Error & { code?: number }).code ?? 1011,
        error.message,
      );
    }
    this.disposed = true;
    this.closedEmitter.fire({ error });
    this.onError(error || new Error("Stream closed."));
    return Promise.resolve();
  }

  public override dispose(): void {
    if (!this.disposed) {
      this.connection.close();
    }
    super.dispose();
  }
}

export async function sshProxyCommand(
  opts: {
    displayName: string;
    host: {
      url: string;
      port: string;
    };
    client: {
      port: string;
    };
    username: string;
    jwt: string;
    pkFilePath: string;
  },
): Promise<void> {
  const runtime = navigator.userAgent;
  const serverURI = `wss://${opts.host.url}:${opts.host.port}`;
  // close the opened session if exists
  const isContinue = new Promise((res) => {
    const session = sessionMap.get(serverURI);
    if (session) {
      void session
        .close(SshDisconnectReason.byApplication)
        .finally(() => res(true));
    } else {
      res(true);
    }
  });
  await isContinue;

  const config = new SshSessionConfiguration();
  try {
    const useWebCrypto: boolean = (() => {
      try {
        return typeof globalThis === "object" &&
          !!(globalThis.crypto?.subtle?.importKey);
      } catch {
        return false;
      }
    })();
    if (useWebCrypto) {
      const { NobleECDH521, NobleECDSA521 } = await import("./p521-adapter.ts");
      SshAlgorithms.keyExchange.ecdhNistp521Sha512 = new NobleECDH521(
        "ecdh-sha2-nistp521",
        521,
        "SHA2-512",
      );
      SshAlgorithms.publicKey.ecdsaSha2Nistp521 = new NobleECDSA521(
        "ecdsa-sha2-nistp521",
        "SHA2-512",
      );
    }
  } catch (error: unknown) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(
      `[ssh] Failed to enable P-521 algorithms with WebCrypto. Falling back. Reason: ${reason}`,
    );
  } finally {
    // Ensure slots are populated to avoid null assertions later.
    // Prefer existing values; otherwise fall back to broadly supported algorithms.
    SshAlgorithms.keyExchange.ecdhNistp521Sha512 =
      SshAlgorithms.keyExchange.ecdhNistp521Sha512 ??
        SshAlgorithms.keyExchange.ecdhNistp256Sha256 ??
        SshAlgorithms.keyExchange.curve25519Sha256 ??
        null;

    SshAlgorithms.publicKey.ecdsaSha2Nistp521 =
      SshAlgorithms.publicKey.ecdsaSha2Nistp521 ??
        SshAlgorithms.publicKey.ecdsaSha2Nistp256 ??
        SshAlgorithms.publicKey.rsa2048 ??
        null;

    if (!SshAlgorithms.keyExchange.ecdhNistp521Sha512) {
      console.warn(
        "[ssh] No suitable key exchange algorithm available; connection may fail.",
      );
    }
    if (!SshAlgorithms.publicKey.ecdsaSha2Nistp521) {
      console.warn(
        "[ssh] No suitable ECDSA algorithm available; relying on RSA if configured.",
      );
    }
  }
  const kexCandidates = [
    SshAlgorithms.keyExchange.ecdhNistp521Sha512,
    SshAlgorithms.keyExchange.ecdhNistp256Sha256,
    SshAlgorithms.keyExchange.curve25519Sha256,
  ].filter(Boolean);

  if (kexCandidates.length === 0) {
    throw new Error("[ssh] No suitable key exchange algorithm available.");
  }
  config.keyExchangeAlgorithms.push(
    ...kexCandidates as (KeyExchangeAlgorithm | null)[],
  );

  const publicKeyCandidates = [
    SshAlgorithms.publicKey.ecdsaSha2Nistp521,
    SshAlgorithms.publicKey.ecdsaSha2Nistp256,
    SshAlgorithms.publicKey.rsa2048,
  ].filter(Boolean);

  if (publicKeyCandidates.length === 0) {
    throw new Error("[ssh] No suitable public key algorithm available.");
  }
  config.publicKeyAlgorithms.push(
    ...publicKeyCandidates as (PublicKeyAlgorithm | null)[],
  );
  config.publicKeyAlgorithms.push(SshAlgorithms.publicKey.rsa2048!);
  config.encryptionAlgorithms.push(SshAlgorithms.encryption.aes256Gcm!);
  config.protocolExtensions.push(SshProtocolExtensionNames.sessionReconnect);
  config.protocolExtensions.push(SshProtocolExtensionNames.sessionLatency);

  config.addService(PortForwardingService);

  const websocket = new WebSocket(serverURI, "ssh", {
    origin: undefined,
    headers: {
      Authorization: `bearer ${opts.jwt}`,
    },
  });

  const stream = await new Promise<Stream>((resolve, reject) => {
    websocket.on("open", () => {
      resolve(new connectionClientStream(websocket));
    });
    websocket.on("error", function (error: unknown) {
      reject(new Error(`Failed to connect to server at ${serverURI}:${error}`));
    });
  });

  const session = new SshClientSession(config);
  try {
    await session.connect(stream);
    void session.onAuthenticating((error) => {
      // there is no authentication in this solution
      error.authenticationPromise = Promise.resolve({});
    });

    // authorise client by name 'user'
    await session.authenticateClient({
      username: opts.username,
      publicKeys: [],
    });

    const pfs: PortForwardingService = session.activateService(
      PortForwardingService,
    );
    const localPort: number = parseInt(opts.client.port, 10);
    await pfs.forwardToRemotePort(
      "127.0.0.1", // remote host inside the dev-space
      localPort, // local port you randomly chose
      "127.0.0.1", // local host
      2222, // remote port (the dev-space’s SSHD)
    );
    sessionMap.set(serverURI, session);
    if (runtime.startsWith("Deno")) {
      const socket: Deno.TcpConn = await Deno.connect({
        port: localPort,
        hostname: "127.0.0.1",
      });

      try {
        // Set up bidirectional piping
        await Promise.all([
          Deno.stdin.readable.pipeTo(socket.writable),
          socket.readable.pipeTo(Deno.stdout.writable),
        ]);
      } catch (error) {
        console.error("ProxyCommand connection error:", error);
        await session.close(SshDisconnectReason.byApplication).catch((err) =>
          console.error("Error closing SSH session:", err)
        );
        sessionMap.delete(serverURI);
        socket.close();
        Deno.exit(1);
      }

      // Clean exit after streams complete
      await session.close(SshDisconnectReason.byApplication)
        .catch((error: unknown) =>
          console.error("Error closing SSH session:", error)
        );
      sessionMap.delete(serverURI);
      socket.close();
      Deno.exit(0);
    } else {
      const net = await import("node:net");
      const socket = net.connect(localPort, "127.0.0.1", () => {
        // Pipe SSH client ↔ socket
        process.stdin.pipe(socket);
        socket.pipe(process.stdout);
      });

      // When the remote side closes, exit cleanly
      socket.on("close", () => {
        void session.close(SshDisconnectReason.byApplication)
          .catch((err) => console.error("Error closing SSH session:", err));
        sessionMap.delete(serverURI);
        process.exit(0);
      });
      socket.on("error", (error) => {
        console.error("ProxyCommand socket error:", error);
        process.exit(1);
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`SSH session dropped : ${error?.message}`);
    }
  }
}

/* istanbul ignore next */
export async function forwardBASInternalProxy(
  opts: {
    displayName: string;
    host: {
      url: string;
      port: string;
    };
    username: string;
    jwt: string;
  },
  setLoading: Dispatch<SetStateAction<boolean>>,
  setMessage: Dispatch<SetStateAction<string>>,
): Promise<void> {
  setMessage(`Connecting to ${opts.displayName}`);
  const serverURI = `wss://${opts.host.url}:${opts.host.port}`;
  // close the opened session if exists
  const isContinue = new Promise((res) => {
    const session = sessionMap.get(serverURI);
    if (session) {
      void session
        .close(SshDisconnectReason.byApplication)
        .finally(() => res(true));
    } else {
      res(true);
    }
  });
  await isContinue;

  const config = new SshSessionConfiguration();
  config.keyExchangeAlgorithms.push(
    SshAlgorithms.keyExchange.ecdhNistp521Sha512!,
  );
  config.publicKeyAlgorithms.push(SshAlgorithms.publicKey.ecdsaSha2Nistp521!);
  config.publicKeyAlgorithms.push(SshAlgorithms.publicKey.rsa2048!);
  config.encryptionAlgorithms.push(SshAlgorithms.encryption.aes256Gcm!);
  config.protocolExtensions.push(SshProtocolExtensionNames.sessionReconnect);
  config.protocolExtensions.push(SshProtocolExtensionNames.sessionLatency);

  config.addService(PortForwardingService);

  const websocket = new WebSocket(serverURI, "ssh", {
    origin: undefined,
    headers: {
      Authorization: `bearer ${opts.jwt}`,
    },
  });

  const stream = await new Promise<Stream>((resolve, reject) => {
    websocket.on("open", () => {
      resolve(new connectionClientStream(websocket));
    });
    websocket.on("error", function (error: unknown) {
      reject(new Error(`Failed to connect to server at ${serverURI}:${error}`));
    });
  });

  const session = new SshClientSession(config);
  try {
    await session.connect(stream);
    void session.onAuthenticating((error) => {
      // there is no authentication in this solution
      error.authenticationPromise = Promise.resolve({});
    });

    // authorise client by name 'user'
    await session.authenticateClient({
      username: opts.username,
      publicKeys: [],
    });

    const pfs: PortForwardingService = session.activateService(
      PortForwardingService,
    );
    sessionMap.set(serverURI, session);

    await pfs.forwardToRemotePort(
      "127.0.0.1", // remote host inside the dev-space
      PROXY_LOCAL_PORT,
      "127.0.0.1",
      BAS_INTERNAL_PROXY_PORT, // BAS internal proxy port
    );
    setMessage(
      `PortForwardingService connected to ${opts.displayName} on port ${PROXY_LOCAL_PORT}`,
    );
    setLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`SSH session dropped : ${error?.message}`);
    }
  }
}
