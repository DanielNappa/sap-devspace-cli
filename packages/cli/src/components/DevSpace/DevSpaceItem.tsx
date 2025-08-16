import { type FunctionComponent } from "react";
import { Box, Text } from "ink";
import type { ItemProperties } from "@/components/UI/EnhancedSelect.tsx"; // Use the real path to the type
import { devspace } from "@sap/bas-sdk";

const StatusColor: Record<string, string> = {
  RUNNING: "green",
  STARTING: "yellowBright",
  STOPPED: "red",
  STOPPING: "yellow",
  ERROR: "red",
  SAFE_MODE: "yellow",
};

export const DevSpaceItem: FunctionComponent<
  ItemProperties<devspace.DevspaceInfo>
> = ({
  isSelected,
  isDisabled,
  item,
}) => {
  const devSpace: devspace.DevspaceInfo = item;
  return (
    <Box flexDirection="column" width={48}>
      <Box flexDirection="row" justifyContent="space-between">
        <Text color={isDisabled ? "gray" : isSelected ? "cyan" : undefined}>
          {devSpace.devspaceDisplayName}
        </Text>
        <Text color={StatusColor[devSpace.status]}>
          {devSpace.status}
        </Text>
      </Box>
      <Text color={isSelected ? "cyan" : undefined}>
        {` ${devSpace.packDisplayName}`}
      </Text>
    </Box>
  );
};
