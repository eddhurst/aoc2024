import { splitByLine } from "../utils/splitByLine";
import {checkDirections, Edges} from "./checkDirections";

export type Plot = {
  row: number;
  col: number;
  veg: string;
  fencePanels: number;
  contiguous: string[];
  edges: Edges
};

export type Plots = Record<string, Plot[]>;

export type Allotment = { width: number; height: number };

type ParseInput = (input: string) => {
  matrix: Plot[][]; // Losing the plot here
  plots: Plots;
  allotmentSize: Allotment;
};

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  const plots = {} as Plots;

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        const { fencePanels, contiguous, edges } = checkDirections(
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
            edges,
          });
        } else {
          plots[col] = [
            { row: rowIndex, col: colIndex, veg: col, fencePanels, contiguous, edges },
          ];
        }

        return [
          ...innerAcc,
          { row: rowIndex, col: colIndex, veg: col, fencePanels, contiguous, edges },
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
