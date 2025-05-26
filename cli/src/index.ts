import { strict as assert } from "node:assert";
import { ensureFileSync } from "fs-extra";
import { intro, log } from "@clack/prompts";
import { devspace } from "@sap/bas-sdk";
import color from "picocolors";
import { LANDSCAPE_CONFIG_PATH, SAP_LOGO } from "@/consts.ts";
import { getDevSpaces, selectDevSpace } from "@/devspace/index.ts";
import { landscapeMenu, type LandscapeSession } from "@/landscape/index.ts";
import ssh, {
  type DevSpaceNode,
  getSSHConfigurations,
  runChannelClient,
  SSH_SOCKET_PORT,
  type SSHConfigInfo,
  SSHD_SOCKET_PORT,
} from "@/ssh/index.ts";
import { rootCertificateInjection } from "@/utils/index.ts";

// Entry point of CLI
async function main(): Promise<void> {
  // Runs only for Win32 to inject system certificates to address issues with corporate networks
  await rootCertificateInjection();

  intro(color.bgCyan(" sap-devspace-cli "));
  log.message(
    SAP_LOGO.split("\n").map((line) => color.cyan(line)).join("\n"),
  );

  const landscapeSession: LandscapeSession = await landscapeMenu();
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
  assert(sshConfig !== null);

  await runChannelClient({
    displayName: devSpace.label,
    host: `port${SSHD_SOCKET_PORT}-${new URL(devSpace.wsURL).hostname}`,
    landscape: devSpace.landscapeURL,
    localPort: sshConfig.port,
    jwt: landscapeSession.jwt,
    pkFilePath: sshConfig.pkFilePath,
  });
}

await main();
