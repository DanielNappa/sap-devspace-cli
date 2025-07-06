import { type JSX, useCallback, useEffect, useState } from "react";
import { ensureFile, readFile } from "fs-extra";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import {
  type DevSpaceNode,
  type DevSpaceSettings,
  type SSHConfigInfo,
} from "@/utils/types.ts";
import { DEVSPACE_SETTINGS_PATH, devspaceMessages } from "@/utils/consts.ts";
import {
  getPK,
  savePK,
  SSH_SOCKET_PORT,
  SSHD_SOCKET_PORT,
  updateSSHConfig,
} from "./utils.ts";
import { ssh } from "./tunnel.ts";

function SSH({ devSpaceNode, jwt }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
}): JSX.Element {
  const { app, navigate, goBack } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    devspaceMessages.info_obtaining_key,
  );

  const getDevSpaceSettings = useCallback(
    async (devSpaceNode: DevSpaceNode): Promise<DevSpaceSettings> => {
      await ensureFile(DEVSPACE_SETTINGS_PATH);
      const settingsBuffer: string = await readFile(DEVSPACE_SETTINGS_PATH, {
        encoding: "utf-8",
        flag: "r",
      });
    },
    [],
  );

  const updateDevSpaceSettings = useCallback(
    async (devSpaceNode: DevSpaceNode): Promise<void> => {
      const settingsBuffer: string = await readFile(DEVSPACE_SETTINGS_PATH, {
        encoding: "utf-8",
        flag: "r",
      });
    },
    [],
  );

  useEffect(() => {
    setLoading(true);
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
        ssh(
          {
            displayName: devSpaceNode.label,
            host: { url: host, port: `${SSH_SOCKET_PORT}` },
            client: { port: sshConfig.port },
            username: "user",
            jwt: jwt,
            pkFilePath: sshConfig.pkFilePath,
          },
          setLoading,
          setMessage,
          app.exit,
        );
      },
    );
  }, []);

  return (
    <Box flexDirection="row" marginTop={1}>
      <Box justifyContent="center" flexDirection="column">
        <Text>
          {loading && (
            <Text>
              <Spinner type="bouncingBall" />
            </Text>
          )} {message}
        </Text>
      </Box>
    </Box>
  );
}

export default SSH;
