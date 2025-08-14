/**
 * Build script adapted from
 * https://github.com/openai/codex/blob/main/codex-cli/build.mjs
 */
import * as fs from "node:fs";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
const runtime: string = navigator.userAgent;

type Plugin<T extends string> = T extends "Bun" ? import("bun").BunPlugin
  : T extends "Deno" ? import("https://deno.land/x/esbuild/mod.js").Plugin
  : import("esbuild").Plugin;

type OnResolveArgs<T extends string> = T extends "Deno"
  ? import("https://deno.land/x/esbuild/mod.js").OnResolveArgs
  : import("esbuild").OnResolveArgs;

type PluginBuild<T extends string> = T extends "Bun"
  ? import("bun").PluginBuilder
  : T extends "Deno" ? import("https://deno.land/x/esbuild/mod.js").PluginBuild
  : import("esbuild").PluginBuild;

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
interface IgnorePluginOptions {
  name: string;
  filter: RegExp;
  namespace: string;
}

function createIgnorePlugin<T extends string>(
  options: IgnorePluginOptions,
): Plugin<T> {
  return {
    name: options.name,
    setup(build: PluginBuild<T>) {
      // When an import for filter is encountered,
      // return an empty module.
      build.onResolve(
        { filter: options.filter },
        (args) => {
          return { path: args.path, namespace: options.namespace };
        },
      );
      build.onLoad({ filter: /.*/, namespace: options.namespace }, () => {
        return { contents: "", loader: "js" };
      });
    },
  } as Plugin<T>;
}

function postBuild(): void {
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

  if (!isDevBuild) {
    // Produce production package.json with bin and main
    const distPackage = {
      name: rootPackage.name,
      description: rootPackage.description,
      version: rootPackage.version,
      license: rootPackage.license,
      type: rootPackage.type,
      main: "bin/index.js",
      bin: {
        "ds": "bin/index.js",
      },
      engines: rootPackage.engines,
      files: rootPackage.files,
      repository: rootPackage.repository,
      bugs: rootPackage.bugs,
      homepage: rootPackage.homepage,
      keywords: rootPackage.keywords,
    };

    fs.writeFileSync(distPackagePath, JSON.stringify(distPackage, null, 2));
  }
}

if (runtime.startsWith("Bun")) {
  const { $, build } = await import("bun");
  const ignoreReactDevToolsPlugin: Plugin<"Bun"> = createIgnorePlugin<"Bun">({
    name: "ignore-react-devtools",
    filter: /^react-devtools-core$/,
    namespace: "ignore-devtools",
  });
  try {
    await build({
      entrypoints: [entryPoint],
      loader: { ".node": "file" },
      // Do not bundle the contents of package.json at build time: always read it
      // at runtime.
      external: [packagePath, "vscode", "node:child_process"],
      format: "esm",
      target: "bun",
      tsconfig: tsConfig,
      outdir: __distBinDirectory,
      minify: !isDevBuild,
      sourcemap: isDevBuild ? "inline" : "external",
      plugins: [ignoreReactDevToolsPlugin],
    });
    postBuild();
    const bundle: Bun.BunFile = Bun.file(join(__distBinDirectory, "index.js"));
    const contents: string = await bundle.text();

    const platformTargets: string[][] = [
      ["windows", "x64"],
      ["linux", "arm64"],
      ["linux", "x64"],
      ["linux", "x64-baseline"],
      ["darwin", "x64"],
      ["darwin", "x64-baseline"],
      ["darwin", "arm64"],
    ];
    // Replace the shebang line
    const updated: string = contents.replace(
      /^#!.*\n/,
      "#!/usr/bin/env bun\n",
    );

    // Write back the modified file
    await Bun.write(bundle, updated);

    for (const [os, arch] of platformTargets) {
      console.log(`building ${os}-${arch}`);
      const name: string = `ds-${os}-${arch}`;
      await $`mkdir -p dist/${name}/bin`;
      await $`bun build --compile --target=bun-${os}-${arch} --outfile=dist/${name}/bin/${name} ${bundle}`;
    }
  } catch (error: unknown) {
    error instanceof Error && console.trace(error.message);
    process.exit(1);
  }
} else if (runtime.startsWith("Deno")) {
  const { isBuiltin } = await import("node:module");
  const { build, stop } = await import("https://deno.land/x/esbuild/mod.js");
  const { denoPlugin } = await import("jsr:@deno/esbuild-plugin");
  const ignoreReactDevToolsPlugin: Plugin<"Deno"> = createIgnorePlugin<"Deno">({
    name: "ignore-react-devtools",
    filter: /^react-devtools-core$/,
    namespace: "ignore-devtools",
  });
  const ignoreSupportsColorPlugin: Plugin<"Deno"> = createIgnorePlugin<"Deno">({
    name: "ignore-supports-color",
    filter: /^supports-color$/,
    namespace: "ignore-supports-color",
  });
  const nodePrefixPlugin: Plugin<"Deno"> = {
    name: "node-prefix",
    setup(build) {
      // Intercept any import path that is a Node built-in.
      // The filter uses a regex that matches any of the bare specifiers.
      build.onResolve({ filter: /^[^./][^/]*$/ }, (args) => {
        // Check if the path is a Node.js built-in module, but not already
        // prefixed with "node:".
        if (isBuiltin(args.path) && !args.path.startsWith("node:")) {
          return {
            path: `node:${args.path}`, // Rewrite path to `node:${args.path}`
            external: true, // Mark it as external to esbuild
          };
        }

        // For all other paths, let the next plugin (denoPlugin) handle it.
        return null;
      });
    },
  };
  try {
    await build({
      entryPoints: [entryPoint],
      loader: { ".node": "file" },
      // Do not bundle the contents of package.json at build time: always read it
      // at runtime.
      external: [packagePath, "vscode"],
      bundle: true,
      format: "esm",
      target: "deno2",
      platform: "neutral",
      tsconfig: tsConfig,
      outfile: `${__distBinDirectory}/index.js`,
      keepNames: false,
      mangleQuoted: true,
      minify: !isDevBuild,
      minifyWhitespace: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      treeShaking: true,
      sourcemap: isDevBuild ? "inline" : true,
      plugins: [
        nodePrefixPlugin,
        ignoreReactDevToolsPlugin,
        ignoreSupportsColorPlugin,
        denoPlugin(),
      ],
      inject: [inject],
    });
    await stop();
    postBuild();
    const bundlePath: string = join(__distBinDirectory, "index.js");
    const bundle = Deno.readTextFileSync(bundlePath);
    const updated: string = bundle.replace(
      /^#!.*\n/,
      "#!/usr/bin/env -S deno run -A  --\n",
    );
    // Write back the modified file
    Deno.writeTextFileSync(bundlePath, updated);
  } catch (error: unknown) {
    error instanceof Error && console.trace(error.message);
    process.exit(1);
  }
} else {
  const { build } = await import("esbuild");
  const ignoreReactDevToolsPlugin: Plugin<"Node"> = createIgnorePlugin<"Node">({
    name: "ignore-react-devtools",
    filter: /^react-devtools-core$/,
    namespace: "ignore-devtools",
  });

  try {
    await build({
      entryPoints: [entryPoint],
      loader: { ".node": "file" },
      // Do not bundle the contents of package.json at build time: always read it
      // at runtime.
      external: [packagePath, "vscode", "node:child_process"],
      bundle: true,
      format: "esm",
      platform: "node",
      tsconfig: tsConfig,
      outfile: `${__distBinDirectory}/index.js`,
      minify: !isDevBuild,
      sourcemap: isDevBuild ? "inline" : true,
      plugins: [ignoreReactDevToolsPlugin],
      inject: [inject],
    });
    postBuild();
  } catch (error: unknown) {
    error instanceof Error && console.trace(error.message);
    process.exit(1);
  }
}
