import { strict as assert } from "node:assert";
import { devspace } from "@sap/bas-sdk";
import chalk from "chalk";
import type {
  DevSpaceExtension,
  DevSpacePack,
} from "@sap/bas-sdk/dist/src/utils/devspace-utils";

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
  const predefinedExtensionIDs: Set<string> = new Set(
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
