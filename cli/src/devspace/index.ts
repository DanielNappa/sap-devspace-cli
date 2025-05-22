import { strict as assert } from "assert";
import { cancel, isCancel, type Option, select } from "@clack/prompts";
import { devspace } from "@sap/bas-sdk";
import { getJWT } from "@/auth";
import { type DevSpaceNode } from "@/ssh";

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
    wsURL: selectedDevSpace.url,
  };
}
