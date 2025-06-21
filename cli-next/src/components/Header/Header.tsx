import path from "node:path";
import { Box, Text } from "ink";
import { type JSX, useMemo } from "react";

export interface HeaderProps {
  terminalRows: number;
  version: string;
  model: string;
  provider?: string;
  approvalPolicy: string;
  initialImagePaths?: Array<string>;
  flexModeEnabled?: boolean;
}

function Header({
  terminalRows,
  version,
  model,
  provider = "openai",
  initialImagePaths,
  flexModeEnabled = false,
}: HeaderProps): JSX.Element {
  const PWD = useMemo(() => process.cwd(), []);
  return (
    <>
      {terminalRows < 10
        ? (
          // Compact header for small terminal windows
          <Text>
            ● Codex v{version} - {PWD} - {model} ({provider}) -{" "}
            {flexModeEnabled ? " - flex-mode" : ""}
          </Text>
        )
        : (
          <>
            <Box borderStyle="round" paddingX={1} width={64}>
              <Text>
                ● OpenAI <Text bold>Codex</Text>{" "}
                <Text dimColor>
                  (research preview) <Text color="blueBright">v{version}</Text>
                </Text>
              </Text>
            </Box>
            <Box
              borderStyle="round"
              borderColor="gray"
              paddingX={1}
              width={64}
              flexDirection="column"
            >
              <Text>
                localhost <Text dimColor>session:</Text>{" "}
                <Text color="magentaBright" dimColor>
                  {"<no-session>"}
                </Text>
              </Text>
              <Text dimColor>
                <Text color="blueBright">↳</Text> workdir:{" "}
                <Text bold>{PWD}</Text>
              </Text>
              <Text dimColor>
                <Text color="blueBright">↳</Text> model:{" "}
                <Text bold>{model}</Text>
              </Text>
              <Text dimColor>
                <Text color="blueBright">↳</Text> provider:{" "}
                <Text bold>{provider}</Text>
              </Text>
              <Text dimColor>
                <Text color="blueBright">↳</Text> approval:{" "}
              </Text>
              {flexModeEnabled && (
                <Text dimColor>
                  <Text color="blueBright">↳</Text> flex-mode:{" "}
                  <Text bold>enabled</Text>
                </Text>
              )}
              {initialImagePaths?.map((img, idx) => (
                <Text key={img ?? idx} color="gray">
                  <Text color="blueBright">↳</Text> image:{" "}
                  <Text bold>{path.basename(img)}</Text>
                </Text>
              ))}
            </Box>
          </>
        )}
    </>
  );
}

export default Header;
