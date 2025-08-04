import { strict as assert } from "node:assert";
import { core } from "@sap/bas-sdk";
import { getLandscapesConfig } from "@/components/Landscape/utils.ts";
import { getDevSpace } from "@/lib/devspace/utils.ts";
import type { DevSpaceNode, LandscapeConfig } from "@/utils/types.ts";

export async function handleSubcommand(
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
