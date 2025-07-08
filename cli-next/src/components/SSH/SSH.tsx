import { type JSX, useEffect, useState } from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { type DevSpaceNode, type SSHConfigInfo } from "@/utils/types.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import {
  getPK,
  savePK,
  SSH_SOCKET_PORT,
  SSHD_SOCKET_PORT,
  updateSSHConfig,
} from "./utils.ts";
import { ssh } from "./tunnel.ts";

function SSH({ devSpaceNode, jwt, newHostAlias }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
  newHostAlias?: string;
}): JSX.Element {
  const { app, navigate, goBack } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    devspaceMessages.info_obtaining_key,
  );

  useEffect(() => {
    setLoading(true);
    getPK(devSpaceNode.landscapeURL, jwt, devSpaceNode.id).then(
      (pk: string) => {
        const pkFilePath = savePK(pk, devSpaceNode.id);
        const sshConfig: SSHConfigInfo = {
          ...updateSSHConfig(pkFilePath, devSpaceNode, newHostAlias),
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
            pkFilePath: pkFilePath,
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
