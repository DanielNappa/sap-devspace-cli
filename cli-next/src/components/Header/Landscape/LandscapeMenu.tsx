import { Select } from "@inkjs/ui";
import { Box, Text } from "ink";
import { type JSX, useMemo, useState } from "react";
import { BAS_LOGO } from "@/utils/consts.ts";
import { CLI_VERSION } from "@/utils/version.ts";

// Adaptation from https://github.com/SAP/app-studio-toolkit/tree/main/packages/app-studio-toolkit/src/devspace-manager/landscape
type LandscapeConfig = {
  url: string;
  jwt: string | undefined;
  default?: boolean;
};
interface LandscapeInfo {
  name: string;
  url: string;
  isLoggedIn: boolean;
  default?: boolean;
}
export type LandscapeSession = {
  name: string;
  url: string;
  jwt: string;
};

function LandscapeMenu(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );

  if (selectedOption != null) {
    switch (selectedOption) {
      case "LOGIN":
      //   const landscapeSession: LandscapeSession = await selectLandscapeLogin(
      //     newLandscapesConfig,
      //   );
      //   return landscapeSession;
      case "ADD":
        // await setLandscapeURL();
        // break;
      case "DELETE":
        // await deleteLandscape(newLandscapesConfig);
        // const afterDeleteLandscapes = getLandscapesConfig();
        // if (!afterDeleteLandscapes || afterDeleteLandscapes.length === 0) {
        //   await setLandscapeURL();
        // }
        // // Don't break or return; the loop will continue
        // continue;
      case "EXIT":
        // cancel("Exiting...");
        // return process.exit(0);
    }
  }
  return (
    <>
      <Box flexDirection="column">
        <Box borderStyle="round" paddingX={1} width={64}>
          <Text>
            <Text bold>SAP</Text> <Text bold>Dev Space CLI</Text>{" "}
            <Text dimColor>
              (experimental) <Text>v{CLI_VERSION}</Text>
            </Text>
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" gap={5} width={"95%"}>
        <Box flexDirection="column" width={"70%"}>
          <Text color="cyan">{BAS_LOGO}</Text>
        </Box>
        <Box justifyContent="center" flexDirection="column">
          <Select
            options={[
              {
                value: "LOGIN",
                label: "Login to landscape",
              },
              {
                value: "ADD",
                label: "Add landscape",
              },
              {
                value: "DELETE",
                label: "Delete landscape",
              },
              {
                value: "EXIT",
                label: "Exit",
              },
            ]}
            onChange={(value) => {
              setSelectedOption(value);
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default LandscapeMenu;
