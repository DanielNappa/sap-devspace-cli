import { useCallback } from "react";
import { captureException } from "@/utils/errors.ts";

interface UseErrorHandlerOptions {
  component: string;
  context?: Record<string, unknown>;
}

const REDACT_KEY_REGEX =
  /password|secret|token|api[-_]?key|authorization|auth|access[_-]?token|refresh[_-]?token/i;
const MAX_ITEMS = 5;
const MAX_STRING_LEN = 200;

function truncate(str: string, max = MAX_STRING_LEN): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

function safeJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(
      value,
      (key, val) => {
        if (REDACT_KEY_REGEX.test(key)) return "[REDACTED]";
        if (typeof val === "string" && val.length > 64) {
          return "[REDACTED_STRING]";
        }
        return val;
      },
    );
  } catch {
    return "[Unserializable]";
  }
}

export function safeSerializeArgs(args: unknown[]): string[] {
  return args.slice(0, MAX_ITEMS).map((arg) => {
    if (
      arg == null || typeof arg === "number" || typeof arg === "boolean" ||
      typeof arg === "bigint" || typeof arg === "symbol"
    ) {
      return String(arg);
    }
    if (typeof arg === "string") {
      return truncate(arg);
    }
    if (Array.isArray(arg) || (typeof arg === "object")) {
      return truncate(safeJsonStringify(arg));
    }
    return "[Unknown]";
  });
}

export function useErrorHandler(
  { component, context = {} }: UseErrorHandlerOptions,
) {
  const handleError = useCallback((
    error: unknown,
    action?: string,
    additionalContext?: Record<string, unknown>,
  ) => {
    captureException(error, {
      component,
      action,
      ...context,
      ...additionalContext,
    });
  }, [component, context]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    action?: string,
    additionalContext?: Record<string, unknown>,
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, action, additionalContext);
      return null;
    }
  }, [handleError]);

  const wrapAsync = useCallback(<T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    action?: string,
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error, action, { args: safeSerializeArgs(args) });
        return null;
      }
    };
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
    wrapAsync,
  };
}
