import { parseInput, TowelTree } from "./parseInput";
import { prompt } from "./prompts/19.prompt";

const { towelTree, patterns } = parseInput(prompt);

type ExistsInTree = (pattern: string, towels: TowelTree) => string;
const existsInTree: ExistsInTree = (pattern, towels) => {
  if (!pattern) {
    return true;
  }

  const firstLetter = pattern[0];

  if (towels[firstLetter]) {
    return existsInTree(pattern.substring(1), towels[firstLetter] as TowelTree);
  }

  return pattern;
};

const validPatterns = patterns.reduce((validPatterns, pattern) => {
  let isPatternValid = true;
  let patternPartial = pattern;

  while (isPatternValid) {
    patternPartial = existsInTree(patternPartial, towelTree);

    if (patternPartial === pattern) {
      isPatternValid = false;
    }
  }

  return (validPatterns += isPatternValid ? 1 : 0);
}, 0);

console.info(validPatterns);
