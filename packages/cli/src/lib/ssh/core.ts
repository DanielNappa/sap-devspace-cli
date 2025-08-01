import { strict as assert } from "node:assert";
import { core, devspace } from "@sap/bas-sdk";
import { getDevSpaces } from "@/components/DevSpace/utils.ts";
import {
  addLandscape,
  getLandscapesConfig,
  removeLandscape,
} from "@/components/Landscape/utils.ts";
import {
  deletePK,
  getPK,
  removeSSHConfig,
  savePK,
  SSH_SOCKET_PORT,
  SSHD_SOCKET_PORT,
} from "@/components/SSH/utils.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import type {
  DevSpaceNode,
  LandscapeConfig,
  LandscapeSession,
} from "@/utils/types.ts";
import { getRandomArbitrary } from "@/utils/utils.ts";
import { sshProxyCommand } from "./tunnel.ts";

async function getDevSpace(
  devSpaceDisplayName: string,
  selectedLandscape: LandscapeConfig,
  jwt: string,
): Promise<DevSpaceNode> {
  // Update existing config if JWT didn't previously exist for landscape URL, and overwrite the config with the new JWT
  removeLandscape(selectedLandscape.url);
  addLandscape(selectedLandscape.url, jwt);

  const landscapeSession: LandscapeSession = {
    name: new URL(selectedLandscape.url).hostname,
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

async function canDevSpaceStart(
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
    ).length < 2
  ) {
    return true;
  } else {
    console.log(`There are already 2 Dev Spaces running for ${landscapeURL}`);
    return false;
  }
}

async function updateDevSpace(
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

async function handleSubcommand(
  flags: {
    help: boolean | undefined;
    landscape: string | undefined;
    devspace: string | undefined;
  } & Record<string, unknown>,
): Promise<{ devSpaceNode: DevSpaceNode; jwt: string }> {
  assert(flags.devspace != null);
  assert(flags.landscape != null);

  const landscapes: LandscapeConfig[] = getLandscapesConfig();
  const landscapeURL: string = new URL(flags.landscape).toString();
  const result: LandscapeConfig | undefined = landscapes.find((
    landscapeConfig: LandscapeConfig,
  ) => new URL(landscapeConfig.url).toString() === landscapeURL);
  // Landscape URL passed in through argv doesn't exist in the landscape-config.json
  if (!result) {
    console.error(
      "\nLandscape URL not found. Please authenticate in interactive mode.\n",
    );
    process.exit(1);
  } else {
    // Sanity check for JWT
    if (
      !(result?.jwt && result.jwt.length > 1 && !core.isJwtExpired(result.jwt))
    ) {
      console.error(
        "\nLandscape JWT not found or expired. Please re-authenticate in interactive mode.\n",
      );
      process.exit(1);
    } else {
      const jwt: string = result.jwt;
      const devSpaceNode: DevSpaceNode = await getDevSpace(
        flags.devspace,
        result,
        jwt,
      );

      return {
        devSpaceNode: devSpaceNode,
        jwt: jwt,
      };
    }
  }
}

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
