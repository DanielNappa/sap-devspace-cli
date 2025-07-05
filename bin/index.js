#!/usr/bin/env -S node --no-warnings --enable-source-maps
/*
 * Adapted from https://github.com/openai/codex/blob/main/codex-cli/bin/codex.js
 */
// Unified entry point for SAP Dev Space CLI.

import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to the compiled CLI bundle
const cliPath = path.resolve(__dirname, "../dist/index.js");
const cliUrl = pathToFileURL(cliPath).href;

// Load and execute the CLI
(async () => {
  try {
    await import(cliUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
})();
