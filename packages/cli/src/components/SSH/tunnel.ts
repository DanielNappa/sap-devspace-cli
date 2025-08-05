import { spawn } from "node:child_process";
import WebSocket from "ws";
import type { Dispatch, SetStateAction } from "react";
import type { Instance } from "ink";
import {
  BaseStream,
  ObjectDisposedError,
  SshAlgorithms,
  SshClientSession,
  SshDisconnectReason,
  SshProtocolExtensionNames,
  SshSessionConfiguration,
  type Stream,
} from "@microsoft/dev-tunnels-ssh";
import { PortForwardingService } from "@microsoft/dev-tunnels-ssh-tcp";
import { BAS_INTERNAL_PROXY_PORT, PROXY_LOCAL_PORT } from "@/utils/consts.ts";
import { clearTerminal, onExit } from "@/utils/terminal.ts";
import { RenderSessionHeader } from "./SessionHeader.tsx";
import { getSSHConfigFilePath } from "./utils.ts";

const sessionMap: Map<string, SshClientSession> = new Map();

function closeSessions(sessions?: string[]): void {
  Array.from(sessionMap.entries()).forEach(([key, session]) => {
    if (sessions && !sessions.includes(key)) {
      return;
    }
    void session.close(SshDisconnectReason.byApplication);
    sessionMap.delete(key);
  });
}

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
        const error = new Error(reason);
        (<any> error).code = code;
        this.onError(error);
      }
    });
  }

  public async write(data: Buffer): Promise<void> {
    if (this.disposed) {
      throw new ObjectDisposedError(this);
    }
    if (!data) {
      throw new TypeError("Data is required.");
    }

    this.connection.send(data);
    return Promise.resolve();
  }

  public async close(error?: Error): Promise<void> {
    if (this.disposed) {
      throw new ObjectDisposedError(this);
    }

    if (!error) {
      this.connection.close();
    } else {
      this.connection.close((<any> error).code, error.message);
    }
    this.disposed = true;
    this.closedEmitter.fire({ error });
    this.onError(error || new Error("Stream closed."));
    return Promise.resolve();
  }

  public dispose(): void {
    if (!this.disposed) {
      this.connection.close();
    }
    super.dispose();
  }
}

/* istanbul ignore next */
export async function ssh(
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
  setLoading: Dispatch<SetStateAction<boolean>>,
  setMessage: Dispatch<SetStateAction<string>>,
  exit: (error?: Error) => void,
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
    const localPort: number = parseInt(opts.client.port, 10);
    await pfs.forwardToRemotePort(
      "127.0.0.1", // remote host inside the dev-space
      localPort, // local port you randomly chose
      "127.0.0.1", // local host
      2222, // remote port (the dev-space’s SSHD)
    );
    setMessage(
      `SSH connected to ${opts.displayName} on port ${localPort}`,
    );
    sessionMap.set(serverURI, session);

    await pfs.forwardToRemotePort(
      "127.0.0.1", // remote host inside the dev-space
      PROXY_LOCAL_PORT,
      "127.0.0.1",
      BAS_INTERNAL_PROXY_PORT, // BAS internal proxy port
    );

    setLoading(false);
    clearTerminal();
    onExit();
    exit();

    const sshCommand: string = [
      "ssh",
      "-i",
      opts.pkFilePath,
      "-p",
      `${localPort}`,
      "-o",
      "StrictHostKeyChecking=no", // For first connection to localhost
      "-o",
      "UserKnownHostsFile=/dev/null", // Avoids polluting known_hosts for localhost ports
      `${opts.username}@127.0.0.1`,
    ].join(" ");

    const instance: Instance = RenderSessionHeader({
      localPort: localPort,
      sshConfigFile: getSSHConfigFilePath(),
      pkFilePath: opts.pkFilePath,
      sshCommand: sshCommand,
    });

    instance.unmount();

    const sshProcess = spawn("ssh", [
      "-i",
      opts.pkFilePath,
      "-p",
      `${localPort}`,
      "-o",
      "StrictHostKeyChecking=no", // For first connection to localhost
      "-o",
      "UserKnownHostsFile=/dev/null", // Avoids polluting known_hosts for localhost ports
      `${opts.username}@127.0.0.1`,
    ], {
      stdio: "inherit",
      env: process.env,
    });

    // When the user’s ssh exits, close the tunneled session cleanly
    sshProcess.on(
      "exit",
      (code: number | null, signal: NodeJS.Signals | null) => {
        console.log(
          `SSH process exited (code=${code}, signal=${signal}), closing tunnel…`,
        );
        void session.close(SshDisconnectReason.byApplication)
          .catch((err) => console.error("Error closing SSH session:", err));
        sessionMap.delete(serverURI);
        closeSessions();
      },
    );
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
