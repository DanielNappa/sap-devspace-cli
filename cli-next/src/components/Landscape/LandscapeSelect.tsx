import { useEffect, useMemo, useState } from "react";
import { strict as assert } from "assert";
import { Box, Text } from "ink";
import { Select } from "@inkjs/ui";
import AuthLandscape from "@/components/Auth/AuthLandscape.tsx";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { type LandscapeConfig, LandscapeMenuOption } from "@/utils/types.ts";
import { deleteLandscape, getLandscapesConfig } from "./utils.ts";
import LandscapeMenu from "./LandscapeMenu.tsx";
import LandscapeURL from "./LandscapeURL.tsx";

function LandscapeSelect(
  { landscapeMenuOption }: {
    landscapeMenuOption: number;
  },
) {
  const { navigate } = useNavigation();
  const [selectedLandscapeIndex, setSelectedLandscapeIndex] = useState<
    number
  >();
  const landscapesConfig: LandscapeConfig[] = useMemo(() => {
    return getLandscapesConfig();
  }, []);

  useEffect(() => {
    if (!landscapesConfig || landscapesConfig.length === 0) {
      navigate(<LandscapeURL />);
    }
  }, [landscapesConfig, navigate]);

  const landscapes = useMemo(
    () =>
      landscapesConfig.map((landscape, i) => ({
        value: `${i}`,
        label: new URL(landscape.url).hostname,
      })),
    [landscapesConfig],
  );

  useEffect(() => {
    if (typeof selectedLandscapeIndex === "number") {
      const selectedLandscape =
        landscapesConfig[selectedLandscapeIndex] as LandscapeConfig;
      assert(selectedLandscape != null);
      switch (landscapeMenuOption) {
        case LandscapeMenuOption.LOGIN:
          navigate(
            <AuthLandscape selectedLandscape={selectedLandscape} />,
          );
          break;
        case LandscapeMenuOption.DELETE:
          deleteLandscape(selectedLandscape);
          navigate(<LandscapeMenu />);
          break;
      }
    }
  }, [selectedLandscapeIndex]);

  return (
    <Box justifyContent="center" flexDirection="column" marginTop={1}>
      <Box flexDirection="column" width={"70%"}>
        <Text>
          {`Select a landscape${
            landscapeMenuOption === LandscapeMenuOption.DELETE
              ? " to delete"
              : ""
          }:`}
        </Text>
      </Box>
      <Box justifyContent="center" flexDirection="column">
        <Select
          options={landscapes}
          onChange={(value) => {
            setSelectedLandscapeIndex(parseInt(value));
          }}
        />
      </Box>
    </Box>
  );
}

export default LandscapeSelect;
