import process from "node:process";
import { useState } from "react";
import { Box, render, Text, useInput } from "ink";
import {
  AuthenticationError as _AuthenticationError,
  captureException,
  DevSpaceError,
  NetworkError as _NetworkError,
} from "../utils/errors.ts";
import { ErrorBoundary } from "../components/UI/ErrorBoundary.tsx";

function QuickErrorTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [shouldThrow, setShouldThrow] = useState(false);

  // Throw during render to exercise ErrorBoundary
  if (shouldThrow) {
    throw new Error("Quick sync error test");
  }
  useInput(async (input) => {
    if (isRunning) return;

    setIsRunning(true);
    setTestResult("Running test...");

    try {
      switch (input) {
        case "1":
          // Test basic error capture
          await captureException(new Error("Quick test error"), {
            component: "QuickTest",
            action: "basicTest",
          });
          setTestResult("✅ Basic error captured successfully");
          break;

        case "2":
          // Test DevSpace error
          await captureException(
            new DevSpaceError(
              "Quick DevSpace test",
              "test-id",
              "https://test.com",
            ),
            {
              component: "QuickTest",
              action: "devSpaceTest",
            },
          );
          setTestResult("✅ DevSpace error captured successfully");
          break;

        case "3":
          // Test sync error boundary by throwing during render on next tick
          setShouldThrow(true);
          break;
        case "4":
          // Test async error (global handler)
          Promise.reject(new Error("Quick async error test"));
          setTestResult(
            "✅ Async error sent to global handler (check console)",
          );
          break;

        case "5": {
          // Test PostHog availability
          const { getPostHog } = await import("../utils/utils.ts");
          const posthog = await getPostHog();
          if (posthog) {
            setTestResult("✅ PostHog client is available and initialized");
          } else {
            setTestResult(
              "❌ PostHog not available (API key missing or disabled)",
            );
          }
          break;
        }

        case "q":
          process.exit(0);
          break;

        default:
          setTestResult("Press 1-5 to run tests, q to quit");
      }
    } catch (error) {
      setTestResult(
        `❌ Test failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    setIsRunning(false);
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">⚡ Quick Error Handling Test</Text>
      <Text>---</Text>

      <Box flexDirection="column" marginY={1}>
        <Text>1. Test basic error capture</Text>
        <Text>2. Test DevSpace error capture</Text>
        <Text>3. Test sync error boundary</Text>
        <Text>4. Test async error (global handler)</Text>
        <Text>5. Test PostHog availability</Text>
        <Text>q. Quit</Text>
      </Box>

      <Text>---</Text>
      {testResult && (
        <Box marginY={1}>
          <Text>{testResult}</Text>
        </Box>
      )}

      {isRunning && <Text color="yellow">Running...</Text>}
    </Box>
  );
}

function QuickTestApp() {
  return (
    <ErrorBoundary
      context={{ component: "QuickTestApp" }}
      fallback={(error, _retry) => (
        <Box flexDirection="column" padding={1}>
          <Text color="red" bold>✅ Error Boundary Caught Error!</Text>
          <Text color="red">Message: {error.message}</Text>
          <Text dimColor>This confirms error boundaries are working!</Text>
          <Text dimColor>Press any key to continue...</Text>
        </Box>
      )}
    >
      <QuickErrorTest />
    </ErrorBoundary>
  );
}

export function runQuickTest() {
  console.log("⚡ Quick Error Handling Test");
  console.log("Fast verification of your error handling setup");
  console.log("---");

  const { unmount } = render(<QuickTestApp />);

  // Handle cleanup on exit
  process.on("SIGINT", () => {
    console.log("\n👋 Quick test interrupted");
    unmount();
    process.exit(0);
  });
}

// Run directly if this file is executed
if (import.meta.url === `file://${process.argv[1]}`) {
  runQuickTest();
}
