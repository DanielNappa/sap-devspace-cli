import React, { Component, type ReactNode } from "react";
import { useInput } from "ink";
import { captureException } from "@/utils/errors.ts";
import { ErrorBoundaryFallback } from "./ErrorDisplay.tsx";

interface Props {
  children: ReactNode;
  fallback?: (
    error: Error,
    retry: () => void,
    verbose: boolean,
    toggleVerbose: () => void,
  ) => ReactNode;
  context?: Record<string, unknown>;
  defaultVerbose?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  verbose: boolean;
}

/**
 * - Truncated error display by default
 * - Verbose mode toggle with 'v' key
 * - Smart error formatting
 * - Retry functionality with 'r' key
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      verbose: props.defaultVerbose || false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Capture the error with context (full stack trace goes to logging)
    captureException(error, {
      component: "ErrorBoundary",
      errorInfo: errorInfo.componentStack,
      ...this.props.context,
    });
  }

  retry = (): void => {
    this.setState({ hasError: false, error: null, verbose: false });
  };

  toggleVerbose = (): void => {
    this.setState((prevState) => ({ verbose: !prevState.verbose }));
  };

  override render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.retry,
          this.state.verbose,
          this.toggleVerbose,
        );
      }

      // Default fallback
      return (
        <ErrorBoundaryFallbackWithInput
          error={this.state.error}
          retry={this.retry}
          verbose={this.state.verbose}
          toggleVerbose={this.toggleVerbose}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Fallback component with input handling
 * Separated to use hooks while keeping the main boundary as a class component
 */
function ErrorBoundaryFallbackWithInput({
  error,
  retry,
  verbose,
  toggleVerbose,
}: {
  error: Error;
  retry: () => void;
  verbose: boolean;
  toggleVerbose: () => void;
}): ReactNode {
  useInput((input, _key) => {
    if (input === "r" || input === "R") {
      retry();
    } else if (input === "v" || input === "V") {
      toggleVerbose();
    }
    // Note: 'esc' handling should be done by parent components
  });

  return (
    <ErrorBoundaryFallback
      error={error}
      retry={retry}
      verbose={verbose}
    />
  );
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  context?: Record<string, unknown>,
  defaultVerbose?: boolean,
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary context={context} defaultVerbose={defaultVerbose}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
