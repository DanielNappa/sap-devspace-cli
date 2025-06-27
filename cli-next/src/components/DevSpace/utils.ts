import { strict as assert } from "node:assert";
import process from "node:process";
import { devspace } from "@sap/bas-sdk";
import {
  createDevSpace,
  getDevSpacesSpec,
} from "@sap/bas-sdk/dist/src/apis/get-devspace";
import type {
  DevSpaceCreation,
  DevSpaceExtension,
  DevSpacePack,
  DevSpaceSpec,
} from "@sap/bas-sdk/dist/src/utils/devspace-utils";
import { devspaceMessages } from "@/consts.ts";
import {
  type DevSpaceNode,
  getSSHConfigurations,
  runChannelClient,
  type SSHConfigInfo,
  SSHD_SOCKET_PORT,
} from "@/ssh/index.ts";
import chalk from "chalk";

enum DevSpaceMenuOption {
  CONNECT,
  START,
  STOP,
  DELETE,
}

interface PackMetadata {
  allPredefinedExtensions: DevSpaceExtension[];
  predefined: {
    tagline: string;
    description: string;
    extensions: DevSpaceExtension[];
  };
  additional: {
    tagline: string;
    description: string;
    extensions: DevSpaceExtension[];
  };
}

export async function getDevSpaces(
  landscapeURL: string,
  jwt: string,
): Promise<devspace.DevspaceInfo[]> {
  const inputURL: URL = new URL(landscapeURL);
  assert(!(inputURL.pathname.length > 1));
  assert(!inputURL.search);
  assert(!inputURL.hash);
  assert(jwt != null);
  return await devspace.getDevSpaces(landscapeURL, jwt);
}

// async function createDevSpaceWrapper(
//   landscapeURL: string,
//   jwt: string,
// ): Promise<devspace.DevspaceInfo[]> {
//   const devSpaceName: string | symbol = await text({
//     message: "Enter Dev Space name:",
//     validate(input: string) {
//       try {
//         if (!(/^[a-zA-Z0-9][a-zA-Z0-9_]{0,39}$/.test(input))) {
//           return devspaceMessages.err_invalid_devspace_name;
//         }
//       } catch (error) {
//         return (error as Error).toString();
//       }
//     },
//   });

//   if (isCancel(devSpaceName)) {
//     cancel("Operation cancelled.");
//     process.exit(0);
//   }

//   assert(devSpaceName != null);
//   const devSpacesSpec = await getDevSpacesSpec(
//     landscapeURL,
//     jwt,
//   ) as DevSpaceSpec;

//   const packOptions: Option<string | DevSpacePack>[] = devSpacesSpec.packs
//     .filter((pack: DevSpacePack) => pack.name !== "PlatformTest")
//     .map((pack: DevSpacePack) => ({
//       value: pack,
//       label: pack.tagline || pack.name,
//       hint: pack.name,
//     }));
//   assert(packOptions != null);

//   const selectedPack = await select({
//     message: "What kind of application do you want to create?",
//     options: packOptions,
//   }) as DevSpacePack;
//   assert(selectedPack != null);

//   // Organize extensions based on the selected pack
//   const organizedData = organizePackExtensions(
//     selectedPack.name,
//     devSpacesSpec.packs,
//     devSpacesSpec.extensions,
//   ) as PackMetadata;

//   if (!organizedData) {
//     log.error("Could not process extension data for the selected pack.");
//     process.exit(0);
//   }

//   const additionalExtensionOptions = organizedData.additional.extensions.map((
//     extension,
//   ) => ({
//     value: extension,
//     label: `${extension.tagline || extension.name}`,
//     // hint: extension.description,
//   }));
//   assert(additionalExtensionOptions != null);
//   assert(additionalExtensionOptions.length > 0);

//   const selectedAdditionalExtensions = await multiselect({
//     message: organizedData.additional.description,
//     options: additionalExtensionOptions,
//     required: false,
//   }) as DevSpaceExtension[];

//   if (isCancel(selectedAdditionalExtensions)) {
//     cancel("Operation cancelled");
//     process.exit(0);
//   }

//   const predefinedExtensions: string[] = organizedData.allPredefinedExtensions
//     .map((
//       extension: DevSpaceExtension,
//     ) => `${extension.namespace}/${extension.name}`);
//   const optionalExtensions: string[] = selectedAdditionalExtensions.map((
//     extension: DevSpaceExtension,
//   ) => `${extension.namespace}/${extension.name}`);
//   // Find all technical extensions (required but not necessarily standalone/visible)
//   const technicalExts: DevSpaceExtension[] = devSpacesSpec.extensions.filter(
//     (
//       extension: DevSpaceExtension,
//     ) => (extension.mode === "required" && extension.standalone === true),
//   );
//   const technicalExtensions: string[] = technicalExts.map((
//     extension: DevSpaceExtension,
//   ) => `${extension.namespace}/${extension.name}`);

//   const allExtensions: string[] = [
//     ...new Set([
//       ...predefinedExtensions,
//       ...optionalExtensions,
//       ...technicalExtensions,
//     ]),
//   ];
//   assert(allExtensions != null);
//   assert(allExtensions.length > 0);

//   const devSpacePayload: DevSpaceCreation = {
//     workspacedisplayname: devSpaceName,
//     id: "",
//     memoryLimitBytes: 2147483648,
//     extensions: allExtensions,
//     annotations: {
//       pack: selectedPack.name,
//       packTagline: selectedPack.tagline || "",
//       optionalExtensions: JSON.stringify(optionalExtensions),
//       technicalExtensions: JSON.stringify(technicalExtensions),
//     },
//   };
//   const spinIndicator = spinner();
//   spinIndicator.start(
//     devspaceMessages.info_devspace_creating(devSpaceName),
//   );
//   try {
//     await createDevSpace(landscapeURL, jwt, devSpacePayload);
//     spinIndicator.stop(
//       devspaceMessages.info_devspace_creating(devSpaceName),
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       const message = devspaceMessages.err_devspace_creation(
//         devSpaceName,
//         error.toString(),
//       );
//       log.error(message);
//     }
//   }
//   const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
//     landscapeURL,
//     jwt,
//   );
//   assert(devSpaces != null);
//   return devSpaces;
// }

function organizePackExtensions(
  selectedPackName: string,
  allPacks: DevSpacePack[],
  allExtensions: DevSpaceExtension[],
): PackMetadata | null {
  assert(selectedPackName != null);
  assert(allPacks != null);
  assert(allExtensions != null);

  const selectedPack: DevSpacePack | undefined = allPacks.find((
    pack: DevSpacePack,
  ) => pack.name === selectedPackName);

  if (!selectedPack) {
    console.error(chalk.red(`The Pack named "${selectedPackName}" not found`));
    return null;
  }

  const allPredefinedExtensions = selectedPack.extensions.map(
    (packExtension) => {
      return allExtensions.find((
        extension: DevSpaceExtension,
      ) => (`${extension.namespace}/${extension.name}` ===
        `${packExtension.namespace}/${packExtension.name}`)
      );
    },
  ) as DevSpaceExtension[];

  assert(allPredefinedExtensions != null);

  // Need to further filter out hidden extensions from the TUI
  const visiblePredefinedExtensions = allPredefinedExtensions.filter((
    extension: DevSpaceExtension,
  ) => (!extension.versions[0]?.extendedInfo?.hasOwnProperty("hidden") ||
    Object(extension.versions[0]?.extendedInfo)?.hidden === "false")
  );

  // Additional SAP Extensions
  const additionalExtensionCandidates: DevSpaceExtension[] = allExtensions
    .filter(
      (extension: DevSpaceExtension) =>
        extension.standalone === true && extension.mode === "optional",
    );

  assert(additionalExtensionCandidates != null);
  const predefinedExtensionIDs: Set<String> = new Set(
    visiblePredefinedExtensions.map((extension: DevSpaceExtension) =>
      `${extension.namespace}/${extension.name}`
    ),
  );

  const additionalExtensions = additionalExtensionCandidates.filter((
    extension: DevSpaceExtension,
  ) => !predefinedExtensionIDs.has(`${extension.namespace}/${extension.name}`));

  return {
    allPredefinedExtensions: allPredefinedExtensions,
    predefined: {
      tagline: "SAP Predefined Extensions",
      description: "The following extensions are enabled by default.",
      extensions: visiblePredefinedExtensions,
    },
    additional: {
      tagline: "Additional SAP Extensions",
      description: "Select additional extensions to enhance your space.",
      extensions: additionalExtensions,
    },
  };
}

export async function selectDevSpace(
  devSpaces: devspace.DevspaceInfo[],
  landscapeURL: string,
  jwt: string,
): Promise<DevSpaceNode> {
  assert(devSpaces != null);
  assert(landscapeURL != null);
  assert(jwt != null);

  if (devSpaces.length === 0) {
    const allowOpen: boolean | symbol = await confirm({
      message:
        "There are no Dev Spaces in this landscape. Create a new Dev Space?",
    });

    if (isCancel(allowOpen) || !allowOpen) {
      cancel("Operation cancelled");
      return process.exit(0);
    }
    const updatedDevSpaces: devspace.DevspaceInfo[] =
      await createDevSpaceWrapper(landscapeURL, jwt);
    devSpaces.splice(0, devSpaces.length, ...updatedDevSpaces);
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

  assert(selectedDevSpaceIndex != null);
  assert(typeof selectedDevSpaceIndex === "number");

  const selectedDevSpace =
    devSpaces[selectedDevSpaceIndex] as devspace.DevspaceInfo;
  assert(selectedDevSpace != null);

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
  assert(devSpace != null);
  assert(jwt != null);

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
  assert(devSpaceNode != null);
  assert(devSpaceNode.label != null);
  assert(devSpaceNode.id != null);
  assert(devSpaceNode.landscapeURL != null);
  assert(devSpaceNode.wsName != null);
  assert(devSpaceNode.wsURL != null);
  assert(devSpaceNode.status != null);
  assert(jwt != null);

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

    assert(selectedOption != null);
    assert(typeof selectedOption === "number");

    switch (selectedOption) {
      case DevSpaceMenuOption.CONNECT: {
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

        const sshConfig: SSHConfigInfo = await getSSHConfigurations(
          devSpaceNode,
          jwt,
        );
        assert(sshConfig != null);

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
        return;
      }
      default:
        // Shouldn't even reach here
        cancel("Exiting...");
        return process.exit(0);
    }
  }
}
