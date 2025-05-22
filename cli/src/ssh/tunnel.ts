import { spawn } from "child_process";
import { client as WebSocketClient, connection as WebSocket } from "websocket";
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
import { log, outro } from "@clack/prompts";

const sessionMap: Map<string, SshClientSession> = new Map();

export function closeSessions(sessions?: string[]): void {
  Array.from(sessionMap.entries()).forEach(([key, session]) => {
    if (sessions && !sessions.includes(key)) {
      return;
    }
    void session.close(SshDisconnectReason.byApplication);
    sessionMap.delete(key);
  });
}

/* istanbul ignore next */
class WebSocketClientStream extends BaseStream {
  public constructor(private readonly websocket: WebSocket) {
    super();

    websocket.on(
      "message",
      (data: { type: string; binaryData: Buffer<ArrayBufferLike> }) => {
        if (data.type === "binary") {
          this.onData(data.binaryData);
        }
      },
    );
    websocket.on("close", (code?: number, reason?: string) => {
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

    this.websocket.send(data);
    return Promise.resolve();
  }

  public async close(error?: Error): Promise<void> {
    if (this.disposed) {
      throw new ObjectDisposedError(this);
    }

    if (!error) {
      this.websocket.close();
    } else {
      this.websocket.drop((<any> error).code, error.message);
    }
    this.disposed = true;
    this.closedEmitter.fire({ error });
    this.onError(error || new Error("Stream closed."));
    return Promise.resolve();
  }

  public dispose(): void {
    if (!this.disposed) {
      this.websocket.close();
    }
    super.dispose();
  }
}

/* istanbul ignore next */
export async function ssh(opts: {
  host: {
    url: string;
    port: string;
  };
  client: {
    port: string;
  };
  username: string;
  jwt: string;
}): Promise<void> {
  const serverUri = `wss://${opts.host.url}:${opts.host.port}`;
  // close the opened session if exists
  const isContinue = new Promise((res) => {
    const session = sessionMap.get(serverUri);
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

  const wsClient = new WebSocketClient();

  wsClient.connect(serverUri, "ssh", undefined, {
    Authorization: `bearer ${opts.jwt}`,
  });
  const stream = await new Promise<Stream>((resolve, reject) => {
    wsClient.on("connect", (connection: WebSocket) => {
      resolve(new WebSocketClientStream(connection));
    });
    wsClient.on("connectFailed", function error(error: any) {
      reject(new Error(`Failed to connect to server at ${serverUri}:${error}`));
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
    log.info(`SSH session connected`);
    sessionMap.set(serverUri, session);

    const sshProcess = spawn("ssh", [
      "-p",
      `${localPort}`,
      `${opts.username}@127.0.0.1`,
    ], {
      stdio: "inherit",
      env: process.env,
    });

    // 6) when the user’s ssh exits, close the tunneled session cleanly
    sshProcess.on(
      "exit",
      (code: number | null, signal: NodeJS.Signals | null) => {
        outro(
          `🔒 SSH process exited (code=${code}, signal=${signal}), closing tunnel…`,
        );
        void session.close(SshDisconnectReason.byApplication)
          .catch((err) => console.error("Error closing SSH session:", err));
        sessionMap.delete(serverUri);
      },
    );
  } catch (error) {
    outro(`SSH session dropped : ${error?.message}`);
  }
}
