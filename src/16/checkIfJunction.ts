import {MazeSize, TileJunction, WALL} from "./types";


type CheckIfJunction = (input: string[], mazeSize: MazeSize, locator: { row: number, col: number}) => TileJunction

export const checkIfJunction: CheckIfJunction = (input, mazeSize, locator) => {
  const { row, col } = locator;

  if (input[row][col] === WALL) {
    return { isCorner: false, isJunction: false, north: false, east: false, south: false, west: false }
  }

  const north = row !== 0 && input[row - 1][col] !== WALL ? 1 : 0;
  const east = col !== mazeSize.width && input[row][col + 1] !== WALL ? 1 : 0
  const south = row !== mazeSize.height && input[row + 1][col] !== WALL ? 1 : 0
  const west = col !== 0 && input[row][col - 1] !== WALL ? 1 : 0

  const isCorner =
    !!north && !!east && !south ||
    !!north && !!west && !south ||
    !!south && !!east && !north ||
    !!south && !!west && !north
  const isJunction = (north + east + south + west) > 2 && true

  return { isCorner, isJunction, north: !!north, east: !!east, south: !!south, west: !!west }
}
