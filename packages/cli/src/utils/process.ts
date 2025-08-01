import process from "node:process";

/**
 * Ignore unhandled ECCONRESET errors
 * thrown by WebSocket/SSH streams on Windows
 */
process.on("uncaughtException", (error: any) => {
  if (error && error.code === "ECONNRESET") {
    // ignore socket reset on Windows
    return;
  }
  // re-throw anything else
  throw error;
});
