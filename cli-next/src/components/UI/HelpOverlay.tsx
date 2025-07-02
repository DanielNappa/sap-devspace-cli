/**
 * Adopted from https://github.com/openai/codex/blob/main/codex-cli/src/components/help-overlay.tsx
 */
import type { JSX } from "react";
import { Box, Text, useInput } from "ink";

/**
 * An overlay that lists the available slash‑commands and their description.
 * The overlay is purely informational and can be dismissed with the Escape
 * key. Keeping the implementation extremely small avoids adding any new
 * dependencies or complex state handling.
 */
export default function HelpOverlay({
  overlay,
  onExit,
}: {
  overlay: string;
  onExit?: () => void;
}): JSX.Element {
  useInput((input, key) => {
    if (key.escape || input === "q") {
      onExit?.();
    }
  });

  return (
    <Box paddingX={1} marginTop={1}>
      {/* Slightly more verbose footer to make the search behaviour crystal‑clear */}
      <Text dimColor>{overlay}</Text>
    </Box>
  );
}
