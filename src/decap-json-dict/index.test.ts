import { describe, it, expect, beforeEach } from "vitest"; // Assuming Vitest or similar test runner
import { dictToEntryObjects, entryObjectsToDict, registerPlugin } from ".";

describe("dictToEntryObjects", () => {
  it("should convert a simple dictionary to an array of EntryObjects", () => {
    const dict = {
      name: "Alice",
      age: 30,
    };
    const expected = [
      { key: "name", value: "Alice" },
      { key: "age", value: 30 },
    ];
    expect(dictToEntryObjects(dict)).toEqual(expected);
  });

  it("should handle an empty dictionary", () => {
    const dict = {};
    const expected: any[] = [];
    expect(dictToEntryObjects(dict)).toEqual(expected);
  });

  it("should handle a dictionary with different data types", () => {
    const dict = {
      isActive: true,
      items: ["apple", "banana"],
      details: { city: "New York" },
    };
    const expected = [
      { key: "isActive", value: true },
      { key: "items", value: ["apple", "banana"] },
      { key: "details", value: { city: "New York" } },
    ];
    expect(dictToEntryObjects(dict)).toEqual(expected);
  });
});

describe("entryObjectsToDict", () => {
  it("should convert an array of EntryObjects to a dictionary", () => {
    const entryObjects = [
      { key: "name", value: "Bob" },
      { key: "occupation", value: "Engineer" },
    ];
    const expected = {
      name: "Bob",
      occupation: "Engineer",
    };
    expect(entryObjectsToDict(entryObjects)).toEqual(expected);
  });

  it("should handle an empty array of EntryObjects", () => {
    const entryObjects: any[] = [];
    const expected = {};
    expect(entryObjectsToDict(entryObjects)).toEqual(expected);
  });

  it("should handle EntryObjects with different data types", () => {
    const entryObjects = [
      { key: "isEnabled", value: false },
      { key: "numbers", value: [1, 2, 3] },
      { key: "config", value: { theme: "dark" } },
    ];
    const expected = {
      isEnabled: false,
      numbers: [1, 2, 3],
      config: { theme: "dark" },
    };
    expect(entryObjectsToDict(entryObjects)).toEqual(expected);
  });

  it("should handle EntryObjects with duplicate keys by using the last occurrence", () => {
    const entryObjects = [
      { key: "color", value: "red" },
      { key: "size", value: "M" },
      { key: "color", value: "blue" },
    ];
    const expected = {
      color: "blue",
      size: "M",
    };
    expect(entryObjectsToDict(entryObjects)).toEqual(expected);
  });
});
