import { strict as assert } from "assert";
import { URL } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureFileSync } from "fs-extra";
import { uniqueBy } from "@/utils";
import { cancel, isCancel, log, text } from "@clack/prompts";
import { LANDSCAPE_CONFIG_PATH } from "@/consts.ts";

// Adaptation from https://github.com/SAP/app-studio-toolkit/tree/main/packages/app-studio-toolkit/src/devspace-manager/landscape

export type LandscapeConfig = { url: string; default?: boolean };

export function getLandscapesConfig(): LandscapeConfig[] {
  //  - new format:  {"url":"https://example.com","default":true}|{"url":"https://example2.com"}
  //  - old format:  https://example.com,https://example2.com
  ensureFileSync(LANDSCAPE_CONFIG_PATH);
  const configBuffer = readFileSync(LANDSCAPE_CONFIG_PATH, {
    encoding: "utf8",
    flag: "r",
  });
  // check if it is an old format - replace `,` with `|` - TODO: remove this in future (backward compatibility)
  // split by | and parse each landscape
  const config = /.*\{.+\}.*/.test(configBuffer)
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
      } catch (e) {
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
  const value = values.map((item) => JSON.stringify(item)).join("|");
  assert(value !== null);

  writeFileSync(LANDSCAPE_CONFIG_PATH, value);
  log.message(`Landscapes config updated: ${value}`);
}

export async function setLandscapeURL(): Promise<void> {
  const landscapeURL: string = await text({
    message: "Enter your Landscape URL:",
    validate(input: string) {
      try {
        const inputURL: string = new URL(input);
        if (inputURL.pathname > 1 || inputURL.search || inputURL.hash) {
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

export async function addLandscape(landscapeName: string): Promise<void> {
  const toAdd = new URL(landscapeName).toString();
  const landscapes = getLandscapesConfig();
  if (
    !landscapes.find((landscape) => new URL(landscape.url).toString() === toAdd)
  ) {
    landscapes.push({ url: toAdd });
    return updateLandscapesConfig(landscapes);
  }
}
