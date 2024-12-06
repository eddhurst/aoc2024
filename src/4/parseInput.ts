import { splitByLine } from "../utils/splitByLine";

export const parseInput = (input: string) => {
  const lines = splitByLine(input);

  return lines.reduce((outerAcc, row) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col) => {
        return [...innerAcc, col];
      }, [] as string[]),
    ];
  }, [] as string[][]);
};
