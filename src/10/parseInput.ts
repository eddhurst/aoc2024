import { splitByLine } from "../utils/splitByLine";
import { example } from "./prompts/10.example";

type GridReferences = { row: number; col: number }[];

type ParseInput = (input: string) => {
  matrix: number[][];
  trailHeads: GridReferences;
  trailTails: GridReferences;
  parkSize: { width: number; height: number };
};

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  const trailHeads = [] as GridReferences;
  const trailTails = [] as GridReferences;

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        if (col === "0") {
          trailHeads.push({ row: rowIndex, col: colIndex });
        }

        if (col === "9") {
          trailTails.push({ row: rowIndex, col: colIndex });
        }

        if (col === ".") {
          return [...innerAcc, -1];
        }

        return [...innerAcc, parseInt(col)];
      }, [] as number[]),
    ];
  }, [] as number[][]);

  const parkSize = { width: matrix[0].length - 1, height: matrix.length - 1 };

  return {
    matrix,
    trailHeads,
    trailTails,
    parkSize,
  };
};
