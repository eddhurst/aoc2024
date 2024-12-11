type ParseInput = (input: string) => number[];

export const parseInput: ParseInput = (input: string) => {
  const stones = input.matchAll(/\d+/g);
  return Array.from(stones).map((x) => parseInt(x[0]));
};
