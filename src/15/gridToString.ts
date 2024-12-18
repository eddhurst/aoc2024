import {
  Tile,
  TILE_BOX_LHS,
  TILE_BOX_RHS,
  TILE_PLAYER,
  TILE_TILE,
  TILE_WALL,
} from "./parseInput";

type GridToString = (matrix: Tile[][]) => string;
export const gridToString: GridToString = (matrix) => {
  let output = "";
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      let value = "?";
      switch (matrix[y][x].type) {
        case TILE_BOX_LHS:
          value = "[";
          break;
        case TILE_BOX_RHS:
          value = "]";
          break;
        case TILE_WALL:
          value = "#";
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

  return output;
};
