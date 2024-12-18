import {
  parseInput,
  TILE_BOX_LHS,
  TILE_BOX_RHS,
  TILE_PLAYER,
  TILE_TILE,
  TILE_WALL,
} from "./parseInput";
import { basic } from "./prompts/15.basic";
import { prompt } from "./prompts/15.prompt";
import { logResult } from "../utils/log";
import { gridToString } from "./gridToString";

const { matrix, instructions, player } = parseInput(basic);

console.info(player);
console.info(gridToString(matrix));

let currentPlayer = { ...player };
const currentMatrix = structuredClone(matrix);

type Move = (
  currentLocation: { currentCol: number; currentRow: number },
  moveBy: { moveByCol: number; moveByRow: number },
  doMove: boolean,
) => boolean;
const move: Move = (
  { currentCol, currentRow },
  { moveByCol, moveByRow },
  doMove = true,
) => {
  const potentialLocation =
    currentMatrix[currentRow + moveByRow][currentCol + moveByCol];

  if (potentialLocation.type === TILE_WALL) {
    return false;
  }

  if (
    potentialLocation.type === TILE_BOX_LHS ||
    potentialLocation.type === TILE_BOX_RHS
  ) {
    const lhsBox =
      potentialLocation.type === TILE_BOX_LHS
        ? potentialLocation
        : currentMatrix[potentialLocation.row][potentialLocation.col - 1];
    const rhsBox =
      potentialLocation.type === TILE_BOX_RHS
        ? potentialLocation
        : currentMatrix[potentialLocation.row][potentialLocation.col + 1];

    const canMoveLhs = move(
      {
        currentCol: lhsBox.col,
        currentRow: lhsBox.row,
      },
      { moveByCol, moveByRow },
      false,
    );
    const canMoveRhs = move(
      {
        currentCol: rhsBox.col,
        currentRow: rhsBox.row,
      },
      { moveByCol, moveByRow },
      false,
    );
    if (!canMoveLhs || !canMoveRhs) return false;
    if (!doMove) return true;
  }

  console.info(currentRow, currentCol);

  // current tile
  const currentTile = currentMatrix[currentRow][currentCol];
  if (currentTile.type === TILE_PLAYER) {
    currentPlayer = { row: potentialLocation.row, col: potentialLocation.col };
  }

  // potential tile === current tile
  currentMatrix[potentialLocation.row][potentialLocation.col] = {
    ...currentTile,
    row: potentialLocation.row,
    col: potentialLocation.col,
  };

  // current tile = empty tile
  currentMatrix[currentRow][currentCol].type = TILE_TILE;

  return true;
};

for (let i = 0; i < instructions.length; i++) {
  const { col: currentCol, row: currentRow } = currentPlayer;
  const instruction = instructions[i];

  switch (instruction.direction) {
    case "WEST":
      move({ currentCol, currentRow }, { moveByCol: -1, moveByRow: 0 });
      break;
    case "EAST":
      move({ currentCol, currentRow }, { moveByCol: 1, moveByRow: 0 });
      break;
    case "NORTH":
      move({ currentCol, currentRow }, { moveByCol: 0, moveByRow: -1 });
      break;
    case "SOUTH":
      move({ currentCol, currentRow }, { moveByCol: 0, moveByRow: 1 });
      break;
  }

  console.info(gridToString(currentMatrix));
}

let output = "";
let gps = 0;
for (let y = 0; y < currentMatrix.length; y++) {
  for (let x = 0; x < currentMatrix[0].length; x++) {
    const currentTile = currentMatrix[y][x];

    let value = "?";
    switch (currentTile.type) {
      case TILE_WALL:
        value = "#";
        break;
      case TILE_BOX_LHS:
        gps += currentTile.row * 100 + currentTile.col;
        value = "[";
        break;
      case TILE_BOX_RHS:
        gps += currentTile.row * 100 + currentTile.col;
        value = "]";
        break;
      case TILE_TILE:
        value = ".";
        break;
      case TILE_PLAYER:
        value = "@";
        break;
    }

    output += value;
  }

  output += "\n";
}

// console.info(output);
logResult(gps);
