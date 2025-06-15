import { strict as assert } from "node:assert";
import process from "node:process";
import {
  cancel,
  confirm,
  isCancel,
  log,
  type Option,
  select,
  spinner,
} from "@clack/prompts";
import { devspace } from "@sap/bas-sdk";
import { devspaceMessages } from "@/consts.ts";
import {
  type DevSpaceNode,
  getSSHConfigurations,
  runChannelClient,
  type SSHConfigInfo,
  SSHD_SOCKET_PORT,
} from "@/ssh/index.ts";

enum DevSpaceMenuOption {
  CONNECT,
  START,
  STOP,
  DELETE,
}

export async function getDevSpaces(
  landscapeURL: string,
  jwt: string,
): Promise<devspace.DevspaceInfo[]> {
  const inputURL: URL = new URL(landscapeURL);
  assert(!(inputURL.pathname.length > 1));
  assert(!inputURL.search);
  assert(!inputURL.hash);
  assert(jwt !== null);
  return await devspace.getDevSpaces(landscapeURL, jwt);
}

export async function selectDevSpace(
  devSpaces: devspace.DevspaceInfo[],
  landscapeURL: string,
): Promise<DevSpaceNode> {
  assert(devSpaces !== null);
  if (devSpaces.length === 0) {
    process.exit(0);
  }
  assert(devSpaces.length > 0);

  const devSpaceOptions: Option<number | string>[] = [];

  for (let i = 0; i < devSpaces.length; i++) {
    const devSpace = devSpaces[i] as devspace.DevspaceInfo;
    devSpaceOptions.push(
      Object.assign(
        {
          value: i,
          label:
            `${devSpace.devspaceDisplayName} (${devSpace.packDisplayName})`,
          hint: devSpace.status,
        },
      ),
    );
  }

  const selectedDevSpaceIndex = await select({
    message: "Select a Dev Space:",
    options: devSpaceOptions,
  });

  if (isCancel(selectedDevSpaceIndex)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  assert(selectedDevSpaceIndex !== null);
  assert(typeof selectedDevSpaceIndex === "number");

  const selectedDevSpace =
    devSpaces[selectedDevSpaceIndex] as devspace.DevspaceInfo;
  assert(selectedDevSpace !== null);

  return {
    label:
      `${selectedDevSpace.devspaceDisplayName} (${selectedDevSpace.packDisplayName})`,
    id: selectedDevSpace.id,
    landscapeURL: landscapeURL,
    wsName: selectedDevSpace.devspaceDisplayName,
    wsURL: selectedDevSpace.url,
    status: selectedDevSpace.status,
  };
}

async function canDevSpaceStart(
  landscapeURL: string,
  jwt: string,
): Promise<boolean | string> {
  assert(landscapeURL !== null);
  assert(jwt !== null);
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
    log.info(`There are 2 Dev Spaces running for ${landscapeURL}`);
    return false;
  }
}

async function updateDevSpace(
  landscapeURL: string,
  wsID: string,
  wsName: string,
  jwt: string,
  suspend: boolean,
): Promise<void> {
  const spinIndicator = spinner();
  spinIndicator.start(
    devspaceMessages.info_devspace_state_inital_message(wsName, wsID, suspend),
  );
  return devspace
    .updateDevSpace(landscapeURL, jwt, wsID, {
      Suspended: suspend,
      WorkspaceDisplayName: wsName,
    })
    .then(async () => {
      // While the status of the Dev Space hasn't changed depending on the suspend variable
      while (
        (await devspace.getDevspaceInfo({
          landscapeUrl: landscapeURL,
          jwt: jwt,
          wsId: wsID,
        })).status !== (suspend
          ? devspace.DevSpaceStatus.STOPPED
          : devspace.DevSpaceStatus.RUNNING)
      );
      spinIndicator.stop(
        devspaceMessages.info_devspace_state_updated(wsName, wsID, suspend),
      );
    }).catch((error) => {
      const message = devspaceMessages.err_ws_update(wsID, error.toString());
      log.error(message);
      console.trace(error);
    });
}

async function startDevSpace(
  devSpace: DevSpaceNode,
  jwt: string,
  suspend: boolean,
): Promise<void> {
  assert(devSpace !== null);
  assert(jwt !== null);

  const canRun = await canDevSpaceStart(devSpace.landscapeURL, jwt);
  if (typeof canRun === `boolean` && canRun === true) {
    return updateDevSpace(
      devSpace.landscapeURL,
      devSpace.id,
      devSpace.wsName,
      jwt,
      suspend,
    );
  } else if (typeof canRun === `string`) {
    log.info(canRun);
  }
}

export async function selectDevSpaceAction(
  devSpaceNode: DevSpaceNode,
  jwt: string,
): Promise<void> {
  assert(devSpaceNode !== null);
  assert(devSpaceNode.label !== null);
  assert(devSpaceNode.id !== null);
  assert(devSpaceNode.landscapeURL !== null);
  assert(devSpaceNode.wsName !== null);
  assert(devSpaceNode.wsURL !== null);
  assert(devSpaceNode.status !== null);
  assert(jwt !== null);

  while (true) {
    // Need to get the Dev Space's status on each iteration
    const devSpaceStatus: string = (await devspace.getDevspaceInfo({
      landscapeUrl: devSpaceNode.landscapeURL,
      jwt: jwt,
      wsId: devSpaceNode.id,
    })).status;

    const isReady = devSpaceStatus === devspace.DevSpaceStatus.RUNNING;

    const options: Option<number | string>[] = [
      isReady
        ? {
          value: DevSpaceMenuOption.CONNECT,
          label: "Connect to Dev Space (SSH)",
        }
        : {
          value: DevSpaceMenuOption.START,
          label: "Start Dev Space",
        },
      ...(isReady
        ? [{
          value: DevSpaceMenuOption.STOP,
          label: "Stop Dev Space",
        }]
        : []),
      {
        value: DevSpaceMenuOption.DELETE,
        label: "Delete Dev Space",
      },
    ];

    const selectedOption: symbol | number | string = await select({
      message: "Select an option:",
      options: options,
    });

    if (isCancel(selectedOption)) {
      cancel("Exiting...");
      return process.exit(0);
    }

    assert(selectedOption !== null);
    assert(typeof selectedOption === "number");

    switch (selectedOption) {
      case DevSpaceMenuOption.CONNECT: {
        const sshConfig: SSHConfigInfo = await getSSHConfigurations(
          devSpaceNode,
          jwt,
        );
        assert(sshConfig !== null);
        return await runChannelClient({
          displayName: devSpaceNode.label,
          host: `port${SSHD_SOCKET_PORT}-${
            new URL(devSpaceNode.wsURL).hostname
          }`,
          landscape: devSpaceNode.landscapeURL,
          localPort: sshConfig.port,
          jwt: jwt,
          pkFilePath: sshConfig.pkFilePath,
        });
      }
      case DevSpaceMenuOption.START:
        await startDevSpace(devSpaceNode, jwt, false);
        break;
      case DevSpaceMenuOption.STOP:
        await updateDevSpace(
          devSpaceNode.landscapeURL,
          devSpaceNode.id,
          devSpaceNode.wsName,
          jwt,
          true,
        );
        break;
      case DevSpaceMenuOption.DELETE: {
        const allowOpen: boolean | symbol = await confirm({
          message: `Are you sure you want to delete ${devSpaceNode.label}?`,
        });

        if (isCancel(allowOpen) || !allowOpen) {
          cancel("Operation cancelled");
        } else {
          const spinIndicator = spinner();
          spinIndicator.start(`Deleting ${devSpaceNode.label}`);
          devspace.deleteDevSpace(
            devSpaceNode.landscapeURL,
            jwt,
            devSpaceNode.id,
          );
          spinIndicator.stop(`Deleted ${devSpaceNode.label}`);
        }
        break;
      }
      default:
        // Shouldn't even reach here
        cancel("Exiting...");
        return process.exit(0);
    }
  }
}
