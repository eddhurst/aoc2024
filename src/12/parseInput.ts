import {splitByLine} from "../utils/splitByLine";

type ParseInput = (input: string) => {
  matrix: string[][];
  plots: Record<string, { row: number, col: number }[]>
  allotmentSize: { width: number, height: number }
}

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  const plots = {} as Record<string, { row: number, col: number }[]>

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {

        if (plots[col]) {
          plots[col].push({row: rowIndex, col: colIndex})
        } else {
          plots[col] = [{row: rowIndex, col: colIndex}]
        }

        return [...innerAcc, col];
      }, [] as string[]),
    ];
  }, [] as string[][]);

  return {
    matrix,
    plots,
    allotmentSize: { height: lines.length, width:lines[0].length }
  }
}

