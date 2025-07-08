import { strict as assert } from "node:assert";
import { clearTimeout, setTimeout } from "node:timers";
import { core } from "@sap/bas-sdk";
import chalk from "chalk";
import { type Context, Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { serve, type ServerType } from "@hono/node-server";
import { devspaceMessages, JWT_TIMEOUT } from "@/utils/consts.ts";

const EXT_LOGIN_PORTNUM = 55532;
const serverCache = new Map<string, ServerType>();

interface RequestBody {
  jwt?: string | undefined;
}

async function getJWTFromServer(landscapeURL: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const app: Hono = new Hono();

    app.use("*", cors());
    app.use("*", secureHeaders());

    app.post("/ext-login", async (context: Context) => {
      try {
        const body: RequestBody = await context.req.json();
        const jwt: string | undefined = await body?.jwt;
        assert(jwt != null);

        if (!jwt || jwt.startsWith("<html>")) {
          context.status(400);
          await context.json({ status: "error" });
          console.error(
            chalk.red(devspaceMessages.err_incorrect_jwt(landscapeURL)),
          );
          reject(new Error(devspaceMessages.err_incorrect_jwt(landscapeURL)));
        } else {
          resolve(jwt);
          return context.json({ status: "ok" });
        }
      } catch (_error: unknown) {
        context.status(400);
        console.error(
          chalk.red(devspaceMessages.err_incorrect_jwt(landscapeURL)),
        );
        reject(new Error(devspaceMessages.err_incorrect_jwt(landscapeURL)));
      }
    });
    const server: ServerType = serve({
      fetch: app.fetch,
      port: EXT_LOGIN_PORTNUM,
    });

    serverCache.set(landscapeURL, server);
  });
}

export async function closeListener(landscapeURL: string): Promise<void> {
  await serverCache.get(landscapeURL)?.close();
  serverCache.delete(landscapeURL);
}

async function getJWTFromServerWithTimeout(
  ms: number,
  promise: Promise<string>,
): Promise<string> {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise<string>((_resolve, reject) => {
    const delay = setTimeout(() => {
      clearTimeout(delay);
      reject(new Error(devspaceMessages.err_get_jwt_timeout(ms)));
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
}

async function onJWTReceived(opt: {
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
    jwtPromise,
    landscapeURL,
  });
}

async function receiveJWT(opt: {
  jwtPromise: Promise<string>;
  landscapeURL: string;
}): Promise<string | undefined> {
  return opt.jwtPromise.finally(() => void onJWTReceived(opt));
}

function retrieveJWT(landscapeURL: string): Promise<string | void> {
  return retrieveJWTFromRemote(landscapeURL).catch((error) => {
    console.error(chalk.red(error.message));
  });
}

export async function getJWT(landscapeURL: string): Promise<string> {
  const accessToken: string | void = await retrieveJWT(landscapeURL);
  if (accessToken) {
    return accessToken;
  } else {
    console.error(chalk.red(devspaceMessages.err_get_jwt_not_exists));
    throw new Error(devspaceMessages.err_get_jwt_not_exists);
  }
}

export async function hasJWT(landscapeURL: string): Promise<boolean> {
  return getJWT(landscapeURL)
    .then((jwt) => !core.isJwtExpired(jwt))
    .catch((_) => false);
}
