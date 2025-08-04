#!/usr/bin/env -S deno run -A  --

/**
 * Each time Deno starts or restarts this file (on initial run +
 * whenever a *.ts(x) changes), we:
 *   1) run `deno run -A scripts/build.mts`
 *   2) run `node bin/index.js […whatever flags passed]`
 *
 * Any flags you pass into this script become `Deno.args` and get
 * forwarded into your real CLI below.
 */
import { dirname, fromFileUrl, join } from "jsr:@std/path";
const __dirname: string = dirname(dirname(fromFileUrl(import.meta.url)));
const __cliDirectory: string = join(__dirname, "packages", "cli");
const entryPoint: string = join(__cliDirectory, "dist", "bin", "index.js");

const run = async (cmd: string[]): Promise<void> => {
  const [command, ...args] = cmd;
  const proc = new Deno.Command(command, {
    args,
    cwd: __dirname,
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code } = await proc.output();
  if (code !== 0) {
    console.error(`Command failed with exit code ${code}`);
    // Don't exit on build failures, just continue watching
  }
};

const buildAndRun = async (): Promise<void> => {
  await run(["deno", "run", "-A", "scripts/build.mts"]);
  await run([entryPoint, ...Deno.args]);
};

// Initial build and run
await buildAndRun();

// Watch for changes
const watchPath: string = join(__cliDirectory, "src");

const watcher = Deno.watchFs(watchPath);

for await (const event of watcher) {
  // Only rebuild on modify/create events for TypeScript files
  if (event.kind === "modify" || event.kind === "create") {
    const hasTypeScriptFiles = event.paths.some((path: string) =>
      path.endsWith(".ts") || path.endsWith(".tsx")
    );

    if (hasTypeScriptFiles) {
      await buildAndRun();
    }
  }
}
