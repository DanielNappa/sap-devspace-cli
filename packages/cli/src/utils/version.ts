/*
 * Adopted from https://github.com/openai/codex/blob/main/codex-cli/src/utils/check-updates.ts
 * and https://github.com/openai/codex/blob/main/codex-cli/src/utils/package-manager-detector.ts
 */
import { strict as assert } from "node:assert";
import type { AgentName } from "package-manager-detector";
import chalk from "chalk";
import { getLatestVersion } from "fast-npm-meta";
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import process from "node:process";
import { getUserAgent } from "package-manager-detector";
import which from "which";
import semver from "semver";
import { CheckState } from "./types.ts";
// Read the version directly from package.json.
import pkg from "../../package.json" with { type: "json" };

type UpdateCheckState = CheckState<"Update">;

interface UpdateCheckInfo {
  currentVersion: string;
  latestVersion: string;
}

export interface UpdateOptions {
  manager: AgentName;
  packageName: string;
}

export const CLI_VERSION: string = (pkg as { version: string }).version;

const UPDATE_CHECK_FREQUENCY: number = 1000 * 60 * 60 * 24; // 1 day

function isInstalled(manager: AgentName): boolean {
  try {
    which.sync(manager);
    return true;
  } catch {
    return false;
  }
}

function getGlobalBinDir(manager: AgentName): string | undefined {
  if (!isInstalled(manager)) {
    return;
  }

  try {
    switch (manager) {
      case "npm": {
        const stdout = execFileSync("npm", ["prefix", "-g"], {
          encoding: "utf-8",
        });
        return join(stdout.trim(), "bin");
      }

      case "pnpm": {
        // pnpm bin -g prints the bin dir
        const stdout = execFileSync("pnpm", ["bin", "-g"], {
          encoding: "utf-8",
        });
        return stdout.trim();
      }

      case "bun": {
        // bun pm bin -g prints your bun global bin folder
        const stdout = execFileSync("bun", ["pm", "bin", "-g"], {
          encoding: "utf-8",
        });
        return stdout.trim();
      }

      default:
        return undefined;
    }
  } catch {
    // ignore
  }

  return undefined;
}

export function detectInstallerByPath(): AgentName | undefined {
  // e.g. /usr/local/bin/codex
  const invoked = process.argv[1] && resolve(process.argv[1]);
  if (!invoked) {
    return;
  }

  const supportedManagers: Array<AgentName> = ["npm", "pnpm", "bun"];

  for (const mgr of supportedManagers) {
    const binDir = getGlobalBinDir(mgr);
    if (binDir && invoked.startsWith(binDir)) {
      return mgr;
    }
  }

  return undefined;
}

export function renderUpdateCommand({
  manager,
  packageName,
}: UpdateOptions): string {
  const updateCommands: Record<AgentName, string> = {
    npm: `npm install -g ${packageName}`,
    pnpm: `pnpm add -g ${packageName}`,
    bun: `bun add -g ${packageName}`,
    /** Only works in yarn@v1 */
    yarn: `yarn global add ${packageName}`,
    deno: `deno install -g npm:${packageName}`,
  };

  return updateCommands[manager];
}

function renderUpdateMessage(options: UpdateOptions) {
  const updateCommand = renderUpdateCommand(options);
  return `To update, run ${chalk.magenta(updateCommand)} to update.`;
}

async function writeState(stateFilePath: string, state: UpdateCheckState) {
  await writeFile(stateFilePath, JSON.stringify(state, null, 2), {
    encoding: "utf8",
  });
}

async function getUpdateCheckInfo(
  packageName: string,
): Promise<UpdateCheckInfo | undefined> {
  const metadata = await getLatestVersion(packageName, {
    force: true,
    throw: false,
  });

  if ("error" in metadata || !metadata?.version) {
    return;
  }

  return {
    currentVersion: CLI_VERSION,
    latestVersion: metadata.version,
  };
}

export async function checkForUpdates(): Promise<string | undefined> {
  const { USER_DATA_FOLDER } = await import("./consts.ts");
  const stateFile: string = join(USER_DATA_FOLDER, "update-check.json");

  // Load previous check timestamp
  let state: UpdateCheckState | undefined;
  try {
    state = JSON.parse(await readFile(stateFile, "utf8"));
  } catch {
    // ignore
  }

  // Bail out if we checked less than the configured frequency ago
  if (
    state?.lastUpdateCheck &&
    Date.now() - new Date(state.lastUpdateCheck).valueOf() <
      UPDATE_CHECK_FREQUENCY
  ) {
    return;
  }

  // Fetch current vs latest from the registry
  const packageName: string = pkg.name;
  assert(packageName != null);
  const packageInfo = await getUpdateCheckInfo(packageName);

  await writeState(stateFile, {
    ...state,
    lastUpdateCheck: new Date().toUTCString(),
  });
  if (
    !packageInfo ||
    !semver.gt(packageInfo.latestVersion, packageInfo.currentVersion)
  ) {
    return;
  }

  // Detect global installer
  let managerName = detectInstallerByPath();

  // Fallback to the local package manager
  if (!managerName) {
    const local: AgentName | null = getUserAgent();
    if (!local) {
      // No package managers found, skip it.
      return;
    }
    managerName = local;
  }

  const updateMessage = renderUpdateMessage({
    manager: managerName,
    packageName,
  });

  const message: string = `\
Update available! ${chalk.red(packageInfo.currentVersion)} → ${
    chalk.green(
      packageInfo.latestVersion,
    )
  }.
${updateMessage}`;

  return message;
}
