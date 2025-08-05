import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import process from "node:process";
import { Box, useApp, useInput } from "ink";
import LandscapeMenu from "@/components/Landscape/LandscapeMenu.tsx";
import Header from "@/components/UI/Header.tsx";
import HelpOverlay from "@/components/UI/HelpOverlay.tsx";
import { HelpContext } from "@/hooks/HelpContext.ts";
import { NavigationContext } from "@/hooks/NavigationContext.ts";

type Props = {
  prompt?: string | undefined;
  updateMessage?: string | undefined;
};

export default function App({ prompt, updateMessage }: Props): JSX.Element {
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
      useDefaultOverlay();
    }
  }, [previousComponent]);

  useInput((_, key) => {
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
    <NavigationContext.Provider value={{ app, navigate, component, goBack }}>
      <HelpContext.Provider value={{ overlay, setOverlay, useDefaultOverlay }}>
        <Header updateMessage={updateMessage} />
        <Box paddingX={1}>
          {component}
        </Box>
        {overlay && (
          <HelpOverlay
            overlay={overlay}
          />
        )}
      </HelpContext.Provider>
    </NavigationContext.Provider>
  );
}
