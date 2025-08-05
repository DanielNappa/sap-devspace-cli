import { strict as assert } from "node:assert";
import meow from "meow";
import { SubcommandType } from "./types.ts";

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
export function uniqueBy<T extends Record<PropertyKey, unknown>>(
  array: (T | undefined)[],
  predicate: keyof T,
) {
  if (!Array.isArray(array)) return [];

  const cb = typeof predicate === "function"
    ? predicate
    : (o: T | undefined) => o?.[predicate];

  const pickedObjects = array
    .filter((item): item is T => Boolean(item))
    .reduce((map, item) => {
      const key = cb(item);

      if (!key) return map;

      return map.has(key) ? map : map.set(key, item);
    }, new Map())
    .values();

  return [...pickedObjects];
}

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
