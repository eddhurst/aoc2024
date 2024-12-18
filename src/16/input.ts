import {basic} from "./prompts/16.basic";
import {parseInput} from "./parseInput";
import {easy} from "./prompts/16.easy";
import {Direction, Locator, START, Tile} from "./types";

const { matrix, startPosition, endPosition } = parseInput(easy);

// console.info(matrix);
// console.info(startPosition);
// console.info(endPosition);

const visited = [] as Tile[];
let playerDirection = 'N';
let deadEnd = false;

export type WalkForwards = (direction: Direction, cameFrom: Locator) => false | Tile;
const walkForwards: WalkForwards = (direction, steppedFrom) => {
  // console.info('steppedFrom');
  // console.info(steppedFrom);

  const position = matrix[steppedFrom.row][steppedFrom.col];

  let nextTile = false as false | Tile;

  switch (direction) {
    case 'N':
      if (!position.north) break;
      nextTile = matrix[steppedFrom.row - 1][steppedFrom.col]
      break;
    case 'E':
      if (!position.east) break;
      nextTile = matrix[steppedFrom.row][steppedFrom.col + 1]
      break;
    case 'S':
      if (!position.south) break;
      nextTile = matrix[steppedFrom.row + 1][steppedFrom.col]
      break;
    case 'W':
      if (!position.west) break;
      nextTile = matrix[steppedFrom.row][steppedFrom.col - 1]
      break;
  }

  if (nextTile !== false) {
    console.info(nextTile, direction);
    return nextTile;
  }

  return false;
}

let direction = 'W' as Direction;
let standingOn = endPosition;

for (let i = 0; i < 11; i++) {
  const steppedTo = walkForwards(direction, standingOn);

  if (!steppedTo) {
    direction = 'S';
    continue;
  }

  visited.push(steppedTo)
  standingOn = steppedTo;

  if (steppedTo.type === START) {
    console.info('WINNER');
    break;
  }
}

console.info('--------')
// console.info(visited);

