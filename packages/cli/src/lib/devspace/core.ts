import { strict as assert } from "node:assert";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { devspace } from "@sap/bas-sdk";
import meow from "meow";
import chalk from "chalk";
import { organizePackExtensions } from "@/components/DevSpace/utils.ts";
import { deletePK, removeSSHConfig } from "@/components/SSH/utils.ts";
import { getAuthenticatedLandscape, handleSubcommand } from "@/lib/cli/core.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import type {
  CheckState,
  DevSpaceNode,
  LandscapeConfig,
  PackMetadata,
} from "@/utils/types.ts";
import { canDevSpaceStart, updateDevSpace } from "./utils.ts";
import {
  createDevSpace,
  getDevSpacesSpec,
} from "@sap/bas-sdk/dist/src/apis/get-devspace";
import type {
  DevSpaceExtension,
  DevSpacePack,
  DevSpaceSpec,
} from "@sap/bas-sdk/dist/src/utils/devspace-utils";

type MetadataCheckState = CheckState<"Metadata">;

const METADATA_CHECK_FREQUENCY: number = 1000 * 60 * 60 * 12; // 1 day

// The shape of the extension data being mapped to
interface MappedDevSpaceExtension {
  name: string;
  namespace: string;
  tagline: string;
}

// The structure of the final metadata object.
type DevSpaceMetadata = Record<string, MappedDevSpaceExtension[]>;

export async function handleSubcommandCreate(
  flags: {
    help: boolean | undefined;
  } & Record<string, unknown>,
): Promise<void> {
  assert(flags.landscape != null);

  const result: LandscapeConfig | undefined = getAuthenticatedLandscape(flags);
  assert(result.url != null);
  assert(result.jwt != null);

  const { USER_DATA_FOLDER } = await import("@/utils/consts.ts");
  const metadataPath: string = join(USER_DATA_FOLDER, "metadata.json");

  // Load previous check timestamp
  let state: MetadataCheckState | undefined;
  try {
    state = JSON.parse(await readFile(metadataPath, "utf8"));
  } catch {
    // ignore
  }

  // Fetch new metadata if we haven't checked recently or if no previous check exists
  if (
    !state?.lastMetadataCheck ||
    Date.now() - new Date(state.lastMetadataCheck).valueOf() >=
      METADATA_CHECK_FREQUENCY
  ) {
    const devSpacesSpec: DevSpaceSpec = await getDevSpacesSpec(
      result.url,
      result.jwt,
    ) as DevSpaceSpec;

    const metadata: DevSpaceMetadata = {};
    const filteredPacks: DevSpacePack[] = devSpacesSpec.packs
      .filter((pack: DevSpacePack) => pack.name !== "PlatformTest");
    filteredPacks.forEach((devSpacePack: DevSpacePack) => {
      const organizedData = organizePackExtensions(
        devSpacePack.name,
        devSpacesSpec.packs,
        devSpacesSpec.extensions,
      ) as PackMetadata;

      if (!organizedData) {
        console.error(
          "Could not process extension data for the selected pack.",
        );
      }
      metadata[devSpacePack.tagline] ??= organizedData.additional
        .extensions.map((
          devSpaceExtension: DevSpaceExtension,
        ) => ({
          name: devSpaceExtension.name,
          namespace: devSpaceExtension.namespace,
          tagline: devSpaceExtension.tagline,
        }));
    });
    // Update cached metadata
    await writeFile(
      metadataPath,
      JSON.stringify(
        {
          ...metadata,
          lastMetaCheck: new Date().toUTCString(),
        },
        null,
        2,
      ),
      {
        encoding: "utf8",
      },
    );
  }
  const create = meow(
    `
	Usage
	  $ ds create [options]

	Options
    -h, --help                      Show usage and exit
    -l, --landscape <URL>           The full URL of the target landscape 
    -n, --name      <name>          The display name of the new Dev Space
    -t, --type      <type>          The type of the new Dev Space
    -e, --extension                 (Optional) additional extensions to enhance the new Dev Space

	Examples
	  $ ds create -l https://...applicationstudio.cloud.sap -n MyDevSpace
`,
    {
      importMeta: import.meta,
      flags: {
        help: { type: "boolean", aliases: ["h"] },
        landscape: {
          type: "string",
          aliases: ["l"],
          description: "The full URL of the target landscape",
          isRequired: true,
        },
        name: {
          type: "string",
          aliases: ["n"],
          description: "The display name of the new Dev Space",
          isRequired: true,
        },
        type: {
          type: "string",
          aliases: ["t"],
          description: "The type of the new Dev Space",
          isRequired: true,
        },
        extension: { type: "string", isMultiple: true, default: [] },
      },
    },
  );
  if (
    create.flags.help ||
    (!create.flags.landscape || !create.flags.name || !create.flags.type)
  ) {
    create.showHelp();
    process.exit(0);
  }

  try {
    if (!(/^[a-zA-Z0-9][a-zA-Z0-9_]{0,39}$/.test(create.flags.name))) {
      console.log(chalk.red(devspaceMessages.err_invalid_devspace_name));
      process.exit(1);
    }
    // TODO: Implement actual Dev Space creation logic
    console.log(
      `Creating Dev Space: ${create.flags.name} of type: ${create.flags.type}`,
    );
  } catch {
    console.log(chalk.red(devspaceMessages.err_invalid_devspace_name));
    process.exit(1);
  }
}

export async function handleSubcommandUpdate(
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
