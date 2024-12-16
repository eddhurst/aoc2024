import { basic } from "./prompts/14.basic";
import { splitByLine } from "../utils/splitByLine";
import { ParseInput, Robots } from "./types";
import { DEBUG } from "./debug";

let WIDTH = 101;
let HEIGHT = 103;

if (DEBUG) {
  WIDTH = 11;
  HEIGHT = 7;
}

export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  const robots = lines.reduce((positions, robot) => {
    const [col, row, horizontal, vertical] = Array.from(
      robot.matchAll(/-?\d+/g),
    ).map((x) => parseInt(x[0]));

    return [
      ...positions,
      { startingPosition: { col, row }, velocity: { horizontal, vertical } },
    ];
  }, [] as Robots);

  const width = WIDTH - 1;
  const height = HEIGHT - 1;
  const middleCol = Math.floor(width / 2);
  const middleRow = Math.floor(height / 2);

  return {
    robots,
    map: { width, height, middleCol, middleRow },
  };
};
