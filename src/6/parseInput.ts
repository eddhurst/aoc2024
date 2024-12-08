import { splitByLine } from "../utils/splitByLine";
import { Guard, Obstacles, Steps } from "./types";

type ParseInput = (input: string) => {
  guard: Guard;
  obstacles: Obstacles;
  matrix: string[][];
  steps: Steps;
};

export const parseInput: ParseInput = (input: string) => {
  const lines = splitByLine(input);
  const obstacles = {} as Obstacles;
  let guard = {} as Guard;
  const steps = {} as Steps;

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    obstacles[rowIndex] = [];
    steps[rowIndex] = {};

    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        if (col === "#") {
          obstacles[rowIndex].push(colIndex);
        }

        let direction;

        if (col === "<" || col === ">" || col === "^" || col === "v") {
          switch (col) {
            case "<":
              direction = "W";
              break;
            case ">":
              direction = "E";
              break;
            case "^":
              direction = "N";
              break;
            case "v":
              direction = "S";
              break;
          }
          guard = { col: colIndex, row: rowIndex, direction };
        }

        return [...innerAcc, col];
      }, [] as string[]),
    ];
  }, [] as string[][]);

  return {
    matrix,
    obstacles,
    guard,
    steps,
  };
};
