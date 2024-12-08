import { basic } from "./prompts/6.basic";
import { prompt } from "./prompts/6.prompt";
import { parseInput } from "./parseInput";
import { willGuardLoop } from "./willGuardLoop";

// TODO: The answer is off by 1 (+1) for some reason.
const { guard, obstacles, matrix, steps } = parseInput(prompt);
const roomSize = { height: matrix.length, width: matrix[0].length };

let resultsInLoop = 0;
for (let row = 0; row < roomSize.height; row++) {
  for (let col = 0; col < roomSize.width; col++) {
    const resetGuard = structuredClone(guard);
    const newObstacles = structuredClone(obstacles);
    const newSteps = structuredClone(steps);
    newObstacles[row].push(col);

    if (willGuardLoop(resetGuard, newObstacles, roomSize, newSteps)) {
      resultsInLoop++;
    }

    // remove again, just in case of mutation errors?
    newObstacles[row].splice(newObstacles[row].indexOf(col), 1);
  }
}

console.info(`${resultsInLoop} potential loop opportunities`);
