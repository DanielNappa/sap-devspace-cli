import process from "node:process";
import { type JSX, useEffect, useState } from "react";
import chalk from "chalk";
import { Box, Text, useInput } from "ink";
import { MultiSelect, type Option, Select } from "@inkjs/ui";
import Spinner from "ink-spinner";
import {
  createDevSpace,
  getDevSpacesSpec,
} from "@sap/bas-sdk/dist/src/apis/get-devspace.js";
import type {
  DevSpaceCreation,
  DevSpaceExtension,
  DevSpacePack,
  DevSpaceSpec,
} from "@sap/bas-sdk/dist/src/utils/devspace-utils";
import { TextInput } from "@/components/UI/TextInput.tsx";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary.tsx";
import { useHelp } from "@/hooks/HelpContext.ts";
import { devspaceMessages } from "@/utils/consts.ts";
import {
  AuthenticationError,
  captureException,
  DevSpaceError,
} from "@/utils/errors.ts";
import type { PackMetadata } from "@/utils/types.ts";
import { pickByStringIndex } from "@/utils/utils.ts";
import { organizePackExtensions } from "./utils.ts";

enum DevSpaceCreateStep {
  NAME,
  PACKOPTIONS,
  EXTENSIONS,
  CREATE,
}

function DevSpaceCreate(
  { landscapeURL, jwt, onFinish }: {
    landscapeURL: string;
    jwt: string;
    onFinish: () => void;
  },
): JSX.Element {
  const { setOverlay, useDefaultOverlay } = useHelp();
  const [currentStep, setCurrentStep] = useState<DevSpaceCreateStep>(
    DevSpaceCreateStep.NAME,
  );
  const [message, setMessage] = useState<string>(
    "Enter Dev Space name:",
  );
  const [devSpaceName, setDevSpaceName] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [testError, setTestError] = useState<string>("none");
  const [packOptions, setPackOptions] = useState<Option[]>([]);
  const [devSpacesSpec, setDevSpacesSpec] = useState<DevSpaceSpec>();
  const [devSpacesSpecPacks, setDevSpacesSpecPacks] = useState<
    DevSpacePack[]
  >([]);
  const [selectedPack, setSelectedPack] = useState<DevSpacePack>();
  const [organizedData, setOrganizedData] = useState<PackMetadata>();
  const [additionalExtensionOptions, setAdditionalExtensionOptions] = useState<
    Option[]
  >([]);
  const [selectedAdditionalExtensions, setSelectedAdditionalExtensions] =
    useState<DevSpaceExtension[]>([]);

  useEffect(() => {
    useDefaultOverlay();
  }, []);

  // Development mode error testing
  useInput((input) => {
    if (process.env.NODE_ENV === "development") {
      if (input === "t") {
        // Cycle through different error test scenarios
        const scenarios = ["none", "sync", "async", "devspace", "auth"];
        const currentIndex = scenarios.indexOf(testError);
        const nextIndex = (currentIndex + 1) % scenarios.length;
        setTestError(scenarios[nextIndex]);

        if (scenarios[nextIndex] !== "none") {
          setMessage(`Test Mode: ${scenarios[nextIndex]} error will be thrown`);
          setShowErrorMessage(true);
        } else {
          setMessage("Enter Dev Space name:");
          setShowErrorMessage(false);
        }
      }
    }
  });

  // Trigger test errors in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && testError !== "none") {
      const triggerError = () => {
        switch (testError) {
          case "sync":
            throw new Error(
              "Development test: Synchronous error in DevSpaceCreate",
            );
          case "async":
            setTimeout(() => {
              Promise.reject(
                new Error("Development test: Async error in DevSpaceCreate"),
              );
            }, 100);
            break;
          case "devspace":
            throw new DevSpaceError(
              "Development test: DevSpace error",
              "test-id",
              landscapeURL,
            );
          case "auth":
            throw new AuthenticationError(
              "Development test: Auth error",
              landscapeURL,
            );
        }
      };

      // Small delay to show the message first
      const timer = setTimeout(triggerError, 1000);
      return () => clearTimeout(timer);
    }
  }, [testError, landscapeURL]);

  useEffect(() => {
    switch (currentStep) {
      case DevSpaceCreateStep.NAME:
        getDevSpacesSpec(
          landscapeURL,
          jwt,
        ).then((devSpacesSpecLocal: DevSpaceSpec | undefined) => {
          if (devSpacesSpecLocal != null) {
            setDevSpacesSpec(devSpacesSpecLocal);
            const filteredPacks: DevSpacePack[] = devSpacesSpecLocal.packs
              .filter((pack: DevSpacePack) => pack.name !== "PlatformTest");
            setDevSpacesSpecPacks(filteredPacks);
            setPackOptions(
              filteredPacks.map((pack: DevSpacePack, index: number) => ({
                value: `${index}`,
                label: pack.tagline || pack.name,
              })),
            );
          }
        }).catch((error) => {
          captureException(error, {
            component: "DevSpaceCreate",
            action: "getDevSpacesSpec",
            landscapeURL,
            step: "NAME",
          });
          setMessage(
            "Failed to load DevSpace specifications. Please try again.",
          );
          setShowErrorMessage(true);
        });
        break;
      case DevSpaceCreateStep.PACKOPTIONS:
        setMessage("What kind of application do you want to create?");
        break;
      case DevSpaceCreateStep.EXTENSIONS:
        if (devSpacesSpec != null && selectedPack != null) {
          const organizedDataLocal = organizePackExtensions(
            selectedPack.name,
            devSpacesSpec.packs,
            devSpacesSpec.extensions,
          ) as PackMetadata;

          if (!organizedDataLocal) {
            console.error(
              "Could not process extension data for the selected pack.",
            );
          }
          setOrganizedData(organizedDataLocal);
          const additionalExtensionOptionsLocal: Option[] = organizedDataLocal
            .additional.extensions
            .map((
              extension: DevSpaceExtension,
              index: number,
            ) => ({
              value: `${index}`,
              label: `${extension.tagline || extension.name}`,
              // hint: extension.description,
            }));
          setAdditionalExtensionOptions(additionalExtensionOptionsLocal);

          if (
            organizedDataLocal != null &&
            additionalExtensionOptionsLocal?.length > 0
          ) {
            setMessage(organizedDataLocal.additional.description);
            setOverlay(
              "space to select extension · enter to create dev space · esc to return to main menu",
            );
          }
        }
        break;
      case DevSpaceCreateStep.CREATE:
        if (
          devSpacesSpec != null && organizedData != null &&
          selectedPack != null && !loading
        ) {
          setOverlay("esc to cancel and return to main menu");
          setLoading(true);
          setMessage(devspaceMessages.info_devspace_creating(devSpaceName));
          const predefinedExtensions: string[] = organizedData
            .allPredefinedExtensions
            .map((
              extension: DevSpaceExtension,
            ) => `${extension.namespace}/${extension.name}`);
          const optionalExtensions: string[] = selectedAdditionalExtensions.map(
            (
              extension: DevSpaceExtension,
            ) => `${extension.namespace}/${extension.name}`,
          );
          // Find all technical extensions (required but not necessarily standalone/visible)
          const technicalExts: DevSpaceExtension[] = devSpacesSpec.extensions
            .filter(
              (
                extension: DevSpaceExtension,
              ) => (extension.mode === "required" &&
                extension.standalone === true),
            );
          const technicalExtensions: string[] = technicalExts.map((
            extension: DevSpaceExtension,
          ) => `${extension.namespace}/${extension.name}`);

          const allExtensions: string[] = [
            ...new Set([
              ...predefinedExtensions,
              ...optionalExtensions,
              ...technicalExtensions,
            ]),
          ];
          if (allExtensions.length > 0) {
            const devSpacePayload: DevSpaceCreation = {
              workspacedisplayname: devSpaceName,
              id: "",
              memoryLimitBytes: 2147483648,
              extensions: allExtensions,
              annotations: {
                pack: selectedPack.name,
                packTagline: selectedPack.tagline || "",
                optionalExtensions: JSON.stringify(optionalExtensions),
                technicalExtensions: JSON.stringify(technicalExtensions),
              },
            };
            createDevSpace(landscapeURL, jwt, devSpacePayload).then(() => {
              setMessage(
                devspaceMessages.info_devspace_created(devSpaceName),
              );
              setLoading(false);
              onFinish();
            }).catch((error) => {
              const devSpaceError = new DevSpaceError(
                `Failed to create DevSpace: ${devSpaceName}`,
                undefined,
                landscapeURL,
              );

              captureException(devSpaceError, {
                component: "DevSpaceCreate",
                action: "createDevSpace",
                devSpaceName,
                landscapeURL,
                selectedPack: selectedPack?.name,
                extensionCount: allExtensions.length,
                originalError: error instanceof Error
                  ? error.message
                  : String(error),
              });

              const message = devspaceMessages.err_devspace_creation(
                devSpaceName,
                error instanceof Error ? error.message : String(error),
              );
              console.error(chalk.red(message));
              setLoading(false);
              onFinish();
            });
          }
        }
        break;
      default:
        break;
    }
  }, [currentStep]);

  return (
    <ErrorBoundary
      context={{
        component: "DevSpaceCreate",
        landscapeURL,
        currentStep: DevSpaceCreateStep[currentStep],
        devSpaceName,
      }}
      fallback={(error, _retry) => (
        <Box flexDirection="column" padding={1}>
          <Text color="red">Failed to create DevSpace:</Text>
          <Text color="red">{error.message}</Text>
          <Text dimColor>Press 'r' to retry or 'esc' to go back</Text>
        </Box>
      )}
    >
      <Box flexDirection="column" marginTop={1}>
        {process.env.NODE_ENV === "development" && (
          <Box flexDirection="column" marginBottom={1}>
            <Text dimColor>
              Development Mode: Press 't' to cycle through error tests
            </Text>
            <Text dimColor>Current test: {testError}</Text>
          </Box>
        )}
        {currentStep !== DevSpaceCreateStep.CREATE && (
          <Text color={showErrorMessage ? "red" : "null"}>{message}</Text>
        )}
        {currentStep === DevSpaceCreateStep.NAME && (
          <TextInput
            value={devSpaceName}
            onChange={setDevSpaceName}
            onSubmit={(input: string) => {
              try {
                if (!(/^[a-zA-Z0-9][a-zA-Z0-9_]{0,39}$/.test(input))) {
                  setMessage(devspaceMessages.err_invalid_devspace_name);
                  setShowErrorMessage(true);
                } else {
                  if (input) {
                    if (showErrorMessage) setShowErrorMessage(false);
                    setDevSpaceName(input);
                    setCurrentStep(DevSpaceCreateStep.PACKOPTIONS);
                  }
                }
              } catch (error) {
                captureException(error, {
                  component: "DevSpaceCreate",
                  action: "validateDevSpaceName",
                  input,
                });
                setMessage(devspaceMessages.err_invalid_devspace_name);
                setShowErrorMessage(true);
              }
            }}
            placeholder="..."
          />
        )}
        {currentStep === DevSpaceCreateStep.PACKOPTIONS && (
          <Select
            options={packOptions}
            onChange={(value: string) => {
              const index: number = parseInt(value);
              setSelectedPack(devSpacesSpecPacks[index]);
              setCurrentStep(DevSpaceCreateStep.EXTENSIONS);
            }}
            visibleOptionCount={packOptions.length}
          />
        )}
        {currentStep === DevSpaceCreateStep.EXTENSIONS && (
          <Box flexDirection="column" gap={1}>
            <MultiSelect
              options={additionalExtensionOptions}
              onSubmit={(indices: string[]) => {
                if (organizedData?.additional.extensions != null) {
                  const selectedAdditionalExtensionsLocal = pickByStringIndex(
                    organizedData.additional.extensions,
                    indices,
                  ) as DevSpaceExtension[];
                  setSelectedAdditionalExtensions(
                    selectedAdditionalExtensionsLocal,
                  );
                  setCurrentStep(DevSpaceCreateStep.CREATE);
                }
              }}
              visibleOptionCount={additionalExtensionOptions.length}
            />
          </Box>
        )}
        {currentStep === DevSpaceCreateStep.CREATE && (
          <Box flexDirection="row" marginTop={1}>
            <Box justifyContent="center" flexDirection="column">
              <Text>
                {loading && (
                  <Text>
                    <Spinner type="bouncingBall" />
                  </Text>
                )} {message}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </ErrorBoundary>
  );
}

export default DevSpaceCreate;
