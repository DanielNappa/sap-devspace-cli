#!/usr/bin/env -S node --no-warnings --use-system-ca --enable-source-maps
import { render } from "ink";
import App from "../App.tsx";
import process from "node:process";

export function runErrorBoundaryQuickTest() {
  console.log("Testing Error Boundary in App.tsx...");
  console.log("Instructions:");
  console.log(
    "1. Press 'E' to trigger a sync error (should be caught by ErrorBoundary)",
  );
  console.log(
    "2. Press 'A' to trigger an async error (will appear in console)",
  );
  console.log("3. Press 'r' to retry after an error");
  console.log("4. Press Ctrl+C to exit");
  console.log("---");

  // Set development mode to enable error testing
  process.env.NODE_ENV = "development";

  const { unmount } = render(<App />);

  // Handle cleanup
  process.on("SIGINT", () => {
    unmount();
    process.exit(0);
  });
}

// Run if this file is executed directly
if (import.meta.main) {
  runErrorBoundaryQuickTest();
}
