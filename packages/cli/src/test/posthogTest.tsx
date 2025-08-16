import process from "node:process";
import { useState } from "react";
import { Box, Text, useInput } from "ink";
import {
  AuthenticationError,
  captureException,
  DevSpaceError,
} from "../utils/errors.ts";
import { getPostHog } from "../utils/utils.ts";

interface TestResult {
  test: string;
  status: "pending" | "success" | "error";
  message: string;
}

export function PostHogTest() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);

  const tests = [
    {
      name: "PostHog Client Initialization",
      test: async () => {
        const posthog = await getPostHog();
        if (!posthog) {
          throw new Error(
            "PostHog not initialized (API key missing or DO_NOT_TRACK=1)",
          );
        }
        return "PostHog client successfully initialized";
      },
    },
    {
      name: "Basic Error Capture",
      test: async () => {
        const testError = new Error("Basic test error for PostHog");
        await captureException(testError, {
          component: "PostHogTest",
          action: "basicErrorTest",
          testData: "basic-test",
        });
        return "Basic error captured successfully";
      },
    },
    {
      name: "DevSpace Error Capture",
      test: async () => {
        const devSpaceError = new DevSpaceError(
          "Test DevSpace error",
          "test-devspace-123",
          "https://test-landscape.com",
        );
        await captureException(devSpaceError, {
          component: "PostHogTest",
          action: "devSpaceErrorTest",
          devSpaceName: "test-devspace",
          step: "CREATE",
        });
        return "DevSpace error captured with context";
      },
    },
    {
      name: "Authentication Error Capture",
      test: async () => {
        const authError = new AuthenticationError(
          "Test authentication failure",
          "https://test-landscape.com",
        );
        await captureException(authError, {
          component: "PostHogTest",
          action: "authErrorTest",
          landscapeURL: "https://test-landscape.com",
          userId: "test-user-123",
        });
        return "Authentication error captured with context";
      },
    },
    {
      name: "Error with Rich Context",
      test: async () => {
        const contextError = new Error("Error with rich context data");
        await captureException(contextError, {
          component: "PostHogTest",
          action: "richContextTest",
          landscapeURL: "https://test-landscape.com",
          devSpaceId: "test-devspace-456",
          devSpaceName: "my-test-devspace",
          currentStep: "EXTENSIONS",
          selectedPack: "Full Stack",
          extensionCount: 5,
          userAgent: "sap-devspace-cli/test",
          metadata: {
            testRun: true,
            timestamp: new Date().toISOString(),
            platform: process.platform,
            nodeVersion: process.version,
          },
        });
        return "Rich context error captured successfully";
      },
    },
    {
      name: "PostHog Event Flush",
      test: async () => {
        const posthog = await getPostHog();
        if (posthog) {
          await posthog.flush();
          return "PostHog events flushed successfully";
        }
        return "PostHog not available - flush skipped";
      },
    },
  ];

  useInput((input) => {
    if (input === "r" && !isRunning) {
      runTests();
    } else if (input === "q") {
      process.exit(0);
    } else if (input === "c") {
      setResults([]);
      setCurrentTest(0);
    }
  });

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);
    setCurrentTest(0);

    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i);
      const test = tests[i];

      // Add pending result
      setResults((prev) => [...prev, {
        test: test.name,
        status: "pending",
        message: "Running...",
      }]);

      try {
        const message = await test.test();
        setResults((prev) =>
          prev.map((result, index) =>
            index === i ? { ...result, status: "success", message } : result
          )
        );
      } catch (error) {
        const errorMessage = error instanceof Error
          ? error.message
          : String(error);
        setResults((prev) =>
          prev.map((result, index) =>
            index === i
              ? { ...result, status: "error", message: errorMessage }
              : result
          )
        );
      }

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsRunning(false);
    setCurrentTest(-1);
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
    }
  };

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "success":
        return "green";
      case "error":
        return "red";
    }
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">PostHog Integration Test Suite</Text>
      <Text>---</Text>

      {!isRunning && results.length === 0 && (
        <Box flexDirection="column">
          <Text>
            This test suite will verify your PostHog error tracking integration.
          </Text>
          <Text dimColor>
            Make sure POSTHOG_API_KEY is set and DO_NOT_TRACK is not 1
          </Text>
          <Text>---</Text>
          <Text>Press 'r' to run tests, 'q' to quit</Text>
        </Box>
      )}

      {isRunning && (
        <Box flexDirection="column">
          <Text color="yellow">
            Running tests... ({currentTest + 1}/{tests.length})
          </Text>
          <Text dimColor>Current: {tests[currentTest]?.name}</Text>
        </Box>
      )}

      {results.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text bold>Test Results:</Text>
          {results.map((result, index) => (
            <Box key={index} flexDirection="column" marginLeft={2}>
              <Text color={getStatusColor(result.status)}>
                {getStatusIcon(result.status)} {result.test}
              </Text>
              <Text dimColor>{result.message}</Text>
            </Box>
          ))}
        </Box>
      )}

      {!isRunning && results.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text>---</Text>
          <Text>Press 'r' to run again, 'c' to clear results, 'q' to quit</Text>

          {results.some((r) =>
            r.status === "success"
          ) && (
            <Box flexDirection="column" marginTop={1}>
              <Text color="green" bold>✅ PostHog Integration Working!</Text>
              <Text dimColor>
                Check your PostHog dashboard for the test events
              </Text>
            </Box>
          )}

          {results.some((r) => r.status === "error") && (
            <Box flexDirection="column" marginTop={1}>
              <Text color="red" bold>⚠️ Some tests failed</Text>
              <Text dimColor>
                Check the error messages above for troubleshooting
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default PostHogTest;
