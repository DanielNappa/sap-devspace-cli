import { type JSX, useEffect, useMemo, useState } from "react";
import { Box, Text } from "ink";
import { type Option, Select } from "@inkjs/ui";
import type { devspace } from "@sap/bas-sdk";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import type { DevSpaceNode, LandscapeSession } from "@/utils/types.ts";
import DevSpaceAction from "./DevSpaceAction.tsx";

function DevSpaceMenu({ devSpaces, landscapeSession }: {
  devSpaces: devspace.DevspaceInfo[];
  landscapeSession: LandscapeSession;
}): JSX.Element {
  const { navigate } = useNavigation();
  const [message, setMessage] = useState<string>("Select a Dev Space:");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (devSpaces && devSpaces?.length === 0) {
      setMessage(
        "There are no Dev Spaces in this landscape. Create a new Dev Space?",
      );
    }
  }, []);

  const devSpaceOptions: Option[] = useMemo(
    () =>
      devSpaces?.map((devSpace, i) => ({
        value: `${i}`,
        label:
          `${devSpace.devspaceDisplayName} (${devSpace.packDisplayName}) - ${devSpace.status}`,
      })),
    [devSpaces],
  );

  useEffect(() => {
    if (selectedOption != null) {
      const index: number = parseInt(selectedOption);
      const selectedDevSpace = devSpaces[index] as devspace.DevspaceInfo;
      const devSpaceNode: DevSpaceNode = {
        label:
          `${selectedDevSpace.devspaceDisplayName} (${selectedDevSpace.packDisplayName})`,
        id: selectedDevSpace.id,
        landscapeURL: landscapeSession.url,
        wsName: selectedDevSpace.devspaceDisplayName,
        wsURL: selectedDevSpace.url,
        status: selectedDevSpace.status,
      };

      navigate(
        <DevSpaceAction
          devSpaceNode={devSpaceNode}
          jwt={landscapeSession.jwt}
        />,
      );
    }
  });

  return (
    <Box flexDirection="row" marginTop={1}>
      <Box justifyContent="center" flexDirection="column">
        <Box flexDirection="column" width={"70%"}>
          <Text>
            {message}
          </Text>
        </Box>
        <Select
          options={devSpaceOptions}
          onChange={(value: string) => {
            setSelectedOption(value);
          }}
        />
      </Box>
    </Box>
  );
}

export default DevSpaceMenu;
