import { strict as assert } from "node:assert";
import { devspace } from "@sap/bas-sdk";
import { deletePK, removeSSHConfig } from "@/components/SSH/utils.ts";
import { handleSubcommand } from "@/lib/cli/core.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import type { DevSpaceNode } from "@/utils/types.ts";
import { canDevSpaceStart, updateDevSpace } from "./utils.ts";

export async function handleSubcommandUpdateDevSpace(
  flags: {
    help: boolean | undefined;
    landscape: string | undefined;
    devspace: string | undefined;
  } & Record<string, unknown>,
  suspend: boolean,
): Promise<void> {
  const { devSpaceNode, jwt }: { devSpaceNode: DevSpaceNode; jwt: string } =
    await handleSubcommand(flags);
  assert(devSpaceNode != null);
  assert(jwt != null);

  // Start the Dev Space
  if (!suspend) {
    const canRun = await canDevSpaceStart(devSpaceNode.landscapeURL, jwt);
    if (devSpaceNode.status === devspace.DevSpaceStatus.RUNNING) {
      console.log(`The '${devSpaceNode.wsName}' dev space is already running`);
      process.exit(0);
    } else if (typeof canRun === `boolean` && canRun === true) {
      return await updateDevSpace(devSpaceNode, jwt, suspend);
    } else if (typeof canRun === `boolean` && canRun === false) {
      console.log(`Cannot start the '${devSpaceNode.wsName}' dev space`);
      process.exit(0);
    } else if (typeof canRun === `string`) {
      console.log(canRun);
      process.exit(0);
    }
  } else {
    if (devSpaceNode.status === devspace.DevSpaceStatus.STOPPED) {
      console.log(`The '${devSpaceNode.wsName}' dev space has already stopped`);
      process.exit(0);
    } else {
      return await updateDevSpace(devSpaceNode, jwt, suspend);
    }
  }
}

export async function handleSubcommandDelete(
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

  try {
    // Delete from API first to ensure it succeeds before local cleanup
    await devspace.deleteDevSpace(
      devSpaceNode.landscapeURL,
      jwt,
      devSpaceNode.id,
    );

    // Clean up local resources after successful API deletion
    deletePK(devSpaceNode.id);
    removeSSHConfig(devSpaceNode);

    console.log(devspaceMessages.info_devspace_deleted(devSpaceNode.wsName));
  } catch (error) {
    if (error instanceof Error) {
      const message = devspaceMessages.err_devspace_delete(
        devSpaceNode.wsName,
        error.toString(),
      );
      console.error(message);
      process.exit(1);
    }
  }
}
