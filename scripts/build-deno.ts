#!/usr/bin/env -S deno run -A

/**
 * Each time Deno starts or restarts this file (on initial run +
 * whenever a *.ts(x) changes), we:
 *   1) run `deno run -A scripts/build.mts`
 *   2) compile and run the Deno executable with […whatever flags passed]
 *
 * Any flags you pass into this script become `Deno.args` and get
 * forwarded into your real CLI below.
 */
import { debounce } from "jsr:@std/async/debounce";
import { dirname, fromFileUrl, join } from "jsr:@std/path";
const __dirname: string = dirname(dirname(fromFileUrl(import.meta.url)));
const __cliDirectory: string = join(__dirname, "packages", "cli");
const __denoJSON: string = join(__cliDirectory, "deno.json");

const __entryPoint: string = join(
  __cliDirectory,
  "dist",
  "bin",
  "index.js",
);
const executable: string = join(
  __cliDirectory,
  "dist",
  "bin",
  `ds-${Deno.build.target}`,
);

function run(cmd: string[]): Deno.ChildProcess {
  const [command, ...args] = cmd;
  const process = new Deno.Command(command, {
    args,
    cwd: __dirname,
    stdout: "inherit",
    stderr: "inherit",
  }).spawn();
  return process;
}

const buildAndRun = async (): Promise<Deno.ChildProcess> => {
  const buildProcess: Deno.ChildProcess = run([
    "deno",
    "run",
    "-A",
    "scripts/build.mts",
  ]);

  const buildProcessStatus = await buildProcess.status;
  if (!buildProcessStatus.success) {
    console.error(
      `Build failed (exit ${buildProcessStatus.code}). Not launching.`,
    );
    throw new Error("Build failed");
  }

  const compileProcess: Deno.ChildProcess = run([
    "deno",
    "compile",
    "--config",
    __denoJSON,
    "--exclude",
    "package.json",
    "--exclude",
    "node_modules/",
    "--exclude",
    "packages/cli/dist/",
    "--exclude",
    "packages/cli/src/",
    "--exclude",
    "packages/cli/node_modules/",
    "--exclude",
    "packages/cli/package.json",
    "--exclude",
    "packages/cli/package-lock.json",
    "--exclude",
    "packages/cli/bun.lock",
    "--exclude",
    "packages/cli/deno.json",
    "--exclude",
    "packages/cli/tsconfig.json",
    "--output",
    executable,
    "--allow-env",
    "--allow-ffi",
    "--allow-net",
    "--allow-read",
    "--allow-run",
    "--allow-sys",
    "--allow-write",
    "--target",
    Deno.build.target,
    __entryPoint,
  ]);

  const compileProcessStatus = await compileProcess.status;
  if (!compileProcessStatus.success) {
    console.error(
      `Compile failed (exit ${compileProcessStatus.code}). Not launching.`,
    );
    throw new Error("Compile failed");
  }
  return run([executable, ...Deno.args]);
};

let rebuildInProgress = false;
const debouncedRebuild = debounce(async () => {
  if (rebuildInProgress) return;
  rebuildInProgress = true;
  try {
    const oldBuild = currentBuild;
    if (oldBuild) {
      try {
        oldBuild.kill();
        await oldBuild.status; // Wait for process to actually exit
      } catch (_) {
        // process may have already exited
      }
    }
    currentBuild = await buildAndRun();
  } finally {
    rebuildInProgress = false;
  }
}, 300);

// Initial build and run
let currentBuild: Deno.ChildProcess = await buildAndRun();

// Watch for changes
const watchPath: string = join(__cliDirectory, "src");

const log = debounce((event: Deno.FsEvent) => {
  console.log("[%s] %s", event.kind, event.paths[0]);
}, 200);

const watcher = Deno.watchFs(watchPath);

try {
  for await (const event of watcher) {
    log(event);
    // Only rebuild on modify/create events for TypeScript files
    if (event.kind === "modify" || event.kind === "create") {
      const hasTypeScriptFiles = event.paths.some((path: string) =>
        path.endsWith(".ts") || path.endsWith(".tsx")
      );

      if (hasTypeScriptFiles) {
        debouncedRebuild();
      }
    }
  }
} catch (error) {
  console.error("File watcher error:", error);
  // Optionally restart the watcher or exit
  Deno.exit(1);
}
