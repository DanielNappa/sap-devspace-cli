import open from "open";
import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import { type Option, Select } from "@inkjs/ui";
import Spinner from "ink-spinner";
import { devspace } from "@sap/bas-sdk";
import SSH from "@/components/SSH/SSH.tsx";
import { useHelp } from "@/hooks/HelpContext.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { DevSpaceMenuOption, type DevSpaceNode } from "@/utils/types.ts";
import { DevSpaceDelete } from "./DevSpaceDelete.tsx";
import { DevSpaceUpdate } from "./DevSpaceUpdate.tsx";
import { canDevSpaceStart } from "./utils.ts";

function DevSpaceAction({ devSpaceNode, jwt }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
}): JSX.Element {
  const { navigate, goBack } = useNavigation();
  const { setOverlay, useDefaultOverlay } = useHelp();
  const [loading, setLoading] = useState<boolean>(true);
  const [component, setComponent] = useState<JSX.Element>();
  const [message, setMessage] = useState<string>("Select an option:");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [devSpaceStatus, setDevSpaceStatus] = useState<string>("");

  const fetchStatus = useCallback(async () => {
    setOverlay("esc to cancel and return to main menu");
    setLoading(true);
    const info = await devspace.getDevspaceInfo({
      landscapeUrl: devSpaceNode.landscapeURL,
      jwt: jwt,
      wsId: devSpaceNode.id,
    });
    setDevSpaceStatus(info.status);
    setLoading(false);
    (info.status === devspace.DevSpaceStatus.RUNNING)
      ? setOverlay(
        "enter to confirm · o to open BAS in a browser · esc to return to main menu",
      )
      : useDefaultOverlay();
  }, [
    devSpaceNode.landscapeURL,
    devSpaceNode.id,
    jwt,
  ]);

  useEffect(() => {
    fetchStatus();
  }, []);

  useInput((input, _) => {
    if (input === "o" && (devSpaceStatus === devspace.DevSpaceStatus.RUNNING)) {
      (async (): Promise<void> => {
        const url: URL = new URL(devSpaceNode.landscapeURL);
        // It correctly handles whether a '#' already exists or not.
        url.hash = devSpaceNode.id;
        // The hash alone is usually sufficient for these single-page applications.
        if (
          !url.pathname.endsWith("/") && !url.pathname.endsWith("index.html")
        ) {
          url.pathname += "/index.html";
        } else if (
          url.pathname.endsWith("/") && !url.pathname.endsWith("index.html")
        ) {
          url.pathname += "index.html";
        }
        const externalBASURL: string = url.toString();
        open(externalBASURL);
      })();
    }
  });

  const options: Option[] = useMemo(() => {
    if (loading) return [];
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
  }, [devSpaceStatus, loading]);

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
          setComponent(
            <DevSpaceDelete
              devSpaceNode={devSpaceNode}
              jwt={jwt}
              onFinish={() => {
                goBack();
              }}
            />,
          );
          break;
      }
    }
  }, [selectedOption, navigate]);

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
        : component || (
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
        )}
    </>
  );
}

export default DevSpaceAction;
