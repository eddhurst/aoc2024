import { parseInput } from "./parseInput";
import { basic } from "./prompts/19.basic";
import { prompt } from "./prompts/19.prompt";

const { towels, patterns } = parseInput(basic);

const seenBefore = new Set();

// Solution: This does theoretically work - but times out on big patterns that will never match.

type ValidatePattern = (pattern: string, towel: string) => boolean;
const validatePattern: ValidatePattern = (pattern, towel) => {
  if (pattern[0] !== towel[0]) {
    return false;
  }

  if (seenBefore.has(pattern)) {
    return true;
  }

  if (towel === pattern) {
    seenBefore.add(pattern);
    return true;
  }

  if (pattern.startsWith(towel)) {
    const slicedPattern = pattern.substring(towel.length);

    if (seenBefore.has(slicedPattern)) {
      return true;
    }

    let isValid = false;
    for (let i = 0; i < towels.length; i++) {
      const towel = towels[i];
      const nestedValid = validatePattern(slicedPattern, towel);
      if (nestedValid) {
        seenBefore.add(slicedPattern);
        isValid = true;
        break;
      }
    }

    return isValid;
  }

  return false;
};

let completeValidPatterns = 0;

patterns.forEach((pattern, index) => {
  let isValidPattern = false;
  for (let i = 0; i < towels.length; i++) {
    const towel = towels[i];

    const isValid = validatePattern(pattern, towel);

    if (isValid) {
      isValidPattern = true;
      break;
    }
  }

  if (isValidPattern) {
    completeValidPatterns += 1;
  }

  console.info(`${index}: ${pattern} - ${isValidPattern}`);
});

console.info(completeValidPatterns);
