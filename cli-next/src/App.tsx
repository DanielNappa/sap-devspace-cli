import { type JSX, useMemo, useState } from "react";
import { Box, Text, useApp } from "ink";
import LandscapeMenu from "@/components/Landscape/LandscapeMenu";
import { NavigationContext } from "@/hooks/NavigationContext.ts";
import { BAS_LOGO_SMALL } from "@/utils/consts.ts";
import { onExit } from "@/utils/terminal.ts";
import { CLI_VERSION } from "@/utils/version.ts";

type Props = {
  prompt?: string | undefined;
};

export default function App({ prompt }: Props): JSX.Element {
  const app = useApp();
  const [accepted, setAccepted] = useState<boolean>(() => false);
  const cwd = useMemo<string>(() => process.cwd(), []) as string;
  const [component, setComponent] = useState<JSX.Element>(<LandscapeMenu />);

  const navigate = useMemo(() => (component: JSX.Element) => {
    setComponent(component);
  }, []);

  return (
    <NavigationContext.Provider value={{ navigate, component }}>
      <Box flexDirection="row" gap={5} width={"95%"}>
        <Box flexDirection="column" width={"30%"}>
          <Text color="cyan">{BAS_LOGO_SMALL}</Text>
        </Box>
        <Box flexDirection="column">
          <Box borderStyle="round" paddingX={1} width={72}>
            <Text>
              <Text bold>SAP</Text> <Text bold>Dev Space CLI</Text>{" "}
              <Text dimColor>
                (experimental) <Text>v{CLI_VERSION}</Text>
              </Text>
            </Text>
          </Box>
        </Box>
        {component}
      </Box>
    </NavigationContext.Provider>
  );
}
