import { type JSX, useEffect, useState } from "react";
import { Box, Text } from "ink";
import { URL } from "node:url";
import { TextInput } from "@/components/UI/TextInput.tsx";
import { useHelp } from "@/hooks/HelpContext.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import LandscapeMenu from "./LandscapeMenu.tsx";
import { addLandscape } from "./utils.ts";

function LandscapeURL(): JSX.Element {
  const { navigate } = useNavigation();
  const { setOverlay } = useHelp();
  const [message, setMessage] = useState<string>(
    "Enter your Landscape URL and press Enter:",
  );
  const [landscapeURL, setLandscapeURL] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    setOverlay("enter to confirm");
  }, []);

  return (
    <Box flexDirection="column">
      <Text color={showErrorMessage ? "red" : "null"}>{message}</Text>
      <TextInput
        value={landscapeURL}
        onChange={setLandscapeURL}
        onSubmit={(submittedLandscapeURL: string) => {
          try {
            const inputURL: URL = new URL(submittedLandscapeURL);
            if (
              inputURL.pathname.length > 1 || inputURL.search || inputURL.hash
            ) {
              setMessage(
                "Enter the URL origin without any paths or parameters",
              );
              setShowErrorMessage(true);
            } else {
              if (submittedLandscapeURL) {
                if (showErrorMessage) setShowErrorMessage(false);
                addLandscape(submittedLandscapeURL);
                navigate(<LandscapeMenu />);
              }
            }
          } catch (error) {
            setMessage(
              "Enter the URL origin without any paths or parameters",
            );
            setShowErrorMessage(true);
          }
        }}
        placeholder="https://..."
      />
    </Box>
  );
}

export default LandscapeURL;
