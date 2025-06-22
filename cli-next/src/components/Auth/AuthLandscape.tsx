import { type JSX, use, useEffect, useState } from "react";
import { Box, Text } from "ink";
import { ConfirmInput } from "@inkjs/ui";
import { core } from "@sap/bas-sdk";
import open from "open";
import { addLandscape, removeLandscape } from "@/components/Landscape/utils.ts";
import { closeListener, getJWT } from "@/hooks/Auth.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import type { LandscapeConfig } from "@/utils/types.ts";

function AuthLandscape(
  { selectedLandscape }: { selectedLandscape: LandscapeConfig },
): JSX.Element {
  const { navigate } = useNavigation();
  const [loginToLandscape, setLoginToLandscape] = useState<boolean>(false);
  const [showCancellationMessage, setShowCancellationMessage] = useState<
    boolean
  >(false);
  const [message, setMessage] = useState<string>(
    "Open browser to authenticate?",
  );

  useEffect(() => {
    if (loginToLandscape) {
      (async (): Promise<void> => {
        open(core.getExtLoginPath(selectedLandscape.url));
        // If jwt exists and is not expired then use it otherwise update existing
        // LandscapeConfig with new JWT
        const jwt: string =
          !!(selectedLandscape?.jwt && selectedLandscape.jwt.length > 1 &&
              !core.isJwtExpired(selectedLandscape.jwt))
            ? selectedLandscape.jwt
            : await getJWT(selectedLandscape.url);

        // Update existing config if JWT didn't previously exist for landscape URL
        if (
          !selectedLandscape.hasOwnProperty("jwt") || !selectedLandscape?.jwt
        ) {
          await removeLandscape(selectedLandscape.url);
          await addLandscape(selectedLandscape.url, jwt);
        }

        // return {
        //   name: new URL(selectedLandscape.url).hostname,
        //   url: selectedLandscape.url,
        //   jwt: jwt,
        // };
      })();
    } else {
      (async (): Promise<void> => {
        await closeListener(selectedLandscape.url);
      })();
    }
  }, [loginToLandscape]);

  return (
    <Box justifyContent="center" flexDirection="column">
      <Text color={showCancellationMessage ? "red" : "null"}>
        {message}
      </Text>
      <ConfirmInput
        onConfirm={() => {
          setLoginToLandscape(true);
        }}
        onCancel={() => {
          setLoginToLandscape(false);
          setMessage("Operation cancelled");
          setShowCancellationMessage(true);
        }}
      />
    </Box>
  );
}

export default AuthLandscape;
