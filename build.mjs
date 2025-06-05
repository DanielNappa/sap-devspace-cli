/**
 * Build script adapted from
 * https://github.com/openai/codex/blob/main/codex-cli/build.mjs
 */
import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";

const OUT_DIR = "dist";
// ----------------------------------------------------------------------------
// Build mode detection (production vs development)
//
//  • production (default): minified, external telemetry shebang handling.
//  • development (--dev|NODE_ENV=development):
//      – no minification
//      – inline source maps for better stacktraces
//      – shebang tweaked to enable Node's source‑map support at runtime
// ----------------------------------------------------------------------------

const isDevBuild = process.argv.includes("--dev") ||
  process.env.NODE_ENV === "development";

// Build Hygiene, ensure we drop previous dist dir and any leftover files
const outPath = path.resolve(OUT_DIR);
if (fs.existsSync(outPath)) {
  fs.rmSync(outPath, { recursive: true, force: true });
}

const shebangLine =
  "#!/usr/bin/env -S node --no-warnings --enable-source-maps \n";

esbuild
  .build({
    entryPoints: ["cli/src/index.ts"],
    banner: {
      js: shebangLine,
    },
    loader: { ".node": "file" },
    // Do not bundle the contents of package.json at build time: always read it
    // at runtime.
    external: ["/package.json", "vscode", "node:child_process", "win-ca"],
    bundle: true,
    format: "esm",
    platform: "node",
    tsconfig: "tsconfig.json",
    outfile: isDevBuild ? `${OUT_DIR}/index-dev.js` : `${OUT_DIR}/index.js`,
    minify: !isDevBuild,
    sourcemap: isDevBuild ? "inline" : true,
    inject: ["./require-shim.ts"],
  })
  .catch(() => process.exit(1));
