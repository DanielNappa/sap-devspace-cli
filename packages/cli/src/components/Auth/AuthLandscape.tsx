import { type JSX, useCallback, useEffect, useState } from "react";
import { Box, Text } from "ink";
import open from "open";
import { Alert, ConfirmInput } from "@inkjs/ui";
import { core } from "@sap/bas-sdk";
import DevSpaceMenu from "@/components/DevSpace/DevSpaceMenu.tsx";
import { addLandscape, removeLandscape } from "@/components/Landscape/utils.ts";
import { Loading } from "@/components/UI/Loading.tsx";
import { closeListener, getJWT } from "@/hooks/Auth.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import type { LandscapeConfig, LandscapeSession } from "@/utils/types.ts";

function AuthLandscape(
  { selectedLandscape }: { selectedLandscape: LandscapeConfig },
): JSX.Element {
  const { navigate } = useNavigation();
  const [loginToLandscape, setLoginToLandscape] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCancellationMessage, setShowCancellationMessage] = useState<
    boolean
  >(false);
  const [message, setMessage] = useState<string>(
    "Open browser to authenticate?",
  );
  const [receivedJWT, setReceivedJWT] = useState<boolean>(false);

  const handleSuccessfulAuth: (jwt: string) => void = useCallback(
    (jwt: string) => {
      // Update existing config if JWT didn't previously exist for landscape URL, and overwrite the config with the new JWT
      removeLandscape(selectedLandscape.url);
      addLandscape(selectedLandscape.url, jwt);

      setReceivedJWT(true);

      const landscapeSession: LandscapeSession = {
        name: new URL(selectedLandscape.url).hostname,
        url: selectedLandscape.url,
        jwt: jwt,
      };

      navigate(
        <DevSpaceMenu
          landscapeSession={landscapeSession}
        />,
      );
    },
    [selectedLandscape.url, navigate],
  );

  useEffect(() => {
    if (
      !(selectedLandscape?.jwt && selectedLandscape.jwt.length > 1 &&
        !core.isJwtExpired(selectedLandscape.jwt))
    ) {
      return;
    } else {
      const jwt: string = selectedLandscape.jwt;
      handleSuccessfulAuth(jwt);
    }
  }, []);

  useEffect(() => {
    if (loginToLandscape) {
      (async (): Promise<void> => {
        setLoading(true);
        open(core.getExtLoginPath(selectedLandscape.url));
        // If jwt exists and is not expired then use it otherwise update existing
        // LandscapeConfig with new JWT
        const jwt: string = await getJWT(selectedLandscape.url);
        handleSuccessfulAuth(jwt);
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
    <>
      {loading
        ? <Loading type="bouncingBar" />
        : (
          <Box justifyContent="center" flexDirection="column" marginTop={1}>
            {receivedJWT
              ? (
                <Box justifyContent="center" flexDirection="column" width={72}>
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
        )}
    </>
  );
}

export default AuthLandscape;
