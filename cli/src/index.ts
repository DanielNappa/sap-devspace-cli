import { strict as assert } from "node:assert";
import { intro, log } from "@clack/prompts";
import { devspace } from "@sap/bas-sdk";
import color from "picocolors";
import { SAP_LOGO } from "@/consts.ts";
import {
  getDevSpaces,
  selectDevSpace,
  selectDevSpaceAction,
} from "@/devspace/index.ts";
import { landscapeMenu, type LandscapeSession } from "@/landscape/index.ts";
import { type DevSpaceNode } from "@/ssh/index.ts";
import { rootCertificateInjection } from "@/utils/index.ts";
import "@/utils/process.ts";

// Entry point of CLI
async function main(): Promise<void> {
  // Runs only on Win32 systems to inject system certificates to address issues with corporate networks
  await rootCertificateInjection();

  intro(color.bgCyan(" sap-devspace-cli "));
  log.message(
    SAP_LOGO.split("\n").map((line) => color.cyan(line)).join("\n"),
  );

  const landscapeSession: LandscapeSession = await landscapeMenu();
  assert(landscapeSession !== null);

  const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
    landscapeSession.url,
    landscapeSession.jwt,
  );
  assert(devSpaces !== null);
  const devSpaceNode: DevSpaceNode = await selectDevSpace(
    devSpaces,
    landscapeSession.url,
    landscapeSession.jwt,
  );
  assert(devSpaceNode !== null);
  await selectDevSpaceAction(devSpaceNode, landscapeSession.jwt);
}

await main();
