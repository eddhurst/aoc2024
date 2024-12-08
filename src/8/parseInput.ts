import { splitByLine } from "../utils/splitByLine";
import { small } from "./prompts/8.small";
import { Antennae, CitySize } from "./types";

type ParseInput = (input: string) => {
  matrix: string[][];
  antenna: Antennae;
  citySize: CitySize;
};

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);
  const antenna = {} as Antennae;

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        if (col !== ".") {
          if (Object.hasOwn(antenna, col)) {
            antenna[col].push({ row: rowIndex, col: colIndex });
          } else {
            antenna[col] = [{ row: rowIndex, col: colIndex }];
          }
        }

        return [...innerAcc, col];
      }, [] as string[]),
    ];
  }, [] as string[][]);

  return {
    matrix,
    antenna,
    citySize: { width: matrix[0].length, height: matrix.length },
  };
};
