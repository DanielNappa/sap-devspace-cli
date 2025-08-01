import { type JSX, useEffect, useState } from "react";
import { Box, Text } from "ink";
import { ConfirmInput } from "@inkjs/ui";
import Spinner from "ink-spinner";
import { devspace } from "@sap/bas-sdk";
import type { DevSpaceNode } from "@/utils/types.ts";
import { deletePK, removeSSHConfig } from "@/components/SSH/utils.ts";

export function DevSpaceDelete({ devSpaceNode, jwt, onFinish }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
  onFinish: () => void;
}): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    `Are you sure you want to delete ${devSpaceNode.label}?`,
  );
  const [acceptedDeletion, setAcceptedDeletion] = useState<boolean>(false);
  useEffect(() => {
    if (acceptedDeletion) {
      setMessage(`Deleting ${devSpaceNode.label}`);
      devspace.deleteDevSpace(
        devSpaceNode.landscapeURL,
        jwt,
        devSpaceNode.id,
      ).then(() => {
        deletePK(devSpaceNode.id);
        removeSSHConfig(devSpaceNode);
        setLoading(false);
        setMessage(`Deleted ${devSpaceNode.label}`);
        onFinish();
      });
    }
  }, [acceptedDeletion]);

  return (
    <Box flexDirection="row" marginTop={1}>
      <Box justifyContent="center" flexDirection="column">
        {!acceptedDeletion
          ? (
            <>
              <Text color="red">{message}</Text>
              <ConfirmInput
                onConfirm={() => {
                  if (!loading) setLoading(true);
                  setAcceptedDeletion(true);
                }}
                onCancel={() => {
                  onFinish();
                }}
              />
            </>
          )
          : (
            <Text color="red">
              {loading && (
                <Text>
                  <Spinner type="bouncingBall" />
                </Text>
              )} {message}
            </Text>
          )}
      </Box>
    </Box>
  );
}
