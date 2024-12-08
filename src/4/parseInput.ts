import { splitByLine } from "../utils/splitByLine";
import { parseIntoMultiDimensions } from "../utils/parseIntoMultiDimensions";

export const parseInput = (input: string) => {
  const lines = splitByLine(input);
  return parseIntoMultiDimensions(lines);
};
