import { type JSX, useCallback, useEffect, useState } from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { type DevSpaceNode, type SSHConfigInfo } from "@/utils/types.ts";
import {
  getPK,
  savePK,
  SSH_SOCKET_PORT,
  SSHD_SOCKET_PORT,
  updateSSHConfig,
} from "./utils.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import { ssh } from "./tunnel.ts";

function SSH({ devSpaceNode, jwt }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
}): JSX.Element {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    devspaceMessages.info_obtaining_key,
  );

  const runChannelClient = useCallback(async (opt: {
    displayName: string;
    host: string;
    landscape: string;
    localPort: string;
    jwt: string;
    pkFilePath: string;
  }): Promise<void> => {
    await ssh(
      {
        displayName: opt.displayName,
        host: { url: opt.host, port: `${SSH_SOCKET_PORT}` },
        client: { port: opt.localPort },
        username: "user",
        jwt: opt.jwt,
        pkFilePath: opt.pkFilePath,
      },
      setLoading,
      setMessage,
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    getPK(devSpaceNode.landscapeURL, jwt, devSpaceNode.id).then(
      (pk: string) => {
        setMessage(devspaceMessages.info_save_pk_to_file);
        const pkFilePath = savePK(pk, devSpaceNode.wsURL);

        setMessage(
          devspaceMessages.info_update_config_file_with_ssh_connection,
        );
        console.log(devspaceMessages.info_ssh_config_file_updated);
        const sshConfig: SSHConfigInfo = {
          ...updateSSHConfig(pkFilePath, devSpaceNode),
          pkFilePath,
        };
        const host: string = `port${SSHD_SOCKET_PORT}-${
          new URL(devSpaceNode.wsURL).hostname
        }`;
        (async () => {
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
          );
        })();
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
