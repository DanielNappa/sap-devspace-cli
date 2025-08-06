import { type JSX } from "react";
import Spinner from "ink-spinner";
import { Box, Text } from "ink";

function BouncingBar(): JSX.Element {
  return (
    <Box flexDirection="row" marginTop={1}>
      <Box justifyContent="center" flexDirection="column">
        <Text>
          <Spinner type="bouncingBar" />
        </Text>
      </Box>
    </Box>
  );
}

const componentMap = {
  bouncingBar: BouncingBar,
} as const;

export function Loading(
  { type }: { type: keyof typeof componentMap },
): JSX.Element {
  const Component = componentMap[type];
  return <Component />;
}
