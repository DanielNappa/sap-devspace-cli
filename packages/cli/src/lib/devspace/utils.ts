import { strict as assert } from "node:assert";
import process from "node:process";
import { devspace } from "@sap/bas-sdk";
import { getDevSpaces } from "@/components/DevSpace/utils.ts";
import { addLandscape, removeLandscape } from "@/components/Landscape/utils.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import type {
  DevSpaceNode,
  LandscapeConfig,
  LandscapeSession,
} from "@/utils/types.ts";

const MAX_RUNNING_DEVSPACES: number = 2;

function getHostnameOrThrow(landscapeURL: string): string {
  try {
    return new URL(landscapeURL).hostname;
  } catch {
    throw new Error(`Invalid URL: ${landscapeURL}`);
  }
}

export async function getDevSpace(
  devSpaceDisplayName: string,
  selectedLandscape: LandscapeConfig,
  jwt: string,
): Promise<DevSpaceNode> {
  // Update existing config if JWT didn't previously exist for landscape URL, and overwrite the config with the new JWT
  removeLandscape(selectedLandscape.url);
  addLandscape(selectedLandscape.url, jwt);

  const landscapeSession: LandscapeSession = {
    name: getHostnameOrThrow(selectedLandscape.url),
    url: selectedLandscape.url,
    jwt: jwt,
  };
  const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
    landscapeSession.url,
    landscapeSession.jwt,
  ).catch(() => {
    console.error(
      "\nInvalid landscape URL or JWT. Please re-authenticate in interactive mode.\n",
    );
    process.exit(1);
  });

  const result: devspace.DevspaceInfo | undefined = devSpaces.find((
    devSpace: devspace.DevspaceInfo,
  ) => devSpace.devspaceDisplayName === devSpaceDisplayName);
  // Dev Space Display Name passed in through argv doesn't exist in any of the dev spaces returned from the API
  if (!result) {
    console.error(
      "\nDev Space not found. Please create a new Dev Space in interactive mode.\n",
    );
    process.exit(1);
  }

  return {
    label: `${result.devspaceDisplayName} (${result.packDisplayName})`,
    id: result.id,
    landscapeURL: selectedLandscape.url,
    wsName: result.devspaceDisplayName,
    wsURL: result.url,
    status: result.status,
  };
}

export async function canDevSpaceStart(
  landscapeURL: string,
  jwt: string,
): Promise<boolean | string> {
  assert(landscapeURL != null);
  assert(jwt != null);
  const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
    landscapeURL,
    jwt,
  );
  if (!devSpaces) return false;
  if (
    devSpaces.filter(
      (devSpace: devspace.DevspaceInfo) =>
        devSpace.status === devspace.DevSpaceStatus.RUNNING ||
        devSpace.status === devspace.DevSpaceStatus.STARTING,
    ).length < MAX_RUNNING_DEVSPACES
  ) {
    return true;
  } else {
    console.log(`There are already 2 Dev Spaces running for ${landscapeURL}`);
    return false;
  }
}

export async function updateDevSpace(
  devSpaceNode: DevSpaceNode,
  jwt: string,
  suspend: boolean,
): Promise<void> {
  await devspace
    .updateDevSpace(devSpaceNode.landscapeURL, jwt, devSpaceNode.id, {
      Suspended: suspend,
      WorkspaceDisplayName: devSpaceNode.wsName,
    });
  try {
    // While the status of the Dev Space hasn't changed depending on the suspend variable
    while (
      (await devspace.getDevspaceInfo({
        landscapeUrl: devSpaceNode.landscapeURL,
        jwt: jwt,
        wsId: devSpaceNode.id,
      })).status !== (suspend
        ? devspace.DevSpaceStatus.STOPPED
        : devspace.DevSpaceStatus.RUNNING)
    );
    console.log(
      devspaceMessages.info_devspace_state_updated(
        devSpaceNode.wsName,
        devSpaceNode.id,
        suspend,
      ),
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      const message = devspaceMessages.err_ws_update(
        devSpaceNode.id,
        error.toString(),
      );
      console.error(message);
      console.trace(error);
    }
  }
}
