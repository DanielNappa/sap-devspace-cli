import { strict as assert } from "assert";
import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { log } from "@clack/prompts";
import { JWT_TIMEOUT } from "@/consts.ts";

const EXT_LOGIN_PORTNUM = 55532;
const serverCache = new Map<string, Bun.Server>();

async function getJWTFromServer(landscapeURL: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const app: Hono = new Hono();

    app.use("*", cors());
    app.use("*", secureHeaders());

    app.post("/ext-login", async (context: Context) => {
      try {
        const body: Promise<any> = await context.req.json();
        const jwt: string | undefined = body?.jwt;
        assert(jwt !== null);

        if (!jwt || jwt.startsWith("<html>")) {
          context.status(400);
          await context.json({ status: "error" });
          log.error(messages.err_incorrect_jwt(landscapeURL));
          reject(new Error(messages.err_incorrect_jwt(landscapeURL)));
        } else {
          log.info(`JWT received from remote for ${landscapeURL}`);
          await context.json({ status: "ok" });
          resolve(jwt);
        }
      } catch (error) {
        context.status(400);
        log.error(messages.err_incorrect_jwt(landscapeURL));
        reject(new Error(messages.err_incorrect_jwt(landscapeURL)));
      }
    });
    const server: Bun.Server = Bun.serve({
      port: EXT_LOGIN_PORTNUM,
      fetch: app.fetch,
      error(_request, error: Error) {
        log.error(messages.err_listening(error.message, landscapeURL));
        reject(new Error(messages.err_listening(error.message, landscapeURL)));
      },
    });

    serverCache.set(landscapeURL, server);
  });
}
