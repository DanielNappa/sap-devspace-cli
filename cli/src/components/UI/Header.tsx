import { type JSX } from "react";
import { Box, Text } from "ink";
import { Alert } from "@inkjs/ui";
import { CLI_VERSION } from "@/utils/version.ts";

type Props = { updateMessage?: string };

export default function Header({ updateMessage }: Props): JSX.Element {
  return (
    <Box flexDirection="column">
      {updateMessage != null && (
        <Box justifyContent="center" flexDirection="column" width={72}>
          <Alert variant="success">
            {updateMessage}
          </Alert>
        </Box>
      )}
      <Box borderStyle="round" paddingX={1} width={72}>
        <Text>
          <Text bold>SAP</Text> <Text bold>Dev Space CLI</Text>{" "}
          <Text dimColor>
            (experimental) <Text>v{CLI_VERSION}</Text>
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
