import process from "node:process";
import { getPostHog } from "./utils.ts";
import { getULID } from "./utils.ts";

interface ErrorContext {
  component?: string;
  action?: string;
  userID?: string;
  sessionID?: string;
  landscapeURL?: string;
  devSpaceID?: string;
  [key: string]: unknown;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private sessionID: string;

  private constructor() {
    this.sessionID = crypto.randomUUID();
  }

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  // Add inside class ErrorLogger
  private truncateAndSanitizeStack(stack?: string | null): string | undefined {
    if (!stack) return undefined;
    const truncated = stack.split("\n").slice(0, 20).join("\n"); // limit size
    // Minimal redaction: collapse home directory paths to "~"
    const home = process.env.HOME || process.env.USERPROFILE;
    return home ? truncated.split(home).join("~") : truncated;
  }

  private sanitizeContext(context: ErrorContext = {}): Record<string, unknown> {
    const redactedKeys =
      /token|secret|password|authorization|cookie|apikey|api_key/i;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(context)) {
      if (redactedKeys.test(k)) {
        out[k] = "[REDACTED]";
        continue;
      }
      if (
        typeof v === "function" || typeof v === "symbol" ||
        typeof v === "undefined"
      ) continue;
      if (typeof v === "string") {
        // Redact obvious absolute paths
        out[k] = v.replaceAll("\\", "/").replace(
          /\/(?:Users|home)\/[^/]/g,
          "/[REDACTED]",
        );
      } else {
        out[k] = v;
      }
    }
    return out;
  }
  async captureException(
    error: unknown,
    context: ErrorContext = {},
  ): Promise<void> {
    try {
      const posthog = await getPostHog();
      if (!posthog) return;

      const userULID = await getULID();
      const errorInfo = this.extractErrorInfo(error);

      posthog.capture({
        distinctId: userULID,
        event: "exception_occurred",
        timestamp: new Date(),
        properties: {
          error: {
            message: errorInfo.message,
            name: errorInfo.name,
            stack: this.truncateAndSanitizeStack(errorInfo.stack),
          },
          context: this.sanitizeContext(context),
          sessionId: this.sessionID,
          platform: process.platform,
          nodeVersion: process.version,
        },
      });

      // Also log locally for debugging
      console.error("[ERROR]", errorInfo.message, context);
    } catch (captureError) {
      // Never let error capture itself throw
      console.error("[ERROR CAPTURE FAILED]", captureError);
    }
  }

  private extractErrorInfo(error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    }
    return {
      message: String(error),
      stack: null,
      name: "UnknownError",
    };
  }
}

export const errorLogger = ErrorLogger.getInstance();

// Convenience function for easy imports
export function captureException(
  error: unknown,
  context?: ErrorContext,
): Promise<void> {
  return errorLogger.captureException(error, context);
}

// Custom error classes for better categorization
export class DevSpaceError extends Error {
  constructor(
    message: string,
    public devSpaceID?: string,
    public landscapeURL?: string,
  ) {
    super(message);
    this.name = "DevSpaceError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string, public landscapeURL?: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class NetworkError extends Error {
  constructor(message: string, public url?: string) {
    super(message);
    this.name = "NetworkError";
  }
}
