import { strict as assert } from "assert";
import { intro, log, outro } from "@clack/prompts";
import color from "picocolors";
import {
  getLandscapeConfig,
  LandscapeConfig,
  setLandscapeConfig,
} from "@clack/prompts";
import { LANDSCAPE_CONFIG_PATH, SAP_LOGO } from "@/consts.ts";

async function main(): void {
  intro(color.bgCyan(" sap-devspace-cli "));
  log.message(
    SAP_LOGO.split("\n").map((line) => color.cyanBright(line)).join("\n"),
  );
  // const landscapesConfig: LandscapeConfig[] = getLandscapesConfig();
}
await main();
