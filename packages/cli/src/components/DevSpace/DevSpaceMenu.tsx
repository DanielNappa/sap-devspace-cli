import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import chalk from "chalk";
import { Box, Text, useInput } from "ink";
import { ConfirmInput } from "@inkjs/ui";
import type { devspace } from "@sap/bas-sdk";
import { getDevSpaces } from "@/components/DevSpace/utils.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import {
  EnhancedSelectInput,
  type Item,
} from "@/components/UI/EnhancedSelect.tsx";
import { Loading } from "@/components/UI/Loading.tsx";
import { useHelp } from "@/hooks/HelpContext.ts";
import type { DevSpaceNode, LandscapeSession } from "@/utils/types.ts";
import DevSpaceAction from "./DevSpaceAction.tsx";
import DevSpaceCreate from "./DevSpaceCreate.tsx";
import { DevSpaceItem } from "./DevSpaceItem.tsx";

function DevSpaceMenu({ landscapeSession }: {
  landscapeSession: LandscapeSession;
}): JSX.Element {
  const { navigate, goBack } = useNavigation();
  const { setOverlay, useDefaultOverlay } = useHelp();
  const [message, setMessage] = useState<string>("");
  const [component, setComponent] = useState<JSX.Element>();
  const [devSpaces, setDevSpaces] = useState<devspace.DevspaceInfo[]>([]);
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

  const selectOptions: Item<devspace.DevspaceInfo>[] = useMemo(
    () =>
      devSpaces.map((devSpace: devspace.DevspaceInfo, index: number) => {
        const statusColored = devSpace.status === "RUNNING"
          ? chalk.green(devSpace.status)
          : chalk.gray(devSpace.status);

        const label = `${devSpace.devspaceDisplayName}\n` +
          chalk.white(devSpace.packDisplayName ?? "") +
          `\n` +
          statusColored;

        return {
          key: `${index}`,
          label,
          value: devSpace,
          // hotkey: String((i + 1) % 10), // optional
        };
      }),
    [devSpaces],
  );

  return (
    <>
      {loading
        ? <Loading type="bouncingBar" />
        : (component || (
          <Box justifyContent="center" flexDirection="column" marginTop={1}>
            <Box flexDirection="column" width={72}>
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
                  <EnhancedSelectInput
                    items={selectOptions}
                    itemComponent={DevSpaceItem}
                    // optional props: initialIndex={0} limit={10} orientation="vertical"
                    onSelect={(item: Item<devspace.DevspaceInfo>) => {
                      const selectedDevSpace = item.value;
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
                    }}
                    onHighlight={() => {
                      /* optional: update overlay or context on highlight */
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
