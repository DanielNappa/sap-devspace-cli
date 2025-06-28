import { type JSX, useEffect, useState } from "react";
import { devspace } from "@sap/bas-sdk";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import { devspaceMessages } from "@/utils/consts.ts";

export function DevSpaceUpdate(
  { landscapeURL, wsID, wsName, jwt, suspend, onFinish }: {
    landscapeURL: string;
    wsID: string;
    wsName: string;
    jwt: string;
    suspend: boolean;
    onFinish?: () => void;
  },
): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    devspaceMessages.info_devspace_state_inital_message(wsName, wsID, suspend),
  );

  useEffect(() => {
    setLoading(true);
    devspace
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
        setMessage(
          devspaceMessages.info_devspace_state_updated(wsName, wsID, suspend),
        );
        setLoading(false);
        onFinish?.();
      }).catch((error) => {
        const message = devspaceMessages.err_ws_update(wsID, error.toString());
        console.error(message);
        console.trace(error);
      });
  }, []);

  return (
    <Box flexDirection="row" marginTop={1}>
      <Box justifyContent="center" flexDirection="column">
        <Text color={suspend ? "red" : "green"}>
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
