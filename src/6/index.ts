import { basic } from "./prompts/6.basic";
import { prompt } from "./prompts/6.prompt";
import { parseInput } from "./parseInput";
import {
  findObstacleEast,
  findObstacleNorth,
  findObstacleSouth,
  findObstacleWest,
} from "./findObstacles";
import { Guard } from "./types";

const { guard, obstacles, matrix, steps } = parseInput(prompt);
const roomSize = { height: matrix.length, width: matrix[0].length };

let guardPosition = guard;
let newPosition = guardPosition;
let newSteps = 0;
while (guardPosition.direction !== "X") {
  switch (guardPosition.direction) {
    case "N":
      console.info("check north");
      newPosition = findObstacleNorth(guardPosition, obstacles, roomSize);
      newSteps = guardPosition.row - newPosition.row;

      for (let i = 0; i <= newSteps; i++) {
        steps[Math.max(guardPosition.row - i, 0)].add(guardPosition.col);
      }
      break;
    case "E":
      console.info("check east");
      newPosition = findObstacleEast(guardPosition, obstacles, roomSize);
      newSteps = newPosition.col - guardPosition.col;

      for (let i = 0; i <= newSteps; i++) {
        steps[guardPosition.row].add(
          Math.min(guardPosition.col + i, roomSize.width - 1),
        );
      }
      break;
    case "S":
      console.info("check south");
      newPosition = findObstacleSouth(guardPosition, obstacles, roomSize);
      newSteps = newPosition.row - guardPosition.row;

      for (let i = 0; i <= newSteps; i++) {
        steps[Math.min(guardPosition.row + i, roomSize.height - 1)].add(
          guardPosition.col,
        );
      }
      break;
    case "W":
      console.info("check west");
      newPosition = findObstacleWest(guardPosition, obstacles, roomSize);
      newSteps = guardPosition.col - newPosition.col;

      for (let i = 0; i <= newSteps; i++) {
        steps[guardPosition.row].add(Math.max(guardPosition.col - i, 0));
      }
      break;
  }

  console.info(guardPosition, "guardPosition");
  console.info(newPosition, "newPosition");
  guardPosition = newPosition as Guard;
}

const total = steps.reduce((totalSteps, stepsInRow) => {
  return totalSteps + stepsInRow.size;
}, 0);
console.info(`${total} distinct steps taken`);
