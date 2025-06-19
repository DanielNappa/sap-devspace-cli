import {
  Method,
  sendRequest,
  verifyDefaultLandscape,
} from "../utils/devspace-utils";
import { getTenantMetadata } from "./get-devspace";
import { isAppStudio } from "./is-app-studio";
import { compact, join, split } from "lodash";
import type { ResponseType } from "axios";

function logRequest(request: any) {
  const headers = { ...request.config.headers };

  if (headers["x-approuter-authorization"]) {
    headers["x-approuter-authorization"] = `bearer ${
      request.jwt.length > 1 ? "true" : "false"
    }`;
  }

  const loggableRequest = {
    ...request,
    config: {
      ...request.config,
      headers,
    },
  };

  console.log("sendAiRequest", JSON.stringify(loggableRequest, null, 2));
}

/**
 * This function can only be used from within the vscode extension context
 */
export default async function sendAiRequest(
  request: {
    path: string;
    method: string;
    config?: {
      data?: unknown;
      headers?: Record<string, string>;
      responseType?: ResponseType;
    } & Record<string, unknown>;
  },
  useProxy: boolean,
  jwtoken?: string,
): Promise<unknown> {
  const opts: { url: { domain: string; path: string }; jwt?: string } = {
    url: { domain: "", path: "" },
  };
  let domain: string,
    proxy = useProxy ? "secure-outbound-connectivity" : "";
  if (!(await isAppStudio())) {
    // redirect to llm proxy in non-BAS environment with applying jwt
    const { jwt, landscape } = await verifyDefaultLandscape();
    const { host } = await getTenantMetadata({ landscape, jwt });

    domain = `https://${host}`;
    proxy = `secure-outbound-connectivity`;
    opts.jwt = jwt;
  } else {
    // redirect to H2O in BAS environment
    domain = process.env.H2O_URL ?? "";
  }
  opts.url = {
    domain,
    path: join(compact(split(`${proxy}/llm/${request.path}`, "/")), "/"),
  };
  console.log(
    "sendAiRequest",
    JSON.stringify(
      {
        config: {
          ...request.config,
          headers: {
            ...request.config?.headers,
            ...(jwtoken && {
              "x-approuter-authorization": `bearer ${
                jwtoken.length > 1
                  ? "jwt was passed in but is redacted in this log"
                  : "false"
              }`,
            }),
            "AI-Resource-Group":
              request.config?.headers?.["AI-Resource-Group"] ?? "default",
          },
        },
        ...opts?.jwt &&
          { "jwt": `bearer ${opts?.jwt.length > 1 ? "true" : "false"}` },
        ...opts,
        method: request.method as Method,
      },
      null,
      2,
    ),
  );
  // send request
  return sendRequest({
    config: {
      ...request.config,
      headers: {
        ...request.config?.headers,
        "AI-Resource-Group": request.config?.headers?.["AI-Resource-Group"] ??
          "default",
      },
    },
    jwt: jwtoken,
    ...opts,
    method: request.method as Method,
  });
}
