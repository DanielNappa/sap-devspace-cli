import { Box, type Instance, render, Text } from "ink";
import { type JSX, useMemo } from "react";

export interface SessionHeaderProps {
  localPort: number;
  sshConfigFile: string;
  pkFilePath: string;
  sshCommand: string;
}

function SessionHeader({
  localPort,
  sshConfigFile,
  pkFilePath,
  sshCommand,
}: SessionHeaderProps): JSX.Element {
  const CWD = useMemo(() => process.cwd(), []);
  return (
    <>
      <Box
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        flexDirection="column"
      >
        <Text>
          Local SSH Port: <Text bold>127.0.0.1:</Text>
          <Text bold color="magentaBright">
            {localPort}
          </Text>
        </Text>
        <Text>
          <Text color="blueBright">↳</Text> Current Working Directory:{" "}
          <Text bold>{CWD}</Text>
        </Text>
        <Text>
          <Text color="blueBright">↳</Text> SSH Config File Path:{" "}
          <Text bold>{sshConfigFile}</Text>
        </Text>
        <Text>
          <Text color="blueBright">↳</Text> Private Key File Path:{" "}
          <Text bold>{pkFilePath}</Text>
        </Text>
      </Box>
      <Box
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        flexDirection="column"
      >
        <Text>
          <Text>{sshCommand}</Text>
        </Text>
      </Box>
    </>
  );
}

export function RenderSessionHeader({
  localPort,
  sshConfigFile,
  pkFilePath,
  sshCommand,
}: SessionHeaderProps): Instance {
  return render(
    <SessionHeader
      localPort={localPort}
      sshConfigFile={sshConfigFile}
      pkFilePath={pkFilePath}
      sshCommand={sshCommand}
    />,
  );
}

export default SessionHeader;
