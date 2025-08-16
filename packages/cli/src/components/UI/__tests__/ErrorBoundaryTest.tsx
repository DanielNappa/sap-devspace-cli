import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import process from "node:process";
import { ErrorBoundary } from "../ErrorBoundary.tsx";

// Component that throws an error on command
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error for ErrorBoundary testing");
  }
  return <Text>Component is working normally</Text>;
}

// Component that throws async errors
function AsyncErrorComponent({ shouldThrow }: { shouldThrow: boolean }) {
  React.useEffect(() => {
    if (shouldThrow) {
      // This will trigger unhandledRejection
      Promise.reject(new Error("Async test error"));
    }
  }, [shouldThrow]);

  return <Text>Async component loaded</Text>;
}

// Component that throws errors in useEffect
function UseEffectErrorComponent({ shouldThrow }: { shouldThrow: boolean }) {
  React.useEffect(() => {
    if (shouldThrow) {
      throw new Error("Error thrown in useEffect");
    }
  }, [shouldThrow]);

  return <Text>UseEffect component loaded</Text>;
}

// Component that throws errors on user interaction
function InteractiveErrorComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  useInput((input) => {
    if (input === "x") {
      setShouldThrow(true);
    }
  });

  if (shouldThrow) {
    throw new Error("Error thrown on user interaction");
  }

  return (
    <Box flexDirection="column">
      <Text>Interactive Error Component</Text>
      <Text dimColor>Press 'x' to throw an error</Text>
    </Box>
  );
}

// Test harness component
export function ErrorBoundaryTest() {
  const [throwSync, setThrowSync] = useState(false);
  const [throwAsync, setThrowAsync] = useState(false);
  const [throwUseEffect, setThrowUseEffect] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);

  useInput((input) => {
    switch (input) {
      case "1":
        setThrowSync(true);
        break;
      case "2":
        setThrowAsync(true);
        break;
      case "3":
        setThrowUseEffect(true);
        break;
      case "4":
        setShowInteractive(true);
        break;
      case "r":
        setThrowSync(false);
        setThrowAsync(false);
        setThrowUseEffect(false);
        setShowInteractive(false);
        break;
      case "q":
        process.exit(0);
        break;
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold>Error Boundary Test Suite</Text>
      <Text>
        Press '1' for sync error, '2' for async error, '3' for useEffect error
      </Text>
      <Text>Press '4' for interactive error, 'r' to reset, 'q' to quit</Text>
      <Text>---</Text>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>1. Synchronous Error Test:</Text>
        <ErrorBoundary
          context={{ component: "ErrorBoundaryTest", testType: "sync" }}
          fallback={(error, _retry) => (
            <Box flexDirection="column">
              <Text color="red">✅ Sync Error Caught: {error.message}</Text>
              <Text dimColor>Press 'r' to retry</Text>
            </Box>
          )}
        >
          <ErrorThrowingComponent shouldThrow={throwSync} />
        </ErrorBoundary>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>2. Async Error Test:</Text>
        <ErrorBoundary
          context={{ component: "ErrorBoundaryTest", testType: "async" }}
          fallback={(error, _retry) => (
            <Box flexDirection="column">
              <Text color="red">✅ Async Error Caught: {error.message}</Text>
              <Text dimColor>Press 'r' to retry</Text>
            </Box>
          )}
        >
          <AsyncErrorComponent shouldThrow={throwAsync} />
        </ErrorBoundary>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold>3. UseEffect Error Test:</Text>
        <ErrorBoundary
          context={{ component: "ErrorBoundaryTest", testType: "useEffect" }}
          fallback={(error, _retry) => (
            <Box flexDirection="column">
              <Text color="red">
                ✅ UseEffect Error Caught: {error.message}
              </Text>
              <Text dimColor>Press 'r' to retry</Text>
            </Box>
          )}
        >
          <UseEffectErrorComponent shouldThrow={throwUseEffect} />
        </ErrorBoundary>
      </Box>

      {showInteractive && (
        <Box flexDirection="column" marginTop={1}>
          <Text bold>4. Interactive Error Test:</Text>
          <ErrorBoundary
            context={{
              component: "ErrorBoundaryTest",
              testType: "interactive",
            }}
            fallback={(error, _retry) => (
              <Box flexDirection="column">
                <Text color="red">
                  ✅ Interactive Error Caught: {error.message}
                </Text>
                <Text dimColor>Press 'r' to retry</Text>
              </Box>
            )}
          >
            <InteractiveErrorComponent />
          </ErrorBoundary>
        </Box>
      )}
    </Box>
  );
}
