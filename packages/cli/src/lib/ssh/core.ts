import { strict as assert } from "node:assert";
import process from "node:process";
import { devspace } from "@sap/bas-sdk";
import {
  getPK,
  savePK,
  SSH_SOCKET_PORT,
  SSHD_SOCKET_PORT,
} from "@/components/SSH/utils.ts";
import { handleSubcommand } from "@/lib/cli/core.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import type { DevSpaceNode } from "@/utils/types.ts";
import { getRandomArbitrary } from "@/utils/utils.ts";
import { sshProxyCommand } from "./tunnel.ts";

export async function handleSubcommandSSH(
  flags: {
    help: boolean | undefined;
    landscape: string | undefined;
    devspace: string | undefined;
  } & Record<string, unknown>,
): Promise<void> {
  const { devSpaceNode, jwt }: { devSpaceNode: DevSpaceNode; jwt: string } =
    await handleSubcommand(flags);
  assert(devSpaceNode != null);
  assert(jwt != null);

  // Start Dev Space if not already started
  try {
    await devspace.updateDevSpace(
      devSpaceNode.landscapeURL,
      jwt,
      devSpaceNode.id,
      {
        Suspended: false,
        WorkspaceDisplayName: devSpaceNode.wsName,
      },
    );
    // While the status of the Dev Space hasn't changed depending on the suspend variable
    while (
      (await devspace.getDevspaceInfo({
        landscapeUrl: devSpaceNode.landscapeURL,
        jwt: jwt,
        wsId: devSpaceNode.id,
      })).status !== devspace.DevSpaceStatus.RUNNING
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(devspaceMessages.err_ws_update(
        devSpaceNode.id,
        error.toString(),
      ));
    }
    process.exit(1);
  }

  // Poll the API until it gives us a non-empty wsURL
  while (devSpaceNode.wsURL.length === 0) {
    const info: devspace.DevspaceInfo = await devspace.getDevspaceInfo({
      landscapeUrl: devSpaceNode.landscapeURL,
      jwt,
      wsId: devSpaceNode.id,
    });
    assert(info != null);
    devSpaceNode.wsURL = info.url;
  }

  getPK(devSpaceNode.landscapeURL, jwt, devSpaceNode.id).then(
    (pk: string) => {
      const pkFilePath = savePK(pk, devSpaceNode.id);
      const host: string = `port${SSHD_SOCKET_PORT}-${
        new URL(devSpaceNode.wsURL).hostname
      }`;
      const port = getRandomArbitrary();
      sshProxyCommand(
        {
          displayName: devSpaceNode.label,
          host: { url: host, port: `${SSH_SOCKET_PORT}` },
          client: { port: `${port}` },
          username: "user",
          jwt: jwt,
          pkFilePath: pkFilePath,
        },
      );
    },
  );
}
