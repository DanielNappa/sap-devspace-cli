import process from "node:process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { useState } from "react";
import { Box, Text, useApp, useInput } from "ink";
import { render } from "ink";
import { ErrorBoundaryTest } from "@/components/UI/__tests__/ErrorBoundaryTest.tsx";
import PostHogTest from "./posthogTest.tsx";

type TestSuite = "menu" | "errorBoundary" | "errorScenarios" | "posthog";

function TestSuiteMenu() {
  const [currentSuite, setCurrentSuite] = useState<TestSuite>("menu");
  const { exit } = useApp();

  useInput((input) => {
    // Normalize to lower-case so we handle uppercase too
    const key = input.toLowerCase();
    switch (key) {
      case "1":
        setCurrentSuite("errorBoundary");
        break;
      case "2":
        setCurrentSuite("errorScenarios");
        break;
      case "3":
        setCurrentSuite("posthog");
        break;
      case "b":
        if (currentSuite !== "menu") {
          setCurrentSuite("menu");
        }
        break;
      case "q":
        exit();
        break;
    }
  });

  const renderCurrentSuite = () => {
    switch (currentSuite) {
      case "errorBoundary":
        return <ErrorBoundaryTest />;
      case "errorScenarios":
        return (
          <Box flexDirection="column" padding={1}>
            <Text bold>Error Scenario Tests</Text>
            <Text dimColor>
              Coming soon. Press 'b' to go back to the menu.
            </Text>
          </Box>
        );
      case "posthog":
        return <PostHogTest />;
      default:
        return (
          <Box flexDirection="column" padding={1}>
            <Text bold color="cyan">
              SAP DevSpace CLI - Error Handling Test Suite
            </Text>
            <Text>---</Text>
            <Text>Choose a test suite to run:</Text>
            <Text></Text>

            <Box flexDirection="column" marginLeft={2}>
              <Text>1. Error Boundary Tests</Text>
              <Text dimColor>
                Test React Error Boundaries with sync/async errors
              </Text>
              <Text></Text>

              <Text>2. Error Scenario Tests</Text>
              <Text dimColor>
                Test different error types and custom error classes
              </Text>
              <Text></Text>

              <Text>3. PostHog Integration Tests</Text>
              <Text dimColor>
                Test PostHog error tracking and event capture
              </Text>
              <Text></Text>
            </Box>

            <Text>---</Text>
            <Text>Press 1-3 to select a test suite, 'q' to quit</Text>

            <Box flexDirection="column" marginTop={1}>
              <Text bold color="yellow">Environment Info:</Text>
              <Text dimColor>Node.js: {process.version}</Text>
              <Text dimColor>Platform: {process.platform}</Text>
              <Text dimColor>
                PostHog API Key:{" "}
                {process.env.POSTHOG_API_KEY ? "✅ Set" : "❌ Not set"}
              </Text>
              <Text dimColor>
                DO_NOT_TRACK: {process.env.DO_NOT_TRACK || "Not set"}
              </Text>
              <Text dimColor>
                DS_TELEMETRY: {process.env.DS_TELEMETRY || "Not set"}
              </Text>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box flexDirection="column">
      {currentSuite !== "menu" && (
        <Box flexDirection="column" marginBottom={1}>
          <Text dimColor>Press 'b' to go back to menu, 'q' to quit</Text>
          <Text>---</Text>
        </Box>
      )}
      {renderCurrentSuite()}
    </Box>
  );
}

export function runTestSuite() {
  console.log("SAP DevSpace CLI - Error Handling Test Suite");
  console.log(
    "This comprehensive test suite will help you verify your error handling implementation",
  );
  console.log("---");

  const { unmount } = render(<TestSuiteMenu />);

  // Handle cleanup on exit
  process.on("SIGINT", () => {
    console.log("\n👋 Test suite interrupted by user");
    unmount();
    process.exit(0);
  });

  // Run directly if this file is executed
  try {
    const invoked = process.argv[1] ? resolve(process.argv[1]) : "";
    const invokedUrl = invoked ? pathToFileURL(invoked).href : "";
    if (import.meta.url === invokedUrl) {
      runTestSuite();
    }
  } catch {
    // ignore
  }
  process.on("SIGTERM", () => {
    console.log("\n👋 Test suite terminated");
    unmount();
    process.exit(0);
  });
}
