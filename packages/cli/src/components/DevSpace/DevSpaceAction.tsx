import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureFile } from "fs-extra";
import open from "open";
import { Box, Text, useInput } from "ink";
import { ConfirmInput, type Option, Select } from "@inkjs/ui";
import Spinner from "ink-spinner";
import { devspace } from "@sap/bas-sdk";
import SSH from "@/components/SSH/SSH.tsx";
import { TextInput } from "@/components/UI/TextInput.tsx";
import { useHelp } from "@/hooks/HelpContext.ts";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { DEVSPACE_SETTINGS_PATH, devspaceMessages } from "@/utils/consts.ts";
import {
  DevSpaceMenuOption,
  type DevSpaceNode,
  type DevSpaceSettings,
} from "@/utils/types.ts";
import { DevSpaceDelete } from "./DevSpaceDelete.tsx";
import { DevSpaceUpdate } from "./DevSpaceUpdate.tsx";
import { canDevSpaceStart } from "./utils.ts";

enum SSHAliasStep {
  NONE,
  CONFIRM,
  INPUT,
}

function DevSpaceAction({ devSpaceNode, jwt }: {
  devSpaceNode: DevSpaceNode;
  jwt: string;
}): JSX.Element {
  const { navigate, goBack } = useNavigation();
  const { setOverlay, useDefaultOverlay } = useHelp();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasBeenPrompted, setHasBeenPrompted] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element>();
  const [message, setMessage] = useState<string>("Select an option:");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [sshAlias, setSSHAlias] = useState<string>(
    `${devSpaceNode.wsName}.devspace`,
  );
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [devSpaceStatus, setDevSpaceStatus] = useState<string>("");
  const [sshAliasStep, setSSHAliasStep] = useState<SSHAliasStep>(
    SSHAliasStep.NONE,
  );

  const devSpaceKey: string = useMemo(
    () => `${devSpaceNode.wsName}-${devSpaceNode.id}`,
    [],
  );

  const fetchStatus = useCallback(async () => {
    setOverlay("esc to cancel and return to main menu");
    setLoading(true);
    const info = await devspace.getDevspaceInfo({
      landscapeUrl: devSpaceNode.landscapeURL,
      jwt: jwt,
      wsId: devSpaceNode.id,
    });
    setDevSpaceStatus(info.status);
    const devSpaceSettings: DevSpaceSettings = await getDevSpaceSettings();
    setHasBeenPrompted(
      !!devSpaceSettings[devSpaceNode.landscapeURL]?.[devSpaceKey],
    );
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

  const getDevSpaceSettings: () => Promise<DevSpaceSettings> = useCallback(
    async (): Promise<DevSpaceSettings> => {
      await ensureFile(DEVSPACE_SETTINGS_PATH);
      const settingsBuffer: string = readFileSync(DEVSPACE_SETTINGS_PATH, {
        encoding: "utf-8",
      }).trim();
      const devSpaceSettings = settingsBuffer
        ? (JSON.parse(settingsBuffer) as DevSpaceSettings)
        : ({} as DevSpaceSettings);
      return devSpaceSettings;
    },
    [],
  );

  const updateDevSpaceSettings = useCallback(
    async (
      devSpaceNode: DevSpaceNode,
      hasBeenPromptedLocal: boolean,
    ): Promise<void> => {
      await ensureFile(DEVSPACE_SETTINGS_PATH);
      const settingsBuffer: string = readFileSync(DEVSPACE_SETTINGS_PATH, {
        encoding: "utf-8",
      }).trim();
      const devSpaceSettings = settingsBuffer
        ? (JSON.parse(settingsBuffer) as DevSpaceSettings)
        : ({} as DevSpaceSettings);
      // Ensure nested structure exists
      const host: string = devSpaceNode.landscapeURL;
      if (!devSpaceSettings[host]) {
        devSpaceSettings[host] = {};
      }
      devSpaceSettings[host]![devSpaceKey] = hasBeenPromptedLocal;
      writeFileSync(
        DEVSPACE_SETTINGS_PATH,
        JSON.stringify(devSpaceSettings, null, 2),
      );
    },
    [],
  );

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

  useEffect(() => {
    if (sshAliasStep !== SSHAliasStep.NONE) {
      useDefaultOverlay();
    }
  }, [sshAliasStep]);

  // Add this useEffect for handling selected options
  useEffect(() => {
    if (selectedOption != null) {
      switch (selectedOption) {
        case `${DevSpaceMenuOption.CONNECT}`: {
          // Poll the API until it gives us a non-empty wsURL
          (async (): Promise<void> => {
            const maxRetries = 30; // timeout after ~30 seconds
            let retries = 0;

            while (devSpaceNode.wsURL.length === 0 && retries < maxRetries) {
              try {
                const info: devspace.DevspaceInfo = await devspace
                  .getDevspaceInfo({
                    landscapeUrl: devSpaceNode.landscapeURL,
                    jwt,
                    wsId: devSpaceNode.id,
                  });
                devSpaceNode.wsURL = info.url;

                if (devSpaceNode.wsURL.length === 0) {
                  // Wait 1 second before next poll
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  retries++;
                }
              } catch (error) {
                console.error("Failed to poll devspace info:", error);
                setMessage("Failed to connect to Dev Space. Please try again.");
                setSelectedOption(undefined);
                return;
              }
            }

            if (retries >= maxRetries) {
              setMessage(
                "Timeout waiting for Dev Space URL. Please try again.",
              );
              setSelectedOption(undefined);
              return;
            }

            if (!hasBeenPrompted) {
              setMessage(
                `Save a permanent SSH alias for ${devSpaceNode.wsName} so you can later just run ssh my-devspace-alias?`,
              );
              setSSHAliasStep(SSHAliasStep.CONFIRM);
            } else {
              navigate(<SSH devSpaceNode={devSpaceNode} jwt={jwt} />);
            }
          })();
          break;
        }
        case `${DevSpaceMenuOption.START}`:
          canDevSpaceStart(devSpaceNode.landscapeURL, jwt).then(
            (canRun: boolean | string) => {
              if (typeof canRun === "boolean" && canRun === true) {
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
              } else if (typeof canRun === "string") {
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
                <Text color={showErrorMessage ? "red" : "null"}>{message}</Text>
              </Box>
              {sshAliasStep === SSHAliasStep.NONE && (
                <Select
                  options={options}
                  onChange={(value: string) => {
                    setSelectedOption(value);
                  }}
                />
              )}
              {sshAliasStep === SSHAliasStep.CONFIRM && (
                <ConfirmInput
                  onConfirm={() => {
                    setMessage("Enter SSH Alias:");
                    setSSHAliasStep(SSHAliasStep.INPUT);
                    updateDevSpaceSettings(devSpaceNode, true);
                    setHasBeenPrompted(true);
                  }}
                  onCancel={() => {
                    setSSHAliasStep(SSHAliasStep.NONE);
                    updateDevSpaceSettings(devSpaceNode, true);
                    setHasBeenPrompted(true);
                    navigate(<SSH devSpaceNode={devSpaceNode} jwt={jwt} />);
                  }}
                />
              )}
              {sshAliasStep === SSHAliasStep.INPUT && (
                <TextInput
                  value={sshAlias}
                  onChange={setSSHAlias}
                  onSubmit={(input: string) => {
                    try {
                      if (!(/^!?(?:[A-Za-z0-9._-]|\?|\*)+$/.test(input))) {
                        setMessage(devspaceMessages.err_invalid_alias_name);
                        setShowErrorMessage(true);
                      } else {
                        if (input) {
                          if (showErrorMessage) setShowErrorMessage(false);
                          setSSHAlias(input);
                          setSSHAliasStep(SSHAliasStep.NONE);
                          navigate(
                            <SSH
                              devSpaceNode={devSpaceNode}
                              jwt={jwt}
                              newHostAlias={input}
                            />,
                          );
                        }
                      }
                    } catch (error) {
                      setMessage(devspaceMessages.err_invalid_alias_name);
                      setShowErrorMessage(true);
                    }
                  }}
                  placeholder={`${devSpaceNode.wsName}.devspace`}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}

export default DevSpaceAction;
