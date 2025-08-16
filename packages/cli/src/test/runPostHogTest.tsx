import { render } from "ink";
import process from "node:process";
import PostHogTest from "./posthogTest.tsx";

export function runPostHogTest() {
  console.log("Starting PostHog Integration Tests...");
  console.log("This will test your PostHog error tracking integration");
  console.log("Make sure POSTHOG_API_KEY is set in your environment");
  console.log("---");

  const { unmount, waitUntilExit } = render(<PostHogTest />);

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

  return waitUntilExit();
}
// Run directly if this file is executed
if (import.meta.main) {
  runPostHogTest();
}
