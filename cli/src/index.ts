import { strict as assert } from "assert";
import { existsSync } from "node:fs";
import { ensureFileSync } from "fs-extra";
import { intro, log, outro } from "@clack/prompts";
import color from "picocolors";
import { LANDSCAPE_CONFIG_PATH, SAP_LOGO } from "@/consts.ts";
import {
  getLandscapesConfig,
  LandscapeConfig,
  setLandscapeURL,
} from "@/landscape";

// Entry point of CLI

async function main(): void {
  intro(color.bgCyan(" sap-devspace-cli "));
  log.message(
    SAP_LOGO.split("\n").map((line) => color.cyanBright(line)).join("\n"),
  );

  ensureFileSync(LANDSCAPE_CONFIG_PATH);
  const landscapesConfig: LandscapeConfig[] = getLandscapesConfig();
  if (!landscapesConfig || landscapesConfig.length === 0) {
    await setLandscapeURL();
  }

}
await main();
