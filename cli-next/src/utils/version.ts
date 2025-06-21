import pkg from "../../../package.json" with { type: "json" };

// Read the version directly from package.json.
export const CLI_VERSION: string = (pkg as { version: string }).version;
