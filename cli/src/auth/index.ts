import { strict as assert } from "assert";
import { cancel, confirm, isCancel, log } from "@clack/prompts";
import { core } from "@sap/bas-sdk";
import { type Context, Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { devspaceMessages, JWT_TIMEOUT } from "@/consts.ts";
import { loginToLandscape } from "@/landscape";

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
          log.error(devspaceMessages.err_incorrect_jwt(landscapeURL));
          reject(new Error(devspaceMessages.err_incorrect_jwt(landscapeURL)));
        } else {
          // log.info(`JWT received from remote for ${landscapeURL}`);
          log.info("Received JWT");
          resolve(jwt);
          return context.json({ status: "ok" });
        }
      } catch (error) {
        context.status(400);
        log.error(devspaceMessages.err_incorrect_jwt(landscapeURL));
        reject(new Error(devspaceMessages.err_incorrect_jwt(landscapeURL)));
      }
    });
    const server: Bun.Server = Bun.serve({
      port: EXT_LOGIN_PORTNUM,
      fetch: app.fetch,
      error(this: Bun.Server, error: Bun.ErrorLike) {
        log.error(devspaceMessages.err_listening(error.message, landscapeURL));
        reject(
          new Error(
            devspaceMessages.err_listening(error.message, landscapeURL),
          ),
        );
      },
    });

    serverCache.set(landscapeURL, server);
  });
}

export async function closeListener(landscapeURL: string): Promise<void> {
  await serverCache.get(landscapeURL)?.stop();
  serverCache.delete(landscapeURL);
  // log.info(`Closed server for ${landscapeURL}`);
}

async function getJWTFromServerWithTimeout(
  ms: number,
  promise: Promise<string>,
): Promise<string> {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise<string>((resolve, reject) => {
    const delay = setTimeout(() => {
      clearTimeout(delay);
      reject(new Error(devspaceMessages.err_get_jwt_timeout(ms)));
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
}

async function onJWTReceived(opt: {
  accepted: boolean;
  jwtPromise: Promise<string>;
  landscapeURL: string;
}): Promise<void> {
  return closeListener(opt.landscapeURL);
}

async function retrieveJWTFromRemote(
  landscapeURL: string,
): Promise<string | undefined> {
  const jwtPromise = getJWTFromServerWithTimeout(
    JWT_TIMEOUT,
    getJWTFromServer(landscapeURL),
  );

  return receiveJWT({
    accepted: await loginToLandscape(landscapeURL),
    jwtPromise,
    landscapeURL,
  });
}

async function receiveJWT(opt: {
  accepted: boolean;
  jwtPromise: Promise<string>;
  landscapeURL: string;
}): Promise<string | undefined> {
  // browser open not accepted
  if (!opt.accepted) {
    await closeListener(opt.landscapeURL);
    return; // not waiting for jwtPromise fulfilled
  }
  return opt.jwtPromise.finally(() => void onJWTReceived(opt));
}

export function retrieveJWT(landscapeURL: string): Promise<string | void> {
  return retrieveJWTFromRemote(landscapeURL).catch((error) => {
    log.error(error.message);
  });
}

export async function getJWT(landscapeURL: string): Promise<string> {
  const accessToken: string | void = await retrieveJWT(landscapeURL);
  if (accessToken) {
    return accessToken;
  } else {
    log.error(devspaceMessages.err_get_jwt_not_exists);
    throw new Error(devspaceMessages.err_get_jwt_not_exists);
  }
}

export async function hasJWT(landscapeURL: string): Promise<boolean> {
  return getJWT(landscapeURL)
    .then((jwt) => !core.isJwtExpired(jwt))
    .catch((_) => false);
}
