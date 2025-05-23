import { strict as assert } from "assert";
import { ensureFileSync } from "fs-extra";
import { intro, log, outro } from "@clack/prompts";
import type { devspace } from "@sap/bas-sdk";
import color from "picocolors";
import { LANDSCAPE_CONFIG_PATH, SAP_LOGO } from "@/consts.ts";
import { getDevSpaces, selectDevSpace } from "@/devspace";
import {
  getLandscapesConfig,
  type LandscapeConfig,
  selectLandscape,
  setLandscapeURL,
} from "@/landscape";
import ssh, {
  type DevSpaceNode,
  getSSHConfigurations,
  runChannelClient,
  SSH_SOCKET_PORT,
  type SSHConfigInfo,
  SSHD_SOCKET_PORT,
} from "@/ssh";

// Entry point of CLI
async function main(): Promise<void> {
  intro(color.bgCyan(" sap-devspace-cli "));
  log.message(
    SAP_LOGO.split("\n").map((line) => color.cyanBright(line)).join("\n"),
  );

  ensureFileSync(LANDSCAPE_CONFIG_PATH);
  const landscapesConfig: LandscapeConfig[] = getLandscapesConfig();
  if (!landscapesConfig || landscapesConfig.length === 0) {
    await setLandscapeURL();
  }

  const newLandscapesConfig: LandscapeConfig[] = getLandscapesConfig();

  assert(newLandscapesConfig !== null);
  assert(newLandscapesConfig.length > 0);

  const landscapeSession = await selectLandscape(newLandscapesConfig);
  const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
    landscapeSession.url,
    landscapeSession.jwt,
  );
  const devSpace: DevSpaceNode = await selectDevSpace(
    devSpaces,
    landscapeSession.url,
  );
  const sshConfig: SSHConfigInfo = await getSSHConfigurations(
    devSpace,
    landscapeSession.jwt,
  );
  await runChannelClient({
    host: `port${SSHD_SOCKET_PORT}-${new URL(devSpace.wsURL).hostname}`,
    landscape: devSpace.landscapeURL,
    localPort: sshConfig.port,
    jwt: landscapeSession.jwt
  });
}

await main();
