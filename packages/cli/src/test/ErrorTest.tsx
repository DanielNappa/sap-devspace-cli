#!/usr/bin/env -S node --no-warnings --use-system-ca --enable-source-maps
import { useState } from "react";
import { Box, Text, useInput } from "ink";
import { render } from "ink";
import process from "node:process";
import { ErrorBoundary } from "../components/UI/ErrorBoundary.tsx";
import { ErrorDisplay } from "../components/UI/ErrorDisplay.tsx";

// Component that throws different types of errors
function ErrorThrowingComponent({ errorType }: { errorType: string }) {
  switch (errorType) {
    case "simple":
      throw new Error("Simple error message");

    case "multiline":
      throw new Error(`This is a multi-line error message.
Line 2 of the error.
Line 3 of the error.
Line 4 of the error.
Line 5 of the error.
Line 6 of the error.
Line 7 of the error.
Line 8 of the error.
Line 9 of the error.
Line 10 of the error.
Line 11 of the error - this should be truncated.
Line 12 of the error - this should be truncated.
Line 13 of the error - this should be truncated.`);

    case "stack": {
      const error = new Error("Error with stack trace");
      // Simulate a deeper stack trace
      error.stack = `Error: Error with stack trace
    at ErrorThrowingComponent (/path/to/file.tsx:45:13)
    at renderWithHooks (/path/to/react/hooks.js:123:45)
    at updateFunctionComponent (/path/to/react/fiber.js:234:56)
    at beginWork (/path/to/react/work.js:345:67)
    at performUnitOfWork (/path/to/react/scheduler.js:456:78)
    at workLoopSync (/path/to/react/scheduler.js:567:89)
    at renderRootSync (/path/to/react/reconciler.js:678:90)
    at performSyncWorkOnRoot (/path/to/react/reconciler.js:789:01)
    at scheduleUpdateOnFiber (/path/to/react/reconciler.js:890:12)
    at updateContainer (/path/to/react/reconciler.js:901:23)
    at ReactDOMRoot.render (/path/to/react-dom/root.js:012:34)
    at Object.render (/path/to/app/index.js:123:45)`;
      throw error;
    }

    case "long": {
      const longMessage = Array(50).fill(
        "This is a very long error message that should demonstrate the middle truncation feature.",
      ).join(" ");
      throw new Error(longMessage);
    }

    default:
      return <Text>No error - component working normally</Text>;
  }
}

function ErrorTestApp() {
  const [errorType, setErrorType] = useState<string>("none");
  const [showStandalone, setShowStandalone] = useState(false);

  useInput((input) => {
    if (input === "1") {
      setErrorType("simple");
      setShowStandalone(false);
    } else if (input === "2") {
      setErrorType("multiline");
      setShowStandalone(false);
    } else if (input === "3") {
      setErrorType("stack");
      setShowStandalone(false);
    } else if (input === "4") {
      setErrorType("long");
      setShowStandalone(false);
    } else if (input === "5") {
      setShowStandalone(true);
      setErrorType("none");
    } else if (input === "r" || input === "R") {
      setErrorType("none");
      setShowStandalone(false);
    } else if (input === "q" || input === "Q") {
      process.exit(0);
    }
  });

  if (showStandalone) {
    const testError = new Error(`Standalone error display test.
This demonstrates the ErrorDisplay component.
Line 3 of the error.
Line 4 of the error.
Line 5 of the error.
Line 6 of the error.
Line 7 of the error.
Line 8 of the error.
Line 9 of the error.
Line 10 of the error.
Line 11 - should be truncated.
Line 12 - should be truncated.`);

    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          Error Display Test - Standalone Mode
        </Text>
        <Text>---</Text>

        <Box flexDirection="column" marginTop={1}>
          <Text bold>Standalone ErrorDisplay Component:</Text>
          <ErrorDisplay
            error={testError}
            verbose={false}
            showType
            context="Standalone Error Test"
          />
        </Box>

        <Box marginTop={1}>
          <Text dimColor>Press 'r' to return to main menu, 'q' to quit</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">Error Display Test</Text>
      <Text>---</Text>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>Test Options:</Text>
        <Text>1: Simple error (single line)</Text>
        <Text>2: Multi-line error (truncation test)</Text>
        <Text>3: Error with stack trace</Text>
        <Text>4: Very long error (middle truncation)</Text>
        <Text>5: Standalone ErrorDisplay component</Text>
        <Text>r: Reset</Text>
        <Text>q: Quit</Text>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>Error Boundary Test:</Text>
        <ErrorBoundary
          context={{
            component: "ErrorTest",
            errorType,
            timestamp: new Date().toISOString(),
          }}
        >
          <ErrorThrowingComponent errorType={errorType} />
        </ErrorBoundary>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>When an error occurs:</Text>
        <Text dimColor>• Press 'r' to retry</Text>
        <Text dimColor>• Press 'v' to toggle verbose mode</Text>
        <Text dimColor>• Press 'esc' to go back (if supported by parent)</Text>
      </Box>
    </Box>
  );
}

export function runErrorTest() {
  console.log("Testing Error Display");
  console.log(
    "This demonstrates truncated error display with verbose mode toggle",
  );
  console.log("---");

  const { unmount } = render(<ErrorTestApp />);

  // Handle cleanup
  process.on("SIGINT", () => {
    unmount();
    process.exit(0);
  });
}

// Run if this file is executed directly
if (import.meta.main) {
  runErrorTest();
}
