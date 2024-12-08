import { Guard, Obstacles, RoomSize } from "./types";

type FindObstacles = (
  guard: Guard,
  obstacles: Obstacles,
  roomSize: RoomSize,
) => Guard;

export const findObstacleNorth: FindObstacles = (guard, obstacles) => {
  let newGuardLocation;
  for (let i = guard.row; i >= 0; i--) {
    if (obstacles[i].includes(guard.col)) {
      newGuardLocation = {
        col: guard.col,
        row: i + 1,
        direction: "E",
      } as Guard;
      break;
    }
  }

  return newGuardLocation
    ? newGuardLocation
    : { row: 0, col: guard.col, direction: "X" };
};

export const findObstacleSouth: FindObstacles = (
  guard,
  obstacles,
  roomSize,
) => {
  let newGuardLocation;
  for (let i = guard.row; i <= roomSize.height - 1; i++) {
    if (obstacles[i].includes(guard.col)) {
      newGuardLocation = {
        col: guard.col,
        row: i - 1,
        direction: "W",
      } as Guard;
      break;
    }
  }

  return newGuardLocation
    ? newGuardLocation
    : { row: roomSize.height, col: guard.col, direction: "X" };
};

export const findObstacleEast: FindObstacles = (guard, obstacles, roomSize) => {
  let newGuardLocation;
  for (let i = guard.col; i <= roomSize.width; i++) {
    if (obstacles[guard.row].includes(i)) {
      newGuardLocation = {
        col: i - 1,
        row: guard.row,
        direction: "S",
      } as Guard;
      break;
    }
  }

  return newGuardLocation
    ? newGuardLocation
    : { row: guard.row, col: roomSize.width, direction: "X" };
};

export const findObstacleWest: FindObstacles = (guard, obstacles) => {
  let newGuardLocation;
  for (let i = guard.col; i >= 0; i--) {
    if (obstacles[guard.row].includes(i)) {
      newGuardLocation = {
        col: i + 1,
        row: guard.row,
        direction: "N",
      } as Guard;
      break;
    }
  }

  return newGuardLocation
    ? newGuardLocation
    : { col: guard.row, row: 0, direction: "X" };
};
