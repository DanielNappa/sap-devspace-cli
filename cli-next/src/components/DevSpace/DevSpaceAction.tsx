import { type JSX, useEffect, useMemo, useState } from "react";
import { Box, Text } from "ink";
import { type Option, Select } from "@inkjs/ui";
import { devspace } from "@sap/bas-sdk";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { DevSpaceMenuOption, type DevSpaceNode } from "@/utils/types.ts";

function DevSpaceAction({ devSpaceNode, jwt }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
}): JSX.Element {
  const { navigate } = useNavigation();
  const [message, setMessage] = useState<string>("Select an option:");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [devSpaceStatus, setDevSpaceStatus] = useState<string>("");

  useEffect(() => {
    devspace.getDevspaceInfo({
      landscapeUrl: devSpaceNode.landscapeURL,
      jwt: jwt,
      wsId: devSpaceNode.id,
    }).then((devSpaceInfo: devspace.DevspaceInfo) =>
      setDevSpaceStatus(devSpaceInfo.status)
    );
  }, []);

  const options: Option[] = useMemo(() => {
    const isReady = devSpaceStatus === devspace.DevSpaceStatus.RUNNING;
    return [
      isReady
        ? {
          value: `${DevSpaceMenuOption.CONNECT}`,
          label: "Connect to Dev Space (SSH)",
        }
        : {
          value: `${DevSpaceMenuOption.START}`,
          label: "Start Dev Space",
        },
      ...(isReady
        ? [{
          value: `${DevSpaceMenuOption.STOP}`,
          label: "Stop Dev Space",
        }]
        : []),
      {
        value: `${DevSpaceMenuOption.DELETE}`,
        label: "Delete Dev Space",
      },
    ];
  }, []);

  // Add this useEffect for handling selected options
  useEffect(() => {
    if (selectedOption != null) {
      switch (selectedOption) {
        case `${DevSpaceMenuOption.CONNECT}`:
          break;
        case `${DevSpaceMenuOption.START}`:
          break;
        case `${DevSpaceMenuOption.STOP}`:
          break;
        case `${DevSpaceMenuOption.DELETE}`:
          // Handle exit
          break;
      }
    }
  }, [selectedOption, navigate]);

  return (
    <Box flexDirection="row" gap={5} width={"95%"}>
      <Box justifyContent="center" flexDirection="column">
        <Box flexDirection="row">
          <Text>
            {message}
          </Text>
        </Box>
        <Select
          options={options}
          onChange={(value: string) => {
            setSelectedOption(value);
          }}
        />
      </Box>
    </Box>
  );
}

export default DevSpaceAction;
