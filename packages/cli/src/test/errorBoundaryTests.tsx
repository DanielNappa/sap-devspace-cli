import process from "node:process";
import { fileURLToPath } from "node:url";
import { render } from "ink";
import { ErrorBoundaryTest } from "@/components/UI/__tests__/ErrorBoundaryTest.tsx";

export function runErrorBoundaryTests() {
  console.log("Starting Error Boundary Tests...");
  console.log("This will test React Error Boundaries in your CLI");
  console.log("---");

  const { unmount } = render(<ErrorBoundaryTest />);

  // Handle cleanup on exit
  process.on("SIGINT", () => {
    console.log("\n👋 Test interrupted by user");
    unmount();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("\n👋 Test terminated");
    unmount();
    process.exit(0);
  });
}

// Run directly if this file is executed
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  runErrorBoundaryTests();
}
