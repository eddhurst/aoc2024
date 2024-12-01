import { describe, test, expect } from "vitest";
import { sample } from "../prompts/1.sample";
import { process } from "../processInput";

describe("AOC Day 1", () => {
  test("should return expected result", () => {
    const result = process(sample);
    expect(result).toBe(31);
  });
});
