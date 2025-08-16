import { relative, sep } from "node:path";
import process from "node:process";
import { type JSX, useMemo } from "react";
import { Box, Text } from "ink";
import { Alert } from "@inkjs/ui";
import { CLI_VERSION } from "@/utils/version.ts";
import { USER_DATA_FOLDER } from "@/utils/consts.ts";

type Props = { updateMessage?: string };

export default function Header({ updateMessage }: Props): JSX.Element {
  const userDataFolder = useMemo(() => {
    if (process.platform === "win32") {
      // Prefer %APPDATA% if available; fallback to %USERPROFILE%
      const appData = process.env.APPDATA;
      if (appData) {
        return `%APPDATA%${sep}${relative(appData, USER_DATA_FOLDER)}`;
      }
      const userProfile = process.env.USERPROFILE;
      return userProfile
        ? `%USERPROFILE%${sep}${relative(userProfile, USER_DATA_FOLDER)}`
        : USER_DATA_FOLDER;
    }
    const home: string | undefined = process.env.HOME;
    if (!home) return USER_DATA_FOLDER;
    const relativePath: string = relative(home, USER_DATA_FOLDER);
    return relativePath ? `~/${relativePath}` : "~";
  }, []);
  return (
    <Box flexDirection="column">
      {updateMessage != null && (
        <Box justifyContent="center" flexDirection="column" width={72}>
          <Alert variant="success">
            {updateMessage}
          </Alert>
        </Box>
      )}
      <Box
        borderStyle="round"
        borderColor="cyan"
        paddingX={1}
        width={72}
        flexDirection="column"
      >
        <Text>
          <Text bold>SAP</Text> <Text bold>Dev Space CLI</Text>{" "}
          <Text dimColor>
            (experimental) <Text>v{CLI_VERSION}</Text>
          </Text>
        </Text>

        <Box>
          <Text>
            <Text color="blueBright">↳</Text> Config:{" "}
            <Text bold color="cyanBright">{userDataFolder}</Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
