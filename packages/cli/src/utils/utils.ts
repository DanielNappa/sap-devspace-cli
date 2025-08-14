import { strict as assert } from "node:assert";
import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import { ensureFileSync } from "fs-extra";
import { ulid } from "@std/ulid";
import chalk from "chalk";
import meow from "meow";
import { PostHog } from "posthog-node";
import { USER_PATH } from "./consts.ts";
import { SubcommandType } from "./types.ts";

type User = {
  ulid: string;
};

function generateULID() {
  const ULID: string = ulid();
  assert(ULID != null);
  const user: User = { ulid: ULID };
  writeFileSync(USER_PATH, JSON.stringify(user, null, 2), {
    encoding: "utf8",
  });
  try {
    writeFileSync(USER_PATH, JSON.stringify(user, null, 2), {
      encoding: "utf8",
    });
  } catch (_) {
    console.warn(chalk.yellow("Could not save user data."));
    // Still return the generated ULID even if write fails
  }
  return user.ulid;
}

export function getULID(): string {
  try {
    ensureFileSync(USER_PATH);
  } catch {
    console.warn(chalk.yellow("Could not ensure user data file exists."));
    return generateULID();
  }
  const buffer: string = readFileSync(USER_PATH, {
    encoding: "utf8",
    flag: "r",
  });
  // Generate a new ULID if new file / file empty
  if (buffer == null || buffer === "") {
    return generateULID();
  }

  try {
    const user: User = JSON.parse(buffer);
    assert(user != null);
    assert(user.ulid != null);
    return user.ulid;
  } catch (error: unknown) {
    const code = typeof error === "object" &&
        error !== null &&
        "code" in (error as Record<string, unknown>)
      ? (error as NodeJS.ErrnoException).code
      : undefined;

    // Ignore missing file on first run
    if (error instanceof SyntaxError) {
      // Corrupted cache file; reset and continue.
      console.warn(
        chalk.yellow("User data is corrupted. Resetting."),
      );
    } else if (error instanceof Error) {
      const suffix = code ? ` (${code})` : "";
      console.warn(
        chalk.yellow(`Could not read user data ${suffix}.`),
      );
    } else {
      console.warn(
        chalk.yellow("Could not read user data: Unknown error"),
      );
    }
  }
  return generateULID();
}

export async function getPostHog(): Promise<PostHog | undefined> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const disabled = process.env.DO_NOT_TRACK === "1" ||
    process.env.DS_TELEMETRY === "0";
  if (!apiKey || disabled) return undefined;
  const { PostHog } = await import("posthog-node");
  const client: PostHog = new PostHog(
    process.env.POSTHOG_API_KEY!,
    {
      host: "https://us.i.posthog.com",
      enableExceptionAutocapture: true,
    },
  );
  return client;
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
	  $ ds ${subcommand} [options]

	Options
    -h, --help                      Show usage and exit
    -l, --landscape <URL>           The full URL of the target landscape 
    -d, --devspace  <name>          The display name of the target Dev Space

	Examples
	  $ ds ${subcommand} -l https://...applicationstudio.cloud.sap -d MyDevSpace
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
