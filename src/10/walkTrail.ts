type WalkTrail = (
  matrix: number[][],
  trailHead: { row: number; col: number },
  lastStep: {
    lastStepHeight: number;
    cameFrom: string;
    prevRow: number;
    prevCol: number;
  },
  parkSize: { width: number; height: number },
  pathTaken: string,
) => string[];

export const walkTrail: WalkTrail = (
  matrix,
  { row, col },
  { lastStepHeight, cameFrom, prevRow, prevCol },
  parkSize,
  pathTaken,
) => {
  // trail is too steep
  if (cameFrom !== "X" && matrix[row][col] !== lastStepHeight + 1) {
    return [`[${prevRow},${prevCol}] = ${lastStepHeight}`];
  }

  // trail is complete. Wind back.
  if (lastStepHeight === 8 && matrix[row][col] === 9) {
    return [`[${row},${col}] = ${matrix[row][col]}`];
  }

  // if we are here, we are in the middle of a viable trail.

  const viableTrails = [] as string[];

  if (cameFrom !== "N" && row !== 0) {
    walkTrail(
      matrix,
      { row: row - 1, col },
      {
        lastStepHeight: matrix[row][col],
        cameFrom: "S",
        prevRow: row,
        prevCol: col,
      },
      parkSize,
      `${pathTaken}, N`,
    ).forEach((x) => {
      if (x[x.length - 1] === "9") {
        viableTrails.push(x);
      }
    });
  }

  if (cameFrom !== "E" && col !== parkSize.width) {
    walkTrail(
      matrix,
      { row, col: col + 1 },
      {
        lastStepHeight: matrix[row][col],
        cameFrom: "W",
        prevRow: row,
        prevCol: col,
      },
      parkSize,
      `${pathTaken}, E`,
    ).forEach((x) => {
      if (x[x.length - 1] === "9") {
        viableTrails.push(x);
      }
    });
  }

  if (cameFrom !== "S" && row !== parkSize.height) {
    walkTrail(
      matrix,
      { row: row + 1, col },
      {
        lastStepHeight: matrix[row][col],
        cameFrom: "N",
        prevRow: row,
        prevCol: col,
      },
      parkSize,
      `${pathTaken}, S`,
    ).forEach((x) => {
      if (x[x.length - 1] === "9") {
        viableTrails.push(x);
      }
    });
  }

  if (cameFrom !== "W" && col !== 0) {
    walkTrail(
      matrix,
      { row, col: col - 1 },
      {
        lastStepHeight: matrix[row][col],
        cameFrom: "E",
        prevRow: row,
        prevCol: col,
      },
      parkSize,
      `${pathTaken}, W`,
    ).forEach((x) => {
      if (x[x.length - 1] === "9") {
        viableTrails.push(x);
      }
    });
  }

  return viableTrails;
};
