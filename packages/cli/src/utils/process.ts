import process from "node:process";

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
