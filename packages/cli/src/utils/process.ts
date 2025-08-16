import process from "node:process";
import chalk from "chalk";
import { PostHog } from "posthog-node";
import { captureException } from "./errors.ts";
import { getPostHog } from "./utils.ts";

/**
 * Ignore unhandled ECCONRESET errors
 * thrown by WebSocket/SSH streams on Windows
 */
process.on("uncaughtException", (error: unknown) => {
  if (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ECONNRESET"
  ) {
    // ignore socket reset on Windows
    return;
  }
  // re-throw anything else
  throw error;
});

// Global error handlers
process.on("uncaughtException", async (error: unknown) => {
  // Ignore socket reset on Windows (preserves existing behavior)
  if (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ECONNRESET"
  ) {
    return;
  }

  try {
    const err = error instanceof Error
      ? error
      : new Error(typeof error === "string" ? error : JSON.stringify(error));
    await captureException(err, {
      component: "global",
      action: "uncaughtException",
    });
    // Ensure PostHog events are sent before exiting
    const posthog = await getPostHog();
    if (posthog) {
      await Promise.race([
        posthog.flush(),
        new Promise((resolve) => setTimeout(resolve, 2000)), // 2s timeout
      ]);
    }
  } catch (flushError) {
    console.error(chalk.red("[ERROR FLUSH FAILED]"), flushError);
  }

  console.error(chalk.red("Uncaught Exception:"), error);
  process.exit(1);
});

process.on(
  "unhandledRejection",
  async (reason: unknown, promise: Promise<unknown>) => {
    try {
      await captureException(reason, {
        component: "global",
        action: "unhandledRejection",
        promise: String(promise),
      });

      // For unhandled rejections, we might want to flush but not exit
      const posthog = await getPostHog() as PostHog;
      if (posthog) {
        await Promise.race([
          posthog.flush(),
          new Promise((resolve) => setTimeout(resolve, 1000)), // 1s timeout
        ]);
      }
    } catch (flushError) {
      console.error(chalk.red("[ERROR FLUSH FAILED]"), flushError);
    }

    console.error(
      chalk.red("Unhandled Rejection at:"),
      promise,
      "reason:",
      reason,
    );
  },
);
