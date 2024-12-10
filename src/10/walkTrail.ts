type WalkTrail = (
  matrix: number[][],
  trailHead: { row: number; col: number },
  lastStep: { lastStepHeight: number; cameFrom: string },
  parkSize: { width: number; height: number },
  pathTaken: string,
) => number;

export const walkTrail: WalkTrail = (
  matrix,
  { row, col },
  { lastStepHeight, cameFrom },
  parkSize,
  pathTaken,
) => {
  // trail is too steep
  if (cameFrom !== "X" && matrix[row][col] !== lastStepHeight + 1) {
    return 0;
  }

  // trail is complete. Wind back.
  if (lastStepHeight === 8 && matrix[row][col] === 9) {
    console.info(`[${row}, ${col}] is a valid trail - ${pathTaken}`);
    return 1;
  }

  // if we are here, we are in the middle of a viable trail.

  let viableTrails = 0;

  if (cameFrom !== "N" && row !== 0) {
    const north = walkTrail(
      matrix,
      { row: row - 1, col },
      { lastStepHeight: matrix[row][col], cameFrom: "S" },
      parkSize,
      `${pathTaken}, N`,
    );
    if (north) {
      viableTrails += north;
    }
  }

  if (cameFrom !== "E" && col !== parkSize.width) {
    const east = walkTrail(
      matrix,
      { row, col: col + 1 },
      { lastStepHeight: matrix[row][col], cameFrom: "W" },
      parkSize,
      `${pathTaken}, E`,
    );
    if (east) {
      viableTrails += east;
    }
  }

  if (cameFrom !== "S" && row !== parkSize.height) {
    const south = walkTrail(
      matrix,
      { row: row + 1, col },
      { lastStepHeight: matrix[row][col], cameFrom: "N" },
      parkSize,
      `${pathTaken}, S`,
    );
    if (south) {
      viableTrails += south;
    }
  }

  if (cameFrom !== "W" && col !== 0) {
    const west = walkTrail(
      matrix,
      { row, col: col - 1 },
      { lastStepHeight: matrix[row][col], cameFrom: "E" },
      parkSize,
      `${pathTaken}, W`,
    );
    if (west) {
      viableTrails += west;
    }
  }

  return viableTrails;
};
