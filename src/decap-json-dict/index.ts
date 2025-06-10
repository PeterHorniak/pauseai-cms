import CMS from "decap-cms-app";

export type EntryObject<T> = {
  [K in keyof T]: {
    key: K;
    value: T[K];
  };
}[keyof T];

/**
 * Registers a custom format with Decap CMS for working with dictionaries.
 *
 * While Decap CMS can't handle dictionaries natively, it can handle arrays of
 * objects. This custom format takes advantage of this to allow working with
 * dictionaries in a convenient way.
 *
 * The format is called "json_dict" and is associated with the ".json" file
 * extension. When loading data from a file, the data is parsed as JSON and then
 * converted to an array of {@link EntryObject EntryObjects}. When saving data to a file, the array
 * of EntryObjects is converted back to a dictionary and then stringified as
 * JSON.
 *
 * @param cms The Decap CMS instance to register the custom format with.
 */
export function registerPlugin(cms: typeof CMS) {
  cms.registerCustomFormat("json_dict", "json", {
    fromFile: (file) => {
      const dict = JSON.parse(file) as Record<string, unknown>;
      const entryObjects = dictToEntryObjects(dict);
      const parsed = { entries: entryObjects };
      return parsed;
    },
    toFile: (data) => {
      const entryObjects = (data as any).entries;
      const dict = entryObjectsToDict(entryObjects);
      return JSON.stringify(dict, null, "\t");
    },
  });
  console.log("registered");
}

/**
 * Given a dictionary, returns an array of EntryObjects, where each EntryObject
 * represents a key-value pair in the dictionary.
 * @template T
 * @param {Record<string, T>} dict
 * @returns {EntryObject<T>[]}
 */
export function dictToEntryObjects<T extends Record<string, unknown>>(
  dict: T
): EntryObject<T>[] {
  return Object.entries(dict).map(([key, value]) => ({
    key: key as keyof T,
    value: value as T[keyof T],
  }));
}

/**
 * Given an array of EntryObject, returns a dictionary where the keys are the
 * 'key' properties of the EntryObject and the values are the 'value' properties.
 * @template T
 * @param {EntryObject<T>[]} entryObjects
 * @returns {Record<string, T>}
 */
export function entryObjectsToDict<T extends Record<string, unknown>>(
  entryObjects: EntryObject<T>[]
): T {
  return entryObjects.reduce((acc, entry) => {
    acc[entry.key as keyof T] = entry.value; // Cast key to keyof T
    return acc;
  }, {} as T);
}
