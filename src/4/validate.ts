type CheckDirection = (
  wordSearch: string[][],
  row: number,
  col: number,
) => boolean;

export const checkNorth: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row - 3] &&
    wordSearch[row - 1][col] === "M" &&
    wordSearch[row - 2][col] === "A" &&
    wordSearch[row - 3][col] === "S"
  );
};

export const checkNorthWest: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row - 3] &&
    wordSearch[row - 3][col - 3] &&
    wordSearch[row - 1][col - 1] === "M" &&
    wordSearch[row - 2][col - 2] === "A" &&
    wordSearch[row - 3][col - 3] === "S"
  );
};

export const checkNorthEast: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row - 3] &&
    wordSearch[row - 3][col + 3] &&
    wordSearch[row - 1][col + 1] === "M" &&
    wordSearch[row - 2][col + 2] === "A" &&
    wordSearch[row - 3][col + 3] === "S"
  );
};

export const checkSouth: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row + 3] &&
    wordSearch[row + 1][col] === "M" &&
    wordSearch[row + 2][col] === "A" &&
    wordSearch[row + 3][col] === "S"
  );
};

export const checkSouthWest: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row + 3] &&
    wordSearch[row + 3][col - 3] &&
    wordSearch[row + 1][col - 1] === "M" &&
    wordSearch[row + 2][col - 2] === "A" &&
    wordSearch[row + 3][col - 3] === "S"
  );
};

export const checkSouthEast: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row + 3] &&
    wordSearch[row + 3][col + 3] &&
    wordSearch[row + 1][col + 1] === "M" &&
    wordSearch[row + 2][col + 2] === "A" &&
    wordSearch[row + 3][col + 3] === "S"
  );
};

export const checkEast: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row][col + 3] &&
    wordSearch[row][col + 1] === "M" &&
    wordSearch[row][col + 2] === "A" &&
    wordSearch[row][col + 3] === "S"
  );
};

export const checkWest: CheckDirection = (wordSearch, row, col) => {
  return (
    wordSearch[row][col - 3] &&
    wordSearch[row][col - 1] === "M" &&
    wordSearch[row][col - 2] === "A" &&
    wordSearch[row][col - 3] === "S"
  );
};

export const directions = {
  N: 0,
  E: 0,
  S: 0,
  W: 0,
  NE: 0,
  NW: 0,
  SE: 0,
  SW: 0,
};

export const lookForXMAS: (
  wordSearch: string[][],
  row: number,
  col: number,
) => void = (wordSearch, row, col) => {
  if (checkNorth(wordSearch, row, col)) {
    console.info("NORTH", row, col);
    directions.N += 1;
  }
  if (checkNorthEast(wordSearch, row, col)) {
    console.info("NORTHEAST", row, col);
    directions.NE += 1;
  }
  if (checkNorthWest(wordSearch, row, col)) {
    console.info("NORTHWEST", row, col);
    directions.NW += 1;
  }
  if (checkEast(wordSearch, row, col)) {
    console.info("EAST", row, col);
    directions.E += 1;
  }
  if (checkSouth(wordSearch, row, col)) {
    console.info("SOUTH", row, col);
    directions.S += 1;
  }
  if (checkSouthEast(wordSearch, row, col)) {
    console.info("SOUTHEAST", row, col);
    directions.SE += 1;
  }
  if (checkSouthWest(wordSearch, row, col)) {
    console.info("SOUTHWEST", row, col);
    directions.SW += 1;
  }
  if (checkWest(wordSearch, row, col)) {
    console.info("WEST", row, col);
    directions.W += 1;
  }
};
