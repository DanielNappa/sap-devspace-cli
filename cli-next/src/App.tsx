import {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Text, useApp, useInput } from "ink";
import LandscapeMenu from "@/components/Landscape/LandscapeMenu";
import HelpOverlay from "@/components/UI/HelpOverlay.tsx";
import { HelpContext } from "@/hooks/HelpContext.ts";
import { NavigationContext } from "@/hooks/NavigationContext.ts";
import { onExit } from "@/utils/terminal.ts";
import { CLI_VERSION } from "@/utils/version.ts";

type Props = {
  prompt?: string | undefined;
};

export default function App({ prompt }: Props): JSX.Element {
  const app = useApp();
  const cwd = useMemo<string>(() => process.cwd(), []) as string;
  const [component, setComponent] = useState<JSX.Element>(<LandscapeMenu />);
  const [previousComponent, setPreviousComponent] = useState<
    JSX.Element | null
  >(null);
  const [overlay, setOverlay] = useState<string | null>(null);

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

  const useDefaultOverlay = useCallback(() => {
    setOverlay("enter to confirm · esc to return to main menu");
  }, []);

  useEffect(() => {
    useDefaultOverlay();
  }, []);

  return (
    <NavigationContext.Provider value={{ navigate, component, goBack }}>
      <HelpContext.Provider value={{ overlay, setOverlay, useDefaultOverlay }}>
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
        {overlay && (
          <HelpOverlay
            overlay={overlay}
            // onExit={() => setOverlay(null)}
          />
        )}
      </HelpContext.Provider>
    </NavigationContext.Provider>
  );
}
