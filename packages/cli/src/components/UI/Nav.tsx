import type { JSX } from "react";
import { Box, Text } from "ink";
import { BAS_LOGO_SMALL } from "@/utils/consts.ts";

function Nav({ component }: { component: JSX.Element }): JSX.Element {
  return (
    <Box flexDirection="row" gap={5} width={"95%"}>
      <Box flexDirection="column" width={44}>
        <Text color="cyan">{BAS_LOGO_SMALL}</Text>
      </Box>
      {component}
    </Box>
  );
}

export default Nav;
