import { Buffer } from "node:buffer";
import type { ChildProcess, StdioOptions } from "node:child_process";
import process from "node:process";
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

interface SpawnOptions {
  stdio: StdioOptions | undefined;
  env?: Record<string, string | undefined>;
  cwd?: string;
  onExit?: (
    exitCode: number | null,
    signalCode:
      | Deno.Signal
      | NodeJS.Signals
      | number
      | string
      | null
      | undefined,
  ) => void;
}
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

async function spawnProcess(
  command: string,
  args: string[],
  options: SpawnOptions,
): Promise<Bun.Subprocess | Deno.ChildProcess | ChildProcess> {
  const runtime = navigator.userAgent;

  if (runtime.startsWith("Bun")) {
    try {
      const sshBunCommand = Bun.spawn({
        cmd: [command, ...args],
        stdio: ["inherit", "inherit", "inherit"],
        env: options.env,
        cwd: options.cwd,
      });
      void sshBunCommand.exited.then(() => {
        options.onExit?.(
          sshBunCommand.exitCode,
          sshBunCommand.signalCode ?? null,
        );
      }).catch(() => {
        options.onExit?.(
          sshBunCommand.exitCode,
          sshBunCommand.signalCode ?? null,
        );
      });
      return sshBunCommand;
    } catch (error) {
      console.error("Failed to spawn Bun process:", error);
      throw error;
    }
  } else if (runtime.startsWith("Deno")) {
    const sshDenoCommand = new Deno.Command(command, {
      args: args,
      stdin: "inherit",
      stdout: "inherit",
    });
    const sshChildProcess: Deno.ChildProcess = sshDenoCommand.spawn();
    // Handle exit asynchronously
    sshChildProcess.status.then((status: Deno.CommandStatus) => {
      options.onExit?.(status.code, status.signal ?? null);
    });

    return sshChildProcess;
  } else {
    // Node.js - use standard spawn
    const { spawn } = await import("node:child_process");

    const sshProcess = spawn(command, args, options);
    sshProcess.on("exit", (code, signal) => {
      options.onExit?.(code, signal);
    });

    return sshProcess;
  }
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
      const { NobleECDH521, NobleECDSA521 } = await import(
        "@/lib/ssh/p521-adapter.ts"
      );
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

    const sshArgs: string[] = [
      "-i",
      opts.pkFilePath,
      "-p",
      `${localPort}`,
      "-o",
      "StrictHostKeyChecking=no", // For first connection to localhost
      "-o",
      "UserKnownHostsFile=/dev/null", // Avoids polluting known_hosts for localhost ports
      `${opts.username}@127.0.0.1`,
    ];

    const sshCommandString: string = ["ssh"].concat(sshArgs).join(" ");

    const instance: Instance = RenderSessionHeader({
      localPort: localPort,
      sshConfigFile: getSSHConfigFilePath(),
      pkFilePath: opts.pkFilePath,
      sshCommandString: sshCommandString,
    });

    instance.unmount();

    await spawnProcess("ssh", sshArgs, {
      stdio: "inherit",
      env: process.env,
      onExit(exitCode: number | null, signalCode) {
        // When the user’s ssh exits, close the tunneled session cleanly
        console.log(
          `SSH process exited (code=${exitCode}, signal=${signalCode}), closing tunnel…`,
        );
        void session.close(SshDisconnectReason.byApplication)
          .catch((err) => console.error("Error closing SSH session:", err));
        sessionMap.delete(serverURI);
        closeSessions();
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`SSH session dropped : ${error?.message}`);
    }
  }
}
