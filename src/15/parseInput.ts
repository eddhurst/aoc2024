import { basic } from "./prompts/15.basic";
import { splitByLine } from "../utils/splitByLine";

export const TILE_WALL = "WALL";
export const TILE_BOX = "BOX";
export const TILE_TILE = "TILE";

export const DIRECTION_NORTH = "NORTH";
export const DIRECTION_EAST = "EAST";
export const DIRECTION_SOUTH = "SOUTH";
export const DIRECTION_WEST = "WEST";

type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";
type TileType = "TILE" | "BOX" | "WALL";
type Tile = { col: number; row: number; type: TileType };

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
        let type;
        switch (col) {
          case "#":
            type = TILE_WALL as TileType;
            break;
          case "O":
            type = TILE_BOX as TileType;
            break;
          case "@":
            type = TILE_TILE as TileType;
            player = { row: rowIndex, col: colIndex };
            break;
          default:
            type = TILE_TILE as TileType;
            break;
        }

        return [...innerAcc, { row: rowIndex, col: colIndex, type }];
      }, [] as Tile[]),
    ];
  }, [] as Tile[][]);

  const room = { width: lines[0].length, height: lines.length };

  const parsedInstructions = instructions
    .replaceAll("\n", "")
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
          throw new Error("no direction found");
      }

      return { direction, instruction: x };
    });

  return { matrix, room, instructions: parsedInstructions, player };
};
