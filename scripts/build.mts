// deno-lint-ignore-file no-process-global
/**
 * Build script adapted from
 * https://github.com/openai/codex/blob/main/codex-cli/build.mjs
 */
import type { Plugin, PluginBuild } from "esbuild";
import * as esbuild from "esbuild";
import * as fs from "fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname: string = dirname(fileURLToPath(import.meta.url));
const __rootDirectory: string = dirname(
  dirname(fileURLToPath(import.meta.url)),
);
const __cliDirectory: string = join(__rootDirectory, "packages", "cli");
const __distDirectory: string = join(__cliDirectory, "dist");
const __distBinDirectory: string = join(__distDirectory, "bin");
const entryPoint: string = join(
  __cliDirectory,
  "src",
  "index.tsx",
);
const tsConfig: string = join(__cliDirectory, "tsconfig.json");
const packagePath: string = join(__cliDirectory, "package.json");
const distPackagePath: string = join(__distDirectory, "package.json");
const inject: string = join(__dirname, "require-shim.ts");

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
const outPath: string = resolve(__distDirectory);
if (fs.existsSync(outPath)) {
  fs.rmSync(outPath, { recursive: true, force: true });
}

esbuild
  .build({
    entryPoints: [entryPoint],
    loader: { ".node": "file" },
    // Do not bundle the contents of package.json at build time: always read it
    // at runtime.
    external: [packagePath, "vscode", "node:child_process"],
    bundle: true,
    format: "esm",
    platform: "node",
    tsconfig: tsConfig,
    outfile: isDevBuild
      ? `${__distBinDirectory}/index-dev.js`
      : `${__distBinDirectory}/index.js`,
    minify: !isDevBuild,
    sourcemap: isDevBuild ? "inline" : true,
    plugins: [ignoreReactDevToolsPlugin],
    inject: [inject],
  })
  .then(() => {
    // Copy additional files to dist
    const rootPackage = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const filesToCopy: string[] = ["README.md", "LICENSE"];
    filesToCopy.forEach((file: string) => {
      const source: string = join(__rootDirectory, file);
      const destination: string = join(__distDirectory, file);
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
      }
    });
    // Produce production package.json with bin and main
    const distPackage = {
      name: rootPackage.name,
      description: rootPackage.description,
      version: rootPackage.version,
      license: rootPackage.license,
      type: rootPackage.type,
      main: "bin/index.js",
      bin: {
        [rootPackage.name]: "bin/index.js",
      },
      engines: rootPackage.engines,
      files: rootPackage.files,
      repository: rootPackage.repository,
      keywords: rootPackage.keywords,
    };

    fs.writeFileSync(distPackagePath, JSON.stringify(distPackage, null, 2));
  })
  .catch(() => process.exit(1));
