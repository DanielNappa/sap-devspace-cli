import React from "react";
import { Box, Text } from "ink";

const MAX_RENDERED_LINES = 10;
const MAX_OUTPUT_LENGTH = 10000;

interface ErrorDisplayProps {
  error: Error;
  verbose?: boolean;
  showType?: boolean;
  context?: string;
}

/**
 * Truncates error content
 * - Shows first 10 lines by default
 * - Shows truncation indicator if more lines exist
 * - In verbose mode, shows full content
 */
function renderTruncatedError(content: string, verbose: boolean): {
  displayContent: string;
  truncatedLines: number;
} {
  const lines = content.split("\n");

  if (verbose || lines.length <= MAX_RENDERED_LINES) {
    return {
      displayContent: content,
      truncatedLines: 0,
    };
  }

  const truncatedLines = lines.length - MAX_RENDERED_LINES;
  const displayContent = lines.slice(0, MAX_RENDERED_LINES).join("\n");

  return {
    displayContent,
    truncatedLines,
  };
}

/**
 * Formats error content with middle truncation for very long content
 */
function formatLongError(content: string): string {
  if (content.length <= MAX_OUTPUT_LENGTH) {
    return content;
  }

  const halfLength = MAX_OUTPUT_LENGTH / 2;
  const start = content.slice(0, halfLength);
  const end = content.slice(-halfLength);
  const truncatedChars = content.length - MAX_OUTPUT_LENGTH;

  return `${start}\n\n... [${truncatedChars} characters truncated] ...\n\n${end}`;
}

/**
 * Extracts clean error message without stack trace for display
 */
function getDisplayMessage(error: Error): string {
  // For display, we only want the message, not the stack trace
  return error.message || "An error occurred";
}

/**
 * Gets the full error content including stack trace for verbose mode
 */
function getFullErrorContent(error: Error): string {
  const parts: string[] = [];

  // Add error message
  if (error.message) {
    parts.push(`Error: ${error.message}`);
  }

  // Add stack trace if available
  if (error.stack) {
    // Remove the first line if it's just the error message repeated
    const stackLines = error.stack.split("\n");
    const stackWithoutMessage = stackLines.slice(1).join("\n");
    if (stackWithoutMessage.trim()) {
      parts.push(stackWithoutMessage);
    }
  }

  return parts.join("\n");
}

export function ErrorDisplay({
  error,
  verbose = false,
  showType = false,
  context,
}: ErrorDisplayProps): React.ReactNode {
  // Get the appropriate content based on verbose mode
  const errorContent = verbose
    ? formatLongError(getFullErrorContent(error))
    : getDisplayMessage(error);

  const { displayContent, truncatedLines } = renderTruncatedError(
    errorContent,
    verbose,
  );

  return (
    <Box flexDirection="column">
      {context && <Text color="red" bold>{context}</Text>}

      {showType && <Text color="red">Type: {error.constructor.name}</Text>}

      <Text color="red">{displayContent}</Text>

      {truncatedLines > 0 && <Text dimColor>... (+{truncatedLines} lines)
      </Text>}

      {!verbose && truncatedLines > 0 && (
        <Text dimColor>v for verbose output</Text>
      )}
    </Box>
  );
}

/**
 * Error boundary fallback
 */
interface ErrorBoundaryFallbackProps {
  error: Error;
  retry: () => void;
  verbose?: boolean;
  context?: string;
}

export function ErrorBoundaryFallback({
  error,
  retry: _retry,
  verbose = false,
  context = "Something went wrong",
}: ErrorBoundaryFallbackProps): React.ReactNode {
  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="single"
      borderColor="red"
    >
      <ErrorDisplay
        error={error}
        verbose={verbose}
        showType={verbose}
        context={context}
      />

      <Box marginTop={1}>
        <Text dimColor>
          r to retry • v to toggle verbose • esc to go back
        </Text>
      </Box>
    </Box>
  );
}

/**
 * Utility function to format errors for logging (includes full stack trace)
 */
export function formatErrorForLogging(error: unknown): string {
  if (!(error instanceof Error)) {
    return String(error);
  }

  const parts = [error.message];

  // Add additional error properties if they exist
  if ("stderr" in error && typeof error.stderr === "string") {
    parts.push(error.stderr);
  }
  if ("stdout" in error && typeof error.stdout === "string") {
    parts.push(error.stdout);
  }

  const fullMessage = parts.filter(Boolean).join("\n");

  // Apply middle truncation for very long error messages
  return formatLongError(fullMessage);
}
