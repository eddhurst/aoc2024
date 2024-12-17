import { basic } from "./prompts/14.basic";
import { parseInput } from "./parseInput";
import { Position } from "./types";
import { DEBUG } from "./debug";
import { logResult } from "../utils/log";
import { prompt } from "./prompts/14.prompt";
import { addLocator, generateEmpty } from "../utils/generateGrid";

const { robots, map } = parseInput(prompt);

const debug = [
  {
    startingPosition: { col: 2, row: 4 },
    velocity: { horizontal: 2, vertical: -3 },
  },
];

const WAIT = 4000;
const finalRobots = [] as Position[][];

for (let r = 0; r < robots.length; r++) {
  const { startingPosition, velocity } = robots[r];

  let newPosition = { ...startingPosition };

  if (DEBUG) console.info(robots[r]);
  if (DEBUG) console.info(`start at:`, newPosition);
  for (let s = 0; s < WAIT; s++) {
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

    if (
      newPosition.col === map.middleCol ||
      newPosition.row === map.middleRow
    ) {
      continue;
    }

    if (finalRobots[s]) {
      finalRobots[s].push(newPosition);
    } else {
      finalRobots.push([newPosition]);
    }
  }
}

const outputString = [] as string[][];

const totalQuadrants = [] as {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}[];
for (let s = 0; s < WAIT; s++) {
  const thisSecondMap = generateEmpty(map);

  finalRobots[s].forEach((robot) => {
    addLocator({ col: robot.col, row: robot.row }, thisSecondMap);
  });

  console.info(thisSecondMap);
  console.info("\n\n\n");

  const secondQuadrants = finalRobots[s].reduce(
    (quadrants, robot) => {
      if (robot.col < map.middleCol && robot.row < map.middleRow) {
        // console.info(`[${robot.row}, ${robot.col}]: q1`);
        return { ...quadrants, q1: quadrants.q1 + 1 };
      }

      if (robot.col > map.middleCol && robot.row < map.middleRow) {
        // console.info(`[${robot.row}, ${robot.col}]: q2`);
        return { ...quadrants, q2: quadrants.q2 + 1 };
      }

      if (robot.col < map.middleCol && robot.row > map.middleRow) {
        // console.info(`[${robot.row}, ${robot.col}]: q3`);
        return { ...quadrants, q3: quadrants.q3 + 1 };
      }

      if (robot.col > map.middleCol && robot.row > map.middleRow) {
        // console.info(`[${robot.row}, ${robot.col}]: q4`);
        return { ...quadrants, q4: quadrants.q4 + 1 };
      }

      return quadrants;
    },
    { q1: 0, q2: 0, q3: 0, q4: 0 },
  );

  totalQuadrants.push(secondQuadrants);
}

console.info(outputString[1].join(""));

process.exit(1);

let result = 0;
for (let x = 0; x < WAIT; x++) {
  let top = false;
  let bottom = false;

  if (totalQuadrants[x].q1 === totalQuadrants[x].q2) {
    top = true;
    console.info(`TOP HALF THE SAME DURING SECOND: ${x}`);
  }

  if (totalQuadrants[x].q3 === totalQuadrants[x].q4) {
    bottom = true;
    console.info(`BOTTOM HALF THE SAME DURING SECOND: ${x}`);
  }

  if (top && bottom) {
    console.info("IS THIS A CHRISTMAS TREE?");
  }

  if (x === WAIT - 1) {
    result =
      totalQuadrants[99].q1 *
      totalQuadrants[99].q2 *
      totalQuadrants[99].q3 *
      totalQuadrants[99].q4;
  }
}

logResult(result);
