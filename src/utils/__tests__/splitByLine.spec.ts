import { test, describe, expect } from "vitest";
import { splitByLine } from "../splitByLine";

const sample = `111\n222\n333\n444\n555\n\n\n`;

describe("splitByLine utility", () => {
  test("returns an array of lines, ignoring trailing empty lines", () => {
    const result = splitByLine(sample);
    expect(result).toHaveLength(5);
  });
});
