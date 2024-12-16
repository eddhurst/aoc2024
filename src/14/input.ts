import { basic } from "./prompts/14.basic";
import { parseInput } from "./parseInput";
import { Position } from "./types";
import { DEBUG } from "./debug";
import { logResult } from "../utils/log";
import { prompt } from "./prompts/14.prompt";

const { robots, map } = parseInput(prompt);

const debug = [
  {
    startingPosition: { col: 2, row: 4 },
    velocity: { horizontal: 2, vertical: -3 },
  },
];

const WAIT = 100;

const finalRobots = robots.reduce((endPositions, robot) => {
  const { startingPosition, velocity } = robot;

  let newPosition = { ...startingPosition };
  if (DEBUG) console.info(robot);
  if (DEBUG) console.info(`start at:`, newPosition);
  for (let i = 0; i < WAIT; i++) {
    let moveHorizontal = newPosition.col + velocity.horizontal;
    if (moveHorizontal < 0) {
      moveHorizontal += map.width + 1;
    } else if (moveHorizontal > map.width) {
      moveHorizontal -= map.width + 1;
    }

    let moveVertical = newPosition.row + velocity.vertical;
    if (moveVertical < 0) {
      moveVertical += map.height + 1;
    } else if (moveVertical > map.height) {
      moveVertical -= map.height + 1;
    }

    newPosition = { col: moveHorizontal, row: moveVertical };

    if (DEBUG) console.info(` move to:`, newPosition);
  }

  if (newPosition.col === map.middleCol || newPosition.row === map.middleRow) {
    return endPositions;
  }

  return [...endPositions, newPosition];
}, [] as Position[]);

const quadrants = finalRobots.reduce(
  (quadrants, robot) => {
    if (robot.col < map.middleCol && robot.row < map.middleRow) {
      console.info(`[${robot.row}, ${robot.col}]: q1`);
      return { ...quadrants, q1: quadrants.q1 + 1 };
    }

    if (robot.col > map.middleCol && robot.row < map.middleRow) {
      console.info(`[${robot.row}, ${robot.col}]: q2`);
      return { ...quadrants, q2: quadrants.q2 + 1 };
    }

    if (robot.col < map.middleCol && robot.row > map.middleRow) {
      console.info(`[${robot.row}, ${robot.col}]: q3`);
      return { ...quadrants, q3: quadrants.q3 + 1 };
    }

    if (robot.col > map.middleCol && robot.row > map.middleRow) {
      console.info(`[${robot.row}, ${robot.col}]: q4`);
      return { ...quadrants, q4: quadrants.q4 + 1 };
    }

    return quadrants;
  },
  { q1: 0, q2: 0, q3: 0, q4: 0 },
);

logResult(quadrants.q1 * quadrants.q2 * quadrants.q3 * quadrants.q4);
