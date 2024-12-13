import { splitByLine } from "../utils/splitByLine";
import { checkDirections } from "./checkDirections";

export type Plot = {
  row: number;
  col: number;
  veg: string;
  fencePanels: number;
  contiguous: string[];
};

export type Plots = Record<string, Plot[]>;

type ParseInput = (input: string) => {
  matrix: Plot[][]; // Losing the plot here
  plots: Plots;
  allotmentSize: { width: number; height: number };
};

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  const plots = {} as Plots;

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        const { fencePanels, contiguous } = checkDirections(
          { row: rowIndex, col: colIndex },
          lines,
        );

        if (plots[col]) {
          plots[col].push({
            row: rowIndex,
            col: colIndex,
            veg: col,
            fencePanels,
            contiguous,
          });
        } else {
          plots[col] = [
            { row: rowIndex, col: colIndex, veg: col, fencePanels, contiguous },
          ];
        }

        return [
          ...innerAcc,
          { row: rowIndex, col: colIndex, veg: col, fencePanels, contiguous },
        ];
      }, [] as Plot[]),
    ];
  }, [] as Plot[][]);

  return {
    matrix,
    plots,
    allotmentSize: { width: lines[0].length - 1, height: lines.length - 1 },
  };
};
