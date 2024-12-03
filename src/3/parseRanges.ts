import { INVALID, VALID } from "./index";

export const parseRanges = (instructions: string) => {
  const validRangeStarts = Array.from(instructions.matchAll(/do\(\)/g)).map(
    (x) => ({ index: x.index, status: VALID }),
  );
  const invalidRangeStarts = Array.from(
    instructions.matchAll(/don't\(\)/g),
  ).map((x) => ({ index: x.index, status: INVALID }));

  return [...validRangeStarts, ...invalidRangeStarts].sort(
    (a, b) => a.index - b.index,
  );
};
