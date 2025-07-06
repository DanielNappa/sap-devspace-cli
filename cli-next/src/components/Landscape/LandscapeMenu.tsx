import { type JSX, useEffect, useMemo, useState } from "react";
import { Box } from "ink";
import { Select } from "@inkjs/ui";
import Nav from "@/components/UI/Nav.tsx";
import { useNavigation } from "@/hooks/NavigationContext.ts";
import { type LandscapeConfig, LandscapeMenuOption } from "@/utils/types.ts";
import LandscapeSelect from "./LandscapeSelect.tsx";
import LandscapeURL from "./LandscapeURL.tsx";
import { getLandscapesConfig } from "./utils.ts";

function LandscapeMenu(): JSX.Element {
  const { navigate } = useNavigation();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const landscapesConfig: LandscapeConfig[] = useMemo(() => {
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
    <Nav
      component={
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
      }
    />
  );
}

export default LandscapeMenu;
