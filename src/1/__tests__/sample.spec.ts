import { describe, test, expect } from "vitest";
import { sample } from "../prompts/1.sample";
import { processInput } from "../processInput";

describe("AOC Day 1", () => {
  test("should return expected result", () => {
    const result = processInput(sample);
    expect(result).toBe(31);
  });
});
