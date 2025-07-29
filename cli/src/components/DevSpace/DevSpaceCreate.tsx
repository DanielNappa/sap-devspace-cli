// import { writeFileSync } from "node:fs";
// import { dirname, join } from "node:path";
// import { fileURLToPath } from "node:url";
import { type JSX, useEffect, useState } from "react";
import chalk from "chalk";
import { Box, Text } from "ink";
import { MultiSelect, type Option, Select } from "@inkjs/ui";
import Spinner from "ink-spinner";
import {
  createDevSpace,
  getDevSpacesSpec,
} from "@sap/bas-sdk/dist/src/apis/get-devspace";
import type {
  DevSpaceCreation,
  DevSpaceExtension,
  DevSpacePack,
  DevSpaceSpec,
} from "@sap/bas-sdk/dist/src/utils/devspace-utils";
import { TextInput } from "@/components/UI/TextInput.tsx";
import { useHelp } from "@/hooks/HelpContext.ts";
import { devspaceMessages } from "@/utils/consts.ts";
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
            // const metadata: { [key: string]: any } = {};
            // filteredPacks.forEach((devSpacePack: DevSpacePack) => {
            //   const organizedDataLocal = organizePackExtensions(
            //     devSpacePack.name,
            //     devSpacesSpecLocal.packs,
            //     devSpacesSpecLocal.extensions,
            //   ) as PackMetadata;

            //   if (!organizedDataLocal) {
            //     console.error(
            //       "Could not process extension data for the selected pack.",
            //     );
            //   }
            //   metadata[devSpacePack.tagline] ??= organizedDataLocal.additional
            //     .extensions.map((
            //       devSpaceExtension: DevSpaceExtension,
            //     ) => ({
            //       name: devSpaceExtension.name,
            //       namespace: devSpaceExtension.namespace,
            //       tagline: devSpaceExtension.tagline,
            //     }));
            // });
            // const __dirname = dirname(fileURLToPath(import.meta.url));

            // const metadataPath: string = join(__dirname, "metadata.json");
            // writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), {
            //   encoding: "utf8",
            // });
          }
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
              if (error instanceof Error) {
                const message = devspaceMessages.err_devspace_creation(
                  devSpaceName,
                  error.toString(),
                );
                console.error(chalk.red(message));
                setLoading(false);
                onFinish();
              }
            });
          }
        }
        break;
      default:
        break;
    }
  }, [currentStep]);

  return (
    <Box flexDirection="column" marginTop={1}>
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
            // onChange={(indices: string[]) => {
            //   if (organizedData?.additional.extensions != null) {
            //     const selectedAdditionalExtensionsLocal = pickByStringIndex(
            //       organizedData.additional.extensions,
            //       indices,
            //     ) as DevSpaceExtension[];
            //     setSelectedAdditionalExtensions(
            //       selectedAdditionalExtensionsLocal,
            //     );
            //   }
            // }}
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
  );
}

export default DevSpaceCreate;
