import { type JSX, useEffect, useMemo, useState } from "react";
import { Select } from "@inkjs/ui";
import { ensureFileSync } from "fs-extra";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { LANDSCAPE_CONFIG_PATH } from "@/utils/consts.ts";
import { type LandscapeConfig, LandscapeMenuOption } from "@/utils/types.ts";
import { getLandscapesConfig } from "./utils.ts";
import LandscapeSelect from "./LandscapeSelect.tsx";
import LandscapeURL from "./LandscapeURL.tsx";
import { Box } from "ink";

function LandscapeMenu(): JSX.Element {
  const { navigate } = useNavigation();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const landscapesConfig: LandscapeConfig[] = useMemo(() => {
    ensureFileSync(LANDSCAPE_CONFIG_PATH);
    return getLandscapesConfig();
  }, []);

  useEffect(() => {
    if (!landscapesConfig || landscapesConfig.length === 0) {
      navigate(<LandscapeURL />);
    }
  }, [landscapesConfig, navigate]);

  // Add this useEffect for handling selected options
  useEffect(() => {
    if (selectedOption != null) {
      switch (selectedOption) {
        case "LOGIN":
          navigate(
            <LandscapeSelect
              landscapeMenuOption={LandscapeMenuOption.LOGIN}
            />,
          );
          break;
        case "ADD":
          navigate(<LandscapeURL />);
          break;
        case "DELETE":
          navigate(
            <LandscapeSelect
              landscapeMenuOption={LandscapeMenuOption.DELETE}
            />,
          );
          break;
        case "EXIT":
          // Handle exit
          break;
      }
    }
  }, [selectedOption, navigate]);

  return (
    <Box justifyContent="center" flexDirection="column">
      <Select
        options={[
          {
            value: "LOGIN",
            label: "Login to landscape",
          },
          {
            value: "ADD",
            label: "Add landscape",
          },
          {
            value: "DELETE",
            label: "Delete landscape",
          },
          {
            value: "EXIT",
            label: "Exit",
          },
        ]}
        onChange={(value: string) => {
          setSelectedOption(value);
        }}
      />
    </Box>
  );
}

export default LandscapeMenu;
