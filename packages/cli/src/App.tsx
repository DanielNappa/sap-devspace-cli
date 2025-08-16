import process from "node:process";
import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Text, useApp, useInput } from "ink";
import LandscapeMenu from "@/components/Landscape/LandscapeMenu.tsx";
import Header from "@/components/UI/Header.tsx";
import HelpOverlay from "@/components/UI/HelpOverlay.tsx";
import { HelpContext } from "@/hooks/HelpContext.ts";
import { NavigationContext } from "@/hooks/NavigationContext.ts";

type Props = {
  updateMessage?: string;
};

export default function App({ updateMessage }: Props): JSX.Element {
  const app = useApp();
  // const cwd = useMemo<string>(() => process.cwd(), []) as string;
  const [component, setComponent] = useState<JSX.Element>(<LandscapeMenu />);
  const [previousComponent, setPreviousComponent] = useState<
    JSX.Element | null
  >(null);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [shouldThrowError, setShouldThrowError] = useState<string | null>(null);

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

  useInput((input, key) => {
    if (key.escape && previousComponent) {
      goBack();
    }

    // Development mode error testing
    if (process.env.NODE_ENV === "development") {
      if (input === "E") {
        // Trigger a test error in the main app
        setShouldThrowError("Development test: Main App error");
      } else if (input === "A") {
        // Trigger an async error
        setTimeout(() => {
          Promise.reject(
            new Error("Development test: Async error from main app"),
          );
        }, 100);
      }
    }
  });

  // Throw error during render so ErrorBoundary can catch it
  if (shouldThrowError) {
    throw new Error(shouldThrowError);
  }

  const useDefaultOverlay = useCallback(() => {
    setOverlay("enter to confirm · esc to return to main menu");
  }, []);

  useEffect(() => {
    useDefaultOverlay();
  }, []);

  return (
    <NavigationContext.Provider
      value={useMemo(() => ({ app, navigate, component, goBack }), [
        app,
        navigate,
        component,
        goBack,
      ])}
    >
      <HelpContext.Provider
        value={useMemo(() => ({ overlay, setOverlay, useDefaultOverlay }), [
          overlay,
          setOverlay,
          useDefaultOverlay,
        ])}
      >
        <Header updateMessage={updateMessage} />
        {process.env.NODE_ENV === "development" && (
          <Box paddingX={1}>
            <Text color="red">
              Dev Mode: E for sync error · A for async error
            </Text>
          </Box>
        )}
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
