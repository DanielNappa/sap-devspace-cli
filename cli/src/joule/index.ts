import axios, {
  type AxiosResponse,
  type RawAxiosRequestHeaders,
  type ResponseType,
} from "axios";
import { log } from "@clack/prompts";
import type { Method } from "@sap/bas-sdk/dist/src/utils/devspace-utils";
import { PROXY_LOCAL_PORT } from "@/consts.ts";

export async function handlePromptMode(
  domain: string,
  prompt: string,
): Promise<void> {
  try {
    const response = await sendAiRequest({
      domain: domain,
      path: "v2/lm/deployments",
      method: "GET",
    });

    console.log("Final Response Data:");
    console.log(JSON.stringify(response?.data?.resources, null, 2) || []);
  } catch (error) {
    log.error(`Failed to get deployments: ${error}`);
    return;
  }
}

export async function sendAiRequest(request: {
  domain: string;
  path: string;
  method: string;
  config?: {
    data?: unknown;
    headers?: Record<string, string>;
    responseType?: ResponseType;
  } & Record<string, unknown>;
}): Promise<unknown> {
  const opts: { url: { domain: string; path: string }; jwt?: string } = {
    url: {
      domain: request.domain,
      path: `/llm/${request.path}`.split("/").filter(Boolean).join("/"),
    },
  };
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
    ...opts,
    method: request.method as Method,
  });
}

/**
 * Allow axios request to remote landscape
 * taken from @sap/bas-sdk
 * @param url - object, url parts of target url
 * @param method - string, request operation
 * @param data - object, (optional) additional data
 * @param jwt - string, (optional) authorization token
 * @returns
 */
export function sendRequest(request: {
  url: { domain: string; path: string };
  method: Method;
  jwt?: string;
  config?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore warning
    data?: any;
    headers?: RawAxiosRequestHeaders;
    responseType?: ResponseType;
  } & Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore warning
}): Promise<AxiosResponse<any, any>> {
  function makeUrl(landscape: string, pathName: string): string {
    const url = new URL(landscape);
    url.pathname = pathName;
    return url.toString();
  }
  return axios({
    method: request.method,
    url: makeUrl(request.url.domain, request.url.path),
    ...request.config,
    proxy: {
      host: "127.0.0.1",
      port: PROXY_LOCAL_PORT,
      protocol: "http",
    },
  });
}
