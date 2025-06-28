import { type JSX, useEffect, useState } from "react";
import { Box, Text } from "ink";
import open from "open";
import { Alert, ConfirmInput } from "@inkjs/ui";
import { core, devspace } from "@sap/bas-sdk";
import DevSpaceMenu from "@/components/DevSpace/DevSpaceMenu.tsx";
import { getDevSpaces } from "@/components/DevSpace/utils.ts";
import { addLandscape, removeLandscape } from "@/components/Landscape/utils.ts";
import Nav from "@/components/UI/Nav";
import { closeListener, getJWT } from "@/hooks/Auth.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import type { LandscapeConfig, LandscapeSession } from "@/utils/types.ts";

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
  const [receivedJWT, setReceivedJWT] = useState<boolean>(false);

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

        setReceivedJWT(true);

        const landscapeSession: LandscapeSession = {
          name: new URL(selectedLandscape.url).hostname,
          url: selectedLandscape.url,
          jwt: jwt,
        };
        const devSpaces: devspace.DevspaceInfo[] = await getDevSpaces(
          landscapeSession.url,
          landscapeSession.jwt,
        );
        navigate(
          <Nav
            component={
              <DevSpaceMenu
                devSpaces={devSpaces}
                landscapeSession={landscapeSession}
              />
            }
          />,
        );
      })();
    } else {
      (async (): Promise<void> => {
        await closeListener(selectedLandscape.url);
      })();
    }
  }, [loginToLandscape]);

  useEffect(() => {
    if (receivedJWT) {
      setMessage("Received JWT");
    }
  }, [receivedJWT]);

  return (
    <Box justifyContent="center" flexDirection="column">
      {receivedJWT
        ? (
          <Box justifyContent="center" flexDirection="column" width={64}>
            <Alert variant="success">
              {message}
            </Alert>
          </Box>
        )
        : (
          <Text color={showCancellationMessage ? "red" : "null"}>
            {message}
          </Text>
        )}
      {!receivedJWT && (
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
      )}
    </Box>
  );
}

export default AuthLandscape;
