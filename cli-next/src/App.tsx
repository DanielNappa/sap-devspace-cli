import { type JSX, useMemo, useState } from "react";
import { Box, Text, useApp, useInput } from "ink";
import LandscapeMenu from "@/components/Landscape/LandscapeMenu";
import { NavigationContext } from "@/hooks/NavigationContext.ts";
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
  const [previousComponent, setPreviousComponent] = useState<
    JSX.Element | null
  >(null);

  const navigate = useMemo(() => (newComponent: JSX.Element) => {
    setPreviousComponent(component);
    setComponent(newComponent);
  }, []);

  const goBack = useMemo(() => () => {
    if (previousComponent) {
      setComponent(previousComponent);
      setPreviousComponent(null);
    }
  }, [previousComponent]);

  useInput((input, key) => {
    if (key.escape && previousComponent) {
      goBack();
    }
  });

  return (
    <NavigationContext.Provider value={{ navigate, component, goBack }}>
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
    </NavigationContext.Provider>
  );
}
