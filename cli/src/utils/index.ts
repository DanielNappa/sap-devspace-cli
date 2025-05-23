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
