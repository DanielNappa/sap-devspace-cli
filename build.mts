/**
 * Build script adapted from
 * https://github.com/openai/codex/blob/main/codex-cli/build.mjs
 */
import type { Plugin, PluginBuild } from "esbuild";
import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";

const OUT_DIR: string = "dist";
/**
 * ink attempts to import react-devtools-core in an ESM-unfriendly way:
 *
 * https://github.com/vadimdemedes/ink/blob/eab6ef07d4030606530d58d3d7be8079b4fb93bb/src/reconciler.ts#L22-L45
 *
 * to make this work, we have to strip the import out of the build.
 */
const ignoreReactDevToolsPlugin: Plugin = {
  name: "ignore-react-devtools",
  setup(build: PluginBuild) {
    // When an import for 'react-devtools-core' is encountered,
    // return an empty module.
    build.onResolve(
      { filter: /^react-devtools-core$/ },
      (args: { path: any }) => {
        return { path: args.path, namespace: "ignore-devtools" };
      },
    );
    build.onLoad({ filter: /.*/, namespace: "ignore-devtools" }, () => {
      return { contents: "", loader: "js" };
    });
  },
};
// ----------------------------------------------------------------------------
// Build mode detection (production vs development)
//
//  • production (default): minified, external telemetry shebang handling.
//  • development (--dev|NODE_ENV=development):
//      – no minification
//      – inline source maps for better stacktraces
//      – shebang tweaked to enable Node's source‑map support at runtime
// ----------------------------------------------------------------------------

const isDevBuild: boolean = process.argv.includes("--dev") ||
  process.env.NODE_ENV === "development";

// Build Hygiene, ensure we drop previous dist dir and any leftover files
const outPath: string = path.resolve(OUT_DIR);
if (fs.existsSync(outPath)) {
  fs.rmSync(outPath, { recursive: true, force: true });
}

esbuild
  .build({
    entryPoints: ["cli-next/src/index.tsx"],
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
    plugins: [ignoreReactDevToolsPlugin],
    inject: ["./require-shim.ts"],
  })
  .catch(() => process.exit(1));
