import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __rootDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT_DIR: string = join(__rootDirectory, "dist");

const rootPackagePath: string = join(__rootDirectory, "package.json");

const rootPackage = JSON.parse(readFileSync(rootPackagePath, "utf8"));

function processExportMap(m) {
  for (const key in m) {
    const value = m[key];
    if (typeof value === "string") m[key] = value.replace(/^\.\/dist\//, "./");
    else processExportMap(value);
  }
}
processExportMap(rootPackage.exports);

for (const key of ["types", "main", "module"]) {
  if (typeof rootPackage[key] === "string") {
    rootPackage[key] = rootPackage[key].replace(/^(\.\/)?dist\//, "./");
  }
}

delete rootPackage.module;
delete rootPackage.dependencies;
delete rootPackage.devDependencies;

console.log(JSON.stringify(rootPackage, null, 2));
