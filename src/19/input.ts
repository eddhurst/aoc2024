import { parseInput, TowelTree } from "./parseInput";
import { prompt } from "./prompts/19.prompt";
import { basic } from "./prompts/19.basic";

const { towelTree, patterns } = parseInput(prompt);

const PATTERN_TERMINATOR = "!";
const PATTERN_REJECTED = "EOL";

/**
 This solution could never reconcile the final loop not being available and would always return the substring,
 which would throw the rest of the calculations out of whack.
 However, this is fast, and if I could work that out it would be ideal, although pt2 would be a different puzzle entirely.
 */

type ExistsInTree = (pattern: string, towels: TowelTree) => string;
const existsInTree: ExistsInTree = (pattern, towels) => {
  // if no more pattern - either succeed or fail.
  if (!pattern) {
    if (Object.hasOwn(towels, PATTERN_TERMINATOR)) {
      return PATTERN_TERMINATOR;
    } else {
      return PATTERN_REJECTED;
    }
  }

  const firstLetter = pattern[0];

  if (towels[firstLetter]) {
    const remainingPattern = pattern.substring(1);

    const continuePattern = existsInTree(
      remainingPattern,
      towels[firstLetter] as TowelTree,
    );

    if (continuePattern === PATTERN_REJECTED) {
      if (Object.hasOwn(towels[firstLetter], PATTERN_TERMINATOR)) {
        return remainingPattern; // if current layer can be terminator, return here
      } else {
        return PATTERN_REJECTED; // else push back one layer
      }
    }

    return continuePattern;
  }

  return pattern;

  // look for first letter, then check sub-trees for remaining.
  // if success - return success
  // if fail check tree for terminator
  // if exists, return pattern up to terminator
  // if fail, return fail.
};

const validPatterns = patterns.reduce((validPatterns, pattern) => {
  let isPatternValid = true;
  let patternPartial = pattern;

  console.info("=========");
  console.info(`Pattern: ${pattern}`);

  while (isPatternValid) {
    const startingPattern = patternPartial;

    patternPartial = existsInTree(patternPartial, towelTree);

    if (patternPartial === PATTERN_TERMINATOR) {
      isPatternValid = true;
      break;
    }

    if (
      patternPartial === PATTERN_REJECTED ||
      startingPattern === patternPartial
    ) {
      isPatternValid = false;
      break;
    }
  }

  console.info(pattern, isPatternValid);

  return (validPatterns += isPatternValid ? 1 : 0);
}, 0);

console.info(validPatterns);
