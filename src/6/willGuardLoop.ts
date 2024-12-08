import { Guard, Obstacles, RoomSize, Steps } from "./types";
import {
  findObstacleEast,
  findObstacleNorth,
  findObstacleSouth,
  findObstacleWest,
} from "./findObstacles";
import { checkIfInLoop, trackStep } from "./trackStep";

type WillGuardLoop = (
  start: Guard,
  obstacles: Obstacles,
  roomSize: RoomSize,
  steps: Steps,
) => boolean;

export const willGuardLoop: WillGuardLoop = (
  start: Guard,
  obstacles,
  roomSize,
  steps,
) => {
  let guardPosition = start;
  let newPosition = guardPosition;
  let newSteps = 0;
  let looping = false;

  while (guardPosition.direction !== "X" && !looping) {
    switch (guardPosition.direction) {
      case "N":
        newPosition = findObstacleNorth(guardPosition, obstacles, roomSize);
        newSteps = guardPosition.row - newPosition.row;
        for (let i = 0; i < newSteps; i++) {
          trackStep(steps, guardPosition.row - i, guardPosition.col, "N");
        }
        looping = checkIfInLoop(steps, newPosition);
        break;
      case "E":
        newPosition = findObstacleEast(guardPosition, obstacles, roomSize);
        newSteps = newPosition.col - guardPosition.col;
        for (let i = 0; i < newSteps; i++) {
          trackStep(steps, guardPosition.row, guardPosition.col + i, "E");
        }
        looping = checkIfInLoop(steps, newPosition);
        break;
      case "S":
        newPosition = findObstacleSouth(guardPosition, obstacles, roomSize);
        newSteps = newPosition.row - guardPosition.row;
        for (let i = 0; i < newSteps; i++) {
          trackStep(steps, guardPosition.row + i, guardPosition.col, "S");
        }
        looping = checkIfInLoop(steps, newPosition);
        break;
      case "W":
        newPosition = findObstacleWest(guardPosition, obstacles, roomSize);
        newSteps = guardPosition.col - newPosition.col;
        for (let i = 0; i < newSteps; i++) {
          trackStep(steps, guardPosition.row, guardPosition.col - i, "W");
        }
        looping = checkIfInLoop(steps, newPosition);
        break;
    }
    //
    // console.info(guardPosition, "guardPosition");
    // console.info(newPosition, "newPosition");
    // console.info("-----");
    guardPosition = newPosition;
  }

  return looping;
};
