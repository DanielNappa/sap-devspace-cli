import { strict as assert } from "assert";
import { URL } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureFileSync } from "fs-extra";
import { uniqueBy } from "@/utils";
import {
  cancel,
  confirm,
  isCancel,
  log,
  type Option,
  select,
  text,
} from "@clack/prompts";
import { closeListener, getJWT, hasJWT } from "@/auth";
import { LANDSCAPE_CONFIG_PATH } from "@/consts.ts";
import open from "open";
import { core } from "@sap/bas-sdk";

// Adaptation from https://github.com/SAP/app-studio-toolkit/tree/main/packages/app-studio-toolkit/src/devspace-manager/landscape

export type LandscapeConfig = { url: string; default?: boolean };
export interface LandscapeInfo {
  name: string;
  url: string;
  isLoggedIn: boolean;
  default?: boolean;
}
export type LandscapeSession = {
  name: string;
  url: string;
  jwt: string;
};

function isLandscapeLoggedIn(url: string): Promise<boolean> {
  assert(url !== null);
  return hasJWT(url);
}

export async function getLandscapes(): Promise<LandscapeInfo[]> {
  const landscapes: LandscapeInfo[] = [];
  for (const landscape of getLandscapesConfig()) {
    const url = new URL(landscape.url);
    landscapes.push(
      Object.assign(
        {
          name: url.hostname,
          url: url.toString(),
          isLoggedIn: await isLandscapeLoggedIn(landscape.url),
        },
        landscape.default ? { default: landscape.default } : {},
      ),
    );
  }
  return landscapes;
}

export async function loginToLandscape(landscapeURL: string): Promise<boolean> {
  const allowOpen: boolean | symbol = await confirm({
    message: "Open browser to authenticate?",
  });

  if (isCancel(allowOpen) || !allowOpen) {
    cancel("Operation cancelled");
    await closeListener(landscapeURL);
    return process.exit(0);
  }

  return !!open(core.getExtLoginPath(landscapeURL));
}

export async function selectLandscape(
  landscapesConfig: LandscapeConfig[],
): Promise<LandscapeSession> {
  assert(landscapesConfig !== null);
  assert(landscapesConfig.length > 0);

  const landscapes: Option<number | string>[] = [];

  for (let i = 0; i < landscapesConfig.length; i++) {
    const landscape = landscapesConfig[i] as LandscapeConfig;
    landscapes.push(
      Object.assign(
        {
          value: i,
          label: new URL(landscape.url).hostname,
        },
        landscape.default ? { hint: "Default" } : {},
      ),
    );
  }

  const selectedLandscapeIndex = await select({
    message: "Select a landscape:",
    options: landscapes,
  });

  if (isCancel(selectedLandscapeIndex)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  assert(selectedLandscapeIndex !== null);
  assert(typeof selectedLandscapeIndex === "number");

  const selectedLandscape =
    landscapesConfig[selectedLandscapeIndex] as LandscapeConfig;
  assert(selectedLandscape !== null);

  return {
    name: new URL(selectedLandscape.url).hostname,
    url: selectedLandscape.url,
    jwt: await getJWT(selectedLandscape.url),
  };
}

export function getLandscapesConfig(): LandscapeConfig[] {
  //  - new format:  {"url":"https://example.com","default":true}|{"url":"https://example2.com"}
  //  - old format:  https://example.com,https://example2.com
  ensureFileSync(LANDSCAPE_CONFIG_PATH);
  const configBuffer: string = readFileSync(LANDSCAPE_CONFIG_PATH, {
    encoding: "utf8",
    flag: "r",
  });
  // check if it is an old format - replace `,` with `|` - TODO: remove this in future (backward compatibility)
  // split by | and parse each landscape
  const config: string = /.*\{.+\}.*/.test(configBuffer)
    ? configBuffer
    : configBuffer.replace(/,/g, "|");
  return uniqueBy(
    config.split("|").map((landscape) => {
      try {
        const item: LandscapeConfig = JSON.parse(landscape);
        return Object.assign(
          { url: new URL(item.url).toString() },
          item.default ? { default: item.default } : {},
        );
      } catch (error) {
        // if not a valid JSON - consider it as a URL - TODO: remove this in future (backward compatibility)
        if (landscape.trim().length > 0) {
          return { url: landscape };
        }
      }
    }).filter(Boolean),
    "url",
  );
}

export async function updateLandscapesConfig(
  values: LandscapeConfig[],
): Promise<void> {
  const value: string = values.map((item) => JSON.stringify(item)).join("|");
  assert(value !== null);

  writeFileSync(LANDSCAPE_CONFIG_PATH, value);
  log.message(`Landscapes config updated: ${value}`);
}

export async function removeLandscape(landscapeURL: string): Promise<void> {
  assert(landscapeURL !== null);
  const config: LandscapeConfig[] = getLandscapesConfig();
  assert(config !== null);
  if (config.length > 0) {
    const toRemove: string = new URL(landscapeURL).toString();
    const updated: LandscapeConfig[] = config.filter(
      (landscape) => new URL(landscape.url).toString() !== toRemove,
    );
    if (updated.length !== config.length) {
      return updateLandscapesConfig(updated);
    }
  }
}

export async function setLandscapeURL(): Promise<void> {
  const landscapeURL: string | symbol = await text({
    message: "Enter your Landscape URL:",
    validate(input: string) {
      try {
        const inputURL: URL = new URL(input);
        if (inputURL.pathname.length > 1 || inputURL.search || inputURL.hash) {
          return "Enter the URL origin without any paths or parameters";
        }
      } catch (error) {
        return (error as Error).toString();
      }
    },
  });

  if (isCancel(landscapeURL)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  assert(landscapeURL !== null);

  if (landscapeURL) {
    // Need to change this
    return addLandscape(landscapeURL).finally(
      () => {},
    );
  }
}

export async function addLandscape(landscapeURL: string): Promise<void> {
  const toAdd = new URL(landscapeURL).toString();
  const landscapes = getLandscapesConfig();
  if (
    !landscapes.find((landscape) => new URL(landscape.url).toString() === toAdd)
  ) {
    landscapes.push({ url: toAdd });
    return updateLandscapesConfig(landscapes);
  }
}
