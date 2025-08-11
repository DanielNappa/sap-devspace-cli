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
import { debounce } from "jsr:@std/async/debounce";
import { dirname, fromFileUrl, join } from "jsr:@std/path";
const __dirname: string = dirname(dirname(fromFileUrl(import.meta.url)));
const __cliDirectory: string = join(__dirname, "packages", "cli");
const __denoJSON: string = join(__cliDirectory, "deno.json");
const index: string = join(
  __cliDirectory,
  "src",
  "index.tsx",
);
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
  // const buildProcess: Deno.ChildProcess = run([
  //   "deno",
  //   "run",
  //   "-A",
  //   "scripts/build.mts",
  // ]);

  // const buildProcessStatus = await buildProcess.status;
  // if (!buildProcessStatus.success) {
  //   console.error(
  //     `Build failed (exit ${buildProcessStatus.code}). Not launching.`,
  //   );
  //   throw new Error("Build failed");
  // }

  const compileProcess: Deno.ChildProcess = run([
    "deno",
    "compile",
    "--config",
    __denoJSON,
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
    index,
  ]);

  const compileProcessStatus = await compileProcess.status;
  if (!compileProcessStatus.success) {
    console.error(
      `Compile failed (exit ${compileProcessStatus.code}). Not launching.`,
    );
    throw new Error("Compile failed");
  }

  const verbose = Deno.env.get("DEBUG") === "1" ||
    Deno.env.get("VERBOSE") === "1" ||
    Deno.args.includes("--verbose") ||
    Deno.args.includes("-v");
  // Redact common sensitive flags
  const redacted = (() => {
    const out: string[] = [];
    const redactLong = new Set(["--token", "--password", "--secret", "--key"]);
    for (let i = 0; i < Deno.args.length; i++) {
      const a = Deno.args[i];
      // Long form: --flag=value
      if (/^--(?:token|password|secret|key)=/i.test(a)) {
        out.push(a.replace(/=.*/, "=****"));
        continue;
      }
      // Long form: --flag <value>
      if (redactLong.has(a.toLowerCase())) {
        out.push(a);
        const next = Deno.args[i + 1];
        if (next && !next.startsWith("-")) {
          out.push("****");
          i++;
        }
        continue;
      }
      // Short form: -k=value
      if (/^-[tpsk]=/i.test(a)) {
        out.push(a.replace(/=.*/, "=****"));
        continue;
      }
      // Short form: -k <value>
      if (/^-[tpsk]$/i.test(a)) {
        out.push(a);
        const next = Deno.args[i + 1];
        if (next && !next.startsWith("-")) {
          out.push("****");
          i++;
        }
        continue;
      }
      out.push(a);
    }
    return out;
  })();
  if (verbose) console.log("Running:", [executable, ...redacted]);
  return run([executable, ...Deno.args]);
};

const debouncedRebuild = debounce(async () => {
  try {
    currentBuild.kill();
  } catch (_) {
    // process may have already exited
  }
  currentBuild = await buildAndRun();
}, 300);

// Initial build and run
let currentBuild: Deno.ChildProcess = await buildAndRun();

// Watch for changes
const watchPath: string = join(__cliDirectory, "src");

const log = debounce((event: Deno.FsEvent) => {
  console.log("[%s] %s", event.kind, event.paths[0]);
}, 200);

const watcher = Deno.watchFs(watchPath);

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
