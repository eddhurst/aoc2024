import { splitByLine } from "../utils/splitByLine";

export type TowelTree = { [key: string]: Record<string, unknown> };

type AddTowelStripes = (string: string, towels: TowelTree) => TowelTree;
const addTowelStripes: AddTowelStripes = (string, towels) => {
  if (!string) {
    return { "!": {} };
  }

  const firstLetter = string[0];

  if (!towels[firstLetter]) {
    towels = {
      ...towels,
      [firstLetter]: {},
    };
  }

  return {
    ...towels,
    [firstLetter]: {
      ...towels[firstLetter],
      ...addTowelStripes(string.substring(1), towels[firstLetter] as TowelTree),
    },
  };
};

type ParseInput = (input: string) => {
  towelTree: TowelTree;
  patterns: string[];
};
export const parseInput: ParseInput = (input) => {
  const [towelsString, patternsString] = input.split("\n\n");

  const towelTree = towelsString.split(", ").reduce((stripes, name) => {
    return addTowelStripes(name, stripes);
  }, {});

  const patterns = splitByLine(patternsString);

  return { towelTree, patterns };
};
