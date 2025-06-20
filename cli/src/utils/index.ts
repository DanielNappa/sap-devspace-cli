import { log } from "@clack/prompts";
import { strict as assert } from "node:assert";
import os from "node:os";

export async function rootCertificateInjection(): Promise<void> {
  if (os.platform() === "win32") {
    try {
      const ca = await import("win-ca");
      const api = ca.default || ca;

      if (api && typeof api.inject === "function") {
        assert(api != null);
        assert(typeof api.inject === "function");
        api.inject("+");
      } else {
        log.error('Could not find "inject" method for "win-ca" library');
      }
    } catch (error) {
      if (error instanceof Error) {
        log.error(
          `Failed to initialize "win-ca" for system certificates: ${error.message}`,
        );
      }
    }
  }
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
