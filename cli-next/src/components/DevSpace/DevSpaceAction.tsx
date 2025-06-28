import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Text } from "ink";
import { type Option, Select } from "@inkjs/ui";
import { devspace } from "@sap/bas-sdk";
import SSH from "@/components/SSH/SSH.tsx";
import Nav from "@/components/UI/Nav.tsx";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { DevSpaceMenuOption, type DevSpaceNode } from "@/utils/types.ts";
import { canDevSpaceStart } from "./utils.ts";
import { DevSpaceUpdate } from "./DevSpaceUpdate.tsx";

function DevSpaceAction({ devSpaceNode, jwt }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
}): JSX.Element {
  const { navigate } = useNavigation();
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(true);
  const [component, setComponent] = useState<JSX.Element>();
  const [message, setMessage] = useState<string>("Select an option:");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [devSpaceStatus, setDevSpaceStatus] = useState<string>("");

  const fetchStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    const info = await devspace.getDevspaceInfo({
      landscapeUrl: devSpaceNode.landscapeURL,
      jwt: jwt,
      wsId: devSpaceNode.id,
    });
    setDevSpaceStatus(info.status);
    setIsLoadingStatus(false);
  }, [
    devSpaceNode.landscapeURL,
    devSpaceNode.id,
    jwt,
  ]);

  useEffect(() => {
    fetchStatus();
  }, []);

  const options: Option[] = useMemo(() => {
    if (isLoadingStatus) return [];
    const isReady = devSpaceStatus === devspace.DevSpaceStatus.RUNNING;
    return [
      isReady
        ? {
          value: `${DevSpaceMenuOption.CONNECT}`,
          label: "Connect to Dev Space (SSH)",
        }
        : {
          value: `${DevSpaceMenuOption.START}`,
          label: "Start Dev Space",
        },
      ...(isReady
        ? [{
          value: `${DevSpaceMenuOption.STOP}`,
          label: "Stop Dev Space",
        }]
        : []),
      {
        value: `${DevSpaceMenuOption.DELETE}`,
        label: "Delete Dev Space",
      },
    ];
  }, [devSpaceStatus, isLoadingStatus]);

  // Add this useEffect for handling selected options
  useEffect(() => {
    if (selectedOption != null) {
      switch (selectedOption) {
        case `${DevSpaceMenuOption.CONNECT}`: {
          // Poll the API until it gives us a non-empty wsURL
          while (devSpaceNode.wsURL.length === 0) {
            devspace.getDevspaceInfo({
              landscapeUrl: devSpaceNode.landscapeURL,
              jwt,
              wsId: devSpaceNode.id,
            }).then((info: devspace.DevspaceInfo) =>
              devSpaceNode.wsURL = info.url
            );
          }
          navigate(<SSH devSpaceNode={devSpaceNode} jwt={jwt} />);
          break;
        }
        case `${DevSpaceMenuOption.START}`:
          canDevSpaceStart(devSpaceNode.landscapeURL, jwt).then(
            (canRun: boolean | string) => {
              if (typeof canRun === `boolean` && canRun === true) {
                setComponent(
                  <DevSpaceUpdate
                    landscapeURL={devSpaceNode.landscapeURL}
                    wsID={devSpaceNode.id}
                    wsName={devSpaceNode.wsName}
                    jwt={jwt}
                    suspend={false}
                    onFinish={() => {
                      setComponent(undefined);
                      setSelectedOption(undefined);
                      fetchStatus();
                    }}
                  />,
                );
              } else if (typeof canRun === `string`) {
                console.log(canRun);
              }
            },
          );
          break;
        case `${DevSpaceMenuOption.STOP}`:
          setComponent(
            <DevSpaceUpdate
              landscapeURL={devSpaceNode.landscapeURL}
              wsID={devSpaceNode.id}
              wsName={devSpaceNode.wsName}
              jwt={jwt}
              suspend={true}
              onFinish={() => {
                setComponent(undefined);
                setSelectedOption(undefined);
                fetchStatus();
              }}
            />,
          );
          break;
        case `${DevSpaceMenuOption.DELETE}`:
          // Handle exit
          break;
      }
    }
  }, [selectedOption, navigate]);

  return (
    <>
      {!!component ? component : (
        <Nav
          component={
            <Box flexDirection="row" marginTop={1}>
              <Box justifyContent="center" flexDirection="column">
                <Box flexDirection="row">
                  <Text>
                    {message}
                  </Text>
                </Box>
                <Select
                  options={options}
                  onChange={(value: string) => {
                    setSelectedOption(value);
                  }}
                />
              </Box>
            </Box>
          }
        />
      )}
    </>
  );
}

export default DevSpaceAction;
