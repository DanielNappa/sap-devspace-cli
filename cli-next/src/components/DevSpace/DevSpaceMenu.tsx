import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import { ConfirmInput, type Option, Select } from "@inkjs/ui";
import Spinner from "ink-spinner";
import type { devspace } from "@sap/bas-sdk";
import { getDevSpaces } from "@/components/DevSpace/utils.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { useHelp } from "@/hooks/HelpContext.ts";
import type { DevSpaceNode, LandscapeSession } from "@/utils/types.ts";
import DevSpaceAction from "./DevSpaceAction.tsx";
import DevSpaceCreate from "./DevSpaceCreate.tsx";

function DevSpaceMenu({ landscapeSession }: {
  landscapeSession: LandscapeSession;
}): JSX.Element {
  const { navigate, goBack } = useNavigation();
  const { setOverlay, useDefaultOverlay } = useHelp();
  const [message, setMessage] = useState<string>("");
  const [component, setComponent] = useState<JSX.Element>();
  const [devSpaces, setDevSpaces] = useState<devspace.DevspaceInfo[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [noDevSpaces, setNoDevSpaces] = useState<boolean>(false);

  const fetchDevSpaceInfo = useCallback(async () => {
    setOverlay("esc to cancel and return to main menu");
    setLoading(true);
    const devSpacesLocal: devspace.DevspaceInfo[] = await getDevSpaces(
      landscapeSession.url,
      landscapeSession.jwt,
    );
    if (devSpacesLocal && devSpacesLocal?.length === 0) {
      useDefaultOverlay();
      setMessage(
        "There are no Dev Spaces in this landscape. Create a new Dev Space?",
      );
      if (!noDevSpaces) {
        setNoDevSpaces(true);
      }
    } else {
      setOverlay(
        "enter to confirm · n to create a new dev space · esc to return to main menu",
      );
      setNoDevSpaces(false);
      setMessage(
        "Select a Dev Space:",
      );
      setDevSpaces(devSpacesLocal);
    }
    setLoading(false);
  }, [devSpaces, loading, message, noDevSpaces]);

  useEffect(() => {
    fetchDevSpaceInfo();
  }, []);

  useInput((input, _) => {
    if (input === "n" && !noDevSpaces) {
      setComponent(
        <DevSpaceCreate
          landscapeURL={landscapeSession.url}
          jwt={landscapeSession.jwt}
          onFinish={() => {
            setMessage("Select a Dev Space:");
            fetchDevSpaceInfo();
            setComponent(undefined);
          }}
        />,
      );
    }
  });

  useEffect(() => {
    if (selectedOption != null) {
      const index: number = parseInt(selectedOption);
      const selectedDevSpace = devSpaces[index] as devspace.DevspaceInfo;
      const devSpaceNode: DevSpaceNode = {
        label:
          `${selectedDevSpace.devspaceDisplayName} (${selectedDevSpace.packDisplayName})`,
        id: selectedDevSpace.id,
        landscapeURL: landscapeSession.url,
        wsName: selectedDevSpace.devspaceDisplayName,
        wsURL: selectedDevSpace.url,
        status: selectedDevSpace.status,
      };

      navigate(
        <DevSpaceAction
          devSpaceNode={devSpaceNode}
          jwt={landscapeSession.jwt}
        />,
      );
    }
  });

  const devSpaceOptions: Option[] = useMemo(
    () =>
      devSpaces?.map((devSpace, i) => ({
        value: `${i}`,
        label:
          `${devSpace.devspaceDisplayName} (${devSpace.packDisplayName}) - ${devSpace.status}`,
      })),
    [devSpaces],
  );

  return (
    <>
      {loading
        ? (
          <Box flexDirection="row" marginTop={1}>
            <Box justifyContent="center" flexDirection="column">
              <Text>
                <Text>
                  <Spinner type="bouncingBar" />
                </Text>
              </Text>
            </Box>
          </Box>
        )
        : (component || (
          <Box justifyContent="center" flexDirection="column" marginTop={1}>
            <Box flexDirection="column" width={"70%"}>
              <Text>
                {message}
              </Text>
            </Box>
            {noDevSpaces
              ? (
                <ConfirmInput
                  onConfirm={() => {
                    setComponent(
                      <DevSpaceCreate
                        landscapeURL={landscapeSession.url}
                        jwt={landscapeSession.jwt}
                        onFinish={() => {
                          setMessage("Select a Dev Space:");
                          fetchDevSpaceInfo();
                          setComponent(undefined);
                        }}
                      />,
                    );
                  }}
                  onCancel={() => {
                    goBack();
                  }}
                />
              )
              : (
                <Box justifyContent="center" flexDirection="column">
                  <Select
                    options={devSpaceOptions}
                    onChange={(value: string) => {
                      setSelectedOption(value);
                    }}
                  />
                </Box>
              )}
          </Box>
        ))}
    </>
  );
}

export default DevSpaceMenu;
