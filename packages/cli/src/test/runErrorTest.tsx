import { runErrorTest } from "./ErrorTest.tsx";

export function runErrorTestCLI() {
  console.log("Starting Error Display Tests...");
  console.log("• Truncated error display by default (10 lines max)");
  console.log("• Verbose mode toggle with 'v' key");
  console.log("• Smart middle truncation for very long errors");
  console.log("• Clean error messages without stack traces by default");
  console.log("• Full stack traces available in verbose mode");
  console.log("---");

  runErrorTest();
}

// Run if this file is executed directly
if (import.meta.main) {
  runErrorTestCLI();
}
