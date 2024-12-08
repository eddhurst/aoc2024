import { splitByLine } from "../utils/splitByLine";

type ParseInput = (file: string) => { result: number; numbers: number[] }[];

export const parseInput: ParseInput = (file) => {
  const data = splitByLine(file);

  const parsed = data.map((line) => {
    const [result, numbers] = line.split(":");
    return {
      result: parseInt(result),
      numbers: Array.from(numbers.matchAll(/(\d+)/g)).map(([match]) => {
        return parseInt(match);
      }),
    };
  });

  return parsed;
};
