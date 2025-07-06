import { strict as assert } from "node:assert";
import { core, devspace } from "@sap/bas-sdk";
import { getDevSpaces } from "@/components/DevSpace/utils.ts";
import {
  addLandscape,
  getLandscapesConfig,
  removeLandscape,
} from "@/components/Landscape/utils.ts";
import {
  getPK,
  savePK,
  SSH_SOCKET_PORT,
  type SSHConfigInfo,
  SSHD_SOCKET_PORT,
  updateSSHConfig,
} from "@/components/SSH/utils.ts";
import type {
  DevSpaceNode,
  LandscapeConfig,
  LandscapeSession,
} from "@/utils/types.ts";

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

async function getSSHConfigurations(
  devSpaceNode: DevSpaceNode,
  jwt: string,
): Promise<void> {
  getPK(devSpaceNode.landscapeURL, jwt, devSpaceNode.id).then(
    (pk: string) => {
      const pkFilePath = savePK(pk, devSpaceNode.id);
      const sshConfig: SSHConfigInfo = {
        ...updateSSHConfig(pkFilePath, devSpaceNode),
        pkFilePath,
      };
      const host: string = `port${SSHD_SOCKET_PORT}-${
        new URL(devSpaceNode.wsURL).hostname
      }`;
      // ssh(
      //   {
      //     displayName: devSpaceNode.label,
      //     host: { url: host, port: `${SSH_SOCKET_PORT}` },
      //     client: { port: sshConfig.port },
      //     username: "user",
      //     jwt: jwt,
      //     pkFilePath: sshConfig.pkFilePath,
      //   },
      //   setLoading,
      //   setMessage,
      //   app.exit,
      // );
    },
  );
}

export async function handleSubcommandSSH(
  flags: {
    help: boolean | undefined;
    landscape: string | undefined;
    devspace: string | undefined;
  } & Record<string, unknown>,
): Promise<void> {
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

      // const sshConfig: SSHConfigInfo = await getSSHConfigurations(
      //   devSpaceNode,
      //   jwt,
      // );
      // assert(sshConfig != null);

      // return await runChannelClient({
      //   displayName: devSpaceNode.label,
      //   host: `port${SSHD_SOCKET_PORT}-${
      //     new URL(devSpaceNode.wsURL).hostname
      //   }`,
      //   landscape: devSpaceNode.landscapeURL,
      //   localPort: sshConfig.port,
      //   jwt: jwt,
      //   pkFilePath: sshConfig.pkFilePath,
      // });
    }
  }
}
