import {splitByLine} from "../utils/splitByLine";
import {checkIfJunction} from "./checkIfJunction";
import {END, MazeSize, START, TILE, Tile, WALL} from "./types";

type ParseInput = (input: string) => {
  matrix: Tile[][],
  startPosition: Tile,
  endPosition: Tile,
  mazeSize: MazeSize,
}

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  let startPosition = { col: Infinity, row: Infinity };
  let endPosition = { col: Infinity, row: Infinity };

  const mazeSize = { width: lines[0].length - 1, height: lines.length - 1};

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        let type = col === '#' ? WALL : TILE

        if (col === 'S') {
          startPosition = { col: colIndex, row: rowIndex }
          type = START;
        }
        if (col === 'E') {
          endPosition = { col: colIndex, row: rowIndex }
          type = END;
        }

        const locator = checkIfJunction(lines, mazeSize, { row: rowIndex, col: colIndex });

        return [...innerAcc, { row: rowIndex, col: colIndex, type, ...locator }];
      }, [] as Tile[]),
    ];
  }, [] as Tile[][]);

  if (startPosition.row === Infinity || endPosition.row === Infinity) {
    throw new Error('no start or end position found');
  }

  return {
    matrix,
    startPosition: matrix[startPosition.row][startPosition.col],
    endPosition: matrix[endPosition.row][endPosition.col],
    mazeSize
  }
}
