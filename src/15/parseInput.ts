import { splitByLine } from "../utils/splitByLine";

export const TILE_BOX_LHS = "BOX_LHS";
export const TILE_BOX_RHS = "BOX_RHS";
export const TILE_WALL = "WALL";
export const TILE_TILE = "TILE";
export const TILE_PLAYER = "PLAYER";

export const DIRECTION_NORTH = "NORTH";
export const DIRECTION_EAST = "EAST";
export const DIRECTION_SOUTH = "SOUTH";
export const DIRECTION_WEST = "WEST";

type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";
type TileType = "TILE" | "BOX_LHS" | "BOX_RHS" | "WALL" | "PLAYER";
export type Tile = { col: number; row: number; type: TileType };

type ParseInput = (input: string) => {
  instructions: { direction: Direction; instruction: string }[];
  matrix: Tile[][];
  room: { width: number; height: number };
  player: { row: number; col: number };
};

export const parseInput: ParseInput = (input) => {
  const [map, instructions] = input.split("\n\n");

  const lines = splitByLine(map);

  let player;

  const matrix = lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        let lhsType;
        let rhsType;

        switch (col) {
          case "#":
            lhsType = TILE_WALL as TileType;
            rhsType = TILE_WALL as TileType;
            break;
          case "O":
            lhsType = TILE_BOX_LHS as TileType;
            rhsType = TILE_BOX_RHS as TileType;
            break;
          case "@":
            lhsType = TILE_PLAYER as TileType;
            rhsType = TILE_TILE as TileType;
            player = { row: rowIndex, col: innerAcc.length };
            break;
          default:
            lhsType = TILE_TILE as TileType;
            rhsType = TILE_TILE as TileType;
            break;
        }

        return [
          ...innerAcc,
          { row: rowIndex, col: innerAcc.length, type: lhsType },
          { row: rowIndex, col: innerAcc.length + 1, type: rhsType },
        ];
      }, [] as Tile[]),
    ];
  }, [] as Tile[][]);

  const room = { width: lines[0].length, height: lines.length };

  const parsedInstructions = instructions
    .replaceAll("\n", "")
    .replaceAll(" ", "")
    .split("")
    .map((x) => {
      let direction;
      switch (x) {
        case "^":
          direction = DIRECTION_NORTH as Direction;
          break;
        case ">":
          direction = DIRECTION_EAST as Direction;
          break;
        case "v":
          direction = DIRECTION_SOUTH as Direction;
          break;
        case "<":
          direction = DIRECTION_WEST as Direction;
          break;
        default:
          console.info(direction);
          throw new Error("no direction found");
      }

      return { direction, instruction: x };
    });

  if (!player) {
    throw new Error("player not found");
  }

  return { matrix, room, instructions: parsedInstructions, player };
};
