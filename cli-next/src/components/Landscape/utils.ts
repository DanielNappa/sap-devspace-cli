import { strict as assert } from "node:assert";
import { URL } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureFileSync } from "fs-extra";
import { core } from "@sap/bas-sdk";
import { getJWT } from "@/hooks/Auth.ts";
import { LANDSCAPE_CONFIG_PATH } from "@/utils/consts.ts";
import { uniqueBy } from "@/utils/utils.ts";
import { type LandscapeConfig, type LandscapeSession } from "@/utils/types.ts";

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
          { jwt: item.jwt ?? "" },
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

function updateLandscapesConfig(
  values: LandscapeConfig[],
): void {
  const value: string = values.map((item) => JSON.stringify(item)).join("|");
  assert(value != null);

  writeFileSync(LANDSCAPE_CONFIG_PATH, value);
}

export function removeLandscape(landscapeURL: string): void {
  assert(landscapeURL != null);
  const config: LandscapeConfig[] = getLandscapesConfig();
  assert(config != null);
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

export function addLandscape(
  landscapeURL: string,
  jwt?: string,
): void {
  const toAdd = new URL(landscapeURL).toString();
  const landscapes = getLandscapesConfig();
  if (
    !landscapes.find((landscape) => new URL(landscape.url).toString() === toAdd)
  ) {
    landscapes.push({ url: toAdd, jwt: jwt });
    return updateLandscapesConfig(landscapes);
  }
}

export function deleteLandscape(
  selectedLandscape: LandscapeConfig,
): void {
  assert(selectedLandscape != null);
  return removeLandscape(selectedLandscape.url);
  // console.log(`Deleted ${selectedLandscape.url}`);
}

export async function createLandscapeSession(
  selectedLandscape: LandscapeConfig,
): Promise<LandscapeSession> {
  assert(selectedLandscape != null);

  // If jwt exists and is not expired then use it otherwise update existing
  // LandscapeConfig with new JWT
  const jwt: string =
    !!(selectedLandscape?.jwt && selectedLandscape.jwt.length > 1 &&
        !core.isJwtExpired(selectedLandscape.jwt))
      ? selectedLandscape.jwt
      : await getJWT(selectedLandscape.url);

  // Update existing config if JWT didn't previously exist for landscape URL
  if (!selectedLandscape.hasOwnProperty("jwt") || !selectedLandscape?.jwt) {
    removeLandscape(selectedLandscape.url);
    addLandscape(selectedLandscape.url, jwt);
  }

  return {
    name: new URL(selectedLandscape.url).hostname,
    url: selectedLandscape.url,
    jwt: jwt,
  };
}
