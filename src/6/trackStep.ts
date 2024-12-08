import { Guard, Steps } from "./types";

type TrackStep = (
  steps: Steps,
  row: number,
  col: number,
  direction: string,
) => void;

export const trackStep: TrackStep = (steps, row, col, direction) => {
  if (steps[row][col]) {
    steps[row][col].direction.push(direction);
  } else {
    steps[row][col] = { direction: [direction] };
  }
};

type CheckIfInLoop = (
  steps: Steps,
  nextPosition: Guard,
  injectedObstacle?: number[],
) => boolean;

export const checkIfInLoop: CheckIfInLoop = (steps, nextPosition) => {
  return (
    nextPosition.direction !== "X" &&
    steps[nextPosition.row][nextPosition.col] &&
    steps[nextPosition.row][nextPosition.col].direction.includes(
      nextPosition.direction,
    )
  );
};
