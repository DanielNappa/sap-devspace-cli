import { strict as assert } from "node:assert";
import process from "node:process";
import { devspace } from "@sap/bas-sdk";
import chalk from "chalk";
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
import { type DevSpaceNode } from "@/ssh/index.ts";
import { devspaceMessages } from "@/utils/consts.ts";

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

async function createDevSpaceWrapper(
  landscapeURL: string,
  jwt: string,
): Promise<devspace.DevspaceInfo[]> {
  // const devSpaceName: string | symbol = await text({
  //   message: "Enter Dev Space name:",
  //   validate(input: string) {
  //     try {
  //       if (!(/^[a-zA-Z0-9][a-zA-Z0-9_]{0,39}$/.test(input))) {
  //         return devspaceMessages.err_invalid_devspace_name;
  //       }
  //     } catch (error) {
  //       return (error as Error).toString();
  //     }
  //   },
  // });

  // if (isCancel(devSpaceName)) {
  //   cancel("Operation cancelled.");
  //   process.exit(0);
  // }

  // assert(devSpaceName != null);
  // const devSpacesSpec = await getDevSpacesSpec(
  //   landscapeURL,
  //   jwt,
  // ) as DevSpaceSpec;

  // const packOptions: Option<string | DevSpacePack>[] = devSpacesSpec.packs
  //   .filter((pack: DevSpacePack) => pack.name !== "PlatformTest")
  //   .map((pack: DevSpacePack) => ({
  //     value: pack,
  //     label: pack.tagline || pack.name,
  //     hint: pack.name,
  //   }));
  // assert(packOptions != null);

  // const selectedPack = await select({
  //   message: "What kind of application do you want to create?",
  //   options: packOptions,
  // }) as DevSpacePack;
  // assert(selectedPack != null);

  // // Organize extensions based on the selected pack
  // const organizedData = organizePackExtensions(
  //   selectedPack.name,
  //   devSpacesSpec.packs,
  //   devSpacesSpec.extensions,
  // ) as PackMetadata;

  // if (!organizedData) {
  //   log.error("Could not process extension data for the selected pack.");
  //   process.exit(0);
  // }

  // const additionalExtensionOptions = organizedData.additional.extensions.map((
  //   extension,
  // ) => ({
  //   value: extension,
  //   label: `${extension.tagline || extension.name}`,
  //   // hint: extension.description,
  // }));
  // assert(additionalExtensionOptions != null);
  // assert(additionalExtensionOptions.length > 0);

  // const selectedAdditionalExtensions = await multiselect({
  //   message: organizedData.additional.description,
  //   options: additionalExtensionOptions,
  //   required: false,
  // }) as DevSpaceExtension[];

  // if (isCancel(selectedAdditionalExtensions)) {
  //   cancel("Operation cancelled");
  //   process.exit(0);
  // }

  // const predefinedExtensions: string[] = organizedData.allPredefinedExtensions
  //   .map((
  //     extension: DevSpaceExtension,
  //   ) => `${extension.namespace}/${extension.name}`);
  // const optionalExtensions: string[] = selectedAdditionalExtensions.map((
  //   extension: DevSpaceExtension,
  // ) => `${extension.namespace}/${extension.name}`);
  // // Find all technical extensions (required but not necessarily standalone/visible)
  // const technicalExts: DevSpaceExtension[] = devSpacesSpec.extensions.filter(
  //   (
  //     extension: DevSpaceExtension,
  //   ) => (extension.mode === "required" && extension.standalone === true),
  // );
  // const technicalExtensions: string[] = technicalExts.map((
  //   extension: DevSpaceExtension,
  // ) => `${extension.namespace}/${extension.name}`);

  // const allExtensions: string[] = [
  //   ...new Set([
  //     ...predefinedExtensions,
  //     ...optionalExtensions,
  //     ...technicalExtensions,
  //   ]),
  // ];
  // assert(allExtensions != null);
  // assert(allExtensions.length > 0);

  // const devSpacePayload: DevSpaceCreation = {
  //   workspacedisplayname: devSpaceName,
  //   id: "",
  //   memoryLimitBytes: 2147483648,
  //   extensions: allExtensions,
  //   annotations: {
  //     pack: selectedPack.name,
  //     packTagline: selectedPack.tagline || "",
  //     optionalExtensions: JSON.stringify(optionalExtensions),
  //     technicalExtensions: JSON.stringify(technicalExtensions),
  //   },
  // };
  const spinIndicator = spinner();
  spinIndicator.start(
    devspaceMessages.info_devspace_creating(devSpaceName),
  );
  try {
    await createDevSpace(landscapeURL, jwt, devSpacePayload);
    spinIndicator.stop(
      devspaceMessages.info_devspace_creating(devSpaceName),
    );
  } catch (error) {
    if (error instanceof Error) {
      const message = devspaceMessages.err_devspace_creation(
        devSpaceName,
        error.toString(),
      );
      log.error(message);
    }
  }
  const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
    landscapeURL,
    jwt,
  );
  assert(devSpaces != null);
  return devSpaces;
}

export function organizePackExtensions(
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
    ).length < 2
  ) {
    return true;
  } else {
    console.log(`There are 2 Dev Spaces running for ${landscapeURL}`);
    return false;
  }
}

export async function startDevSpace(
  devSpace: DevSpaceNode,
  jwt: string,
  suspend: boolean,
): Promise<void> {
  assert(devSpace != null);
  assert(jwt != null);
}
