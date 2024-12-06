export const MAS = 0;

type CheckDirection = (
  wordSearch: string[][],
  row: number,
  col: number,
) => 0 | 1 | 2;

export const lookForMas: CheckDirection = (wordSearch, row, col) => {
  let numberOfMas = 0;

  if (
    wordSearch[row + 1] &&
    wordSearch[row - 1] &&
    wordSearch[row][col + 1] &&
    wordSearch[row][col - 1]
  ) {
    if (
      (wordSearch[row - 1][col - 1] === "M" &&
        wordSearch[row + 1][col + 1] === "S") ||
      (wordSearch[row - 1][col - 1] === "S" && // NW
        wordSearch[row + 1][col + 1] === "M") // SE
    ) {
      numberOfMas += 1;
    }

    if (
      (wordSearch[row - 1][col + 1] === "M" &&
        wordSearch[row + 1][col - 1] === "S") || // NE
      (wordSearch[row + 1][col - 1] === "M" &&
        wordSearch[row - 1][col + 1] === "S") // SW
    ) {
      numberOfMas += 1;
    }
  }

  return numberOfMas === 2;
};
