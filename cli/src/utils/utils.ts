import { strict as assert } from "node:assert";
import os from "node:os";
import meow from "meow";
import { SubcommandType } from "./types";

export async function rootCertificateInjection(): Promise<void> {
  if (os.platform() === "win32") {
   try {
      const { globalAgent } = await import("https");
      const { getCACertificates } = await import("node:tls");
      
      globalAgent.options.ca = getCACertificates('system');
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Failed to initialize system certificates: ${error.message}`,
        );
      }
    } 
  }
}

export function isValidSubcommandTypeByKey(input: string): boolean {
  assert(input != null);
  const memberKey: keyof typeof SubcommandType = input
    .toUpperCase() as keyof typeof SubcommandType;
  return memberKey in SubcommandType;
}

export function createMeowSubcommand(subcommand: string) {
  assert(isValidSubcommandTypeByKey(subcommand));
  return meow(
    `
	Usage
	  $ sap-devspace-cli ${subcommand} [options]

	Options
    -h, --help                      Show usage and exit
    -l, --landscape <URL>           The full URL of the target landscape 
    -d, --devspace  <name>          The display name of the target Dev Space

	Examples
	  $ sap-devspace-cli ${subcommand} -l https://...applicationstudio.cloud.sap -d MyDevSpace
`,
    {
      importMeta: import.meta,
      flags: {
        help: { type: "boolean", aliases: ["h"] },
        landscape: {
          type: "string",
          aliases: ["l"],
          description: "The full URL of the target landscape",
        },
        devspace: {
          type: "string",
          aliases: ["d"],
          description: "The display name of the target Dev Space",
        },
      },
    },
  );
}
// From https://stackoverflow.com/questions/40801349/converting-lodashs-uniqby-to-native-javascript
export const uniqueBy = (array: any[], predicate: string) => {
  if (!Array.isArray(array)) return [];

  const cb = typeof predicate === "function"
    ? predicate
    : (o: { [x: string]: any }) => o[predicate];

  const pickedObjects = array
    .filter((item) => item)
    .reduce((map, item) => {
      const key = cb(item);

      if (!key) return map;

      return map.has(key) ? map : map.set(key, item);
    }, new Map())
    .values();

  return [...pickedObjects];
};

export function pickByStringIndex<T>(
  array: T[],
  indices: string[],
): (T | undefined)[] {
  return indices
    .map((indexAsString: string) => Number(indexAsString))
    .filter((index: number) =>
      Number.isInteger(index) && index >= 0 && index < array.length
    )
    .map((index: number) => array[index]);
}

export function getRandomArbitrary(min?: number, max?: number): number {
  max = max || 33654;
  min = min || 30432;
  // verify max is larger than min
  const tmp: number = Math.max(min, max);
  if (tmp !== max) {
    // swap min <-> max
    min = max;
    max = tmp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
