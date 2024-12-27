import { parseInput } from "./parseInput";
import { basic } from "./prompts/19.basic";
import { prompt } from "./prompts/19.prompt";

// Author: https://github.com/JustSamuel/AOC/blob/master/src/day19/index.ts
// Kudos to: https://www.reddit.com/user/CallMeBlob/

const canMakeDesign = (towels: string[], design: string): number => {
  const dp: number[] = new Array(design.length + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i <= design.length; i++) {
    // if this is available as a gap between towel patterns.
    if (dp[i]) {
      for (const towel of towels) {
        const len = towel.length;
        const substr = design.slice(i, i + len);
        // if string starts with towel, and adding the towel is shorter than the overall length
        if (i + len <= design.length && substr === towel) {
          // index becomes equal to total possible combinations up to this point.
          dp[i + len] += dp[i];
        }
      }
    }
  }

  // final total of accumulated possible combinations that make the initial design.
  return dp[design.length];
};

const { towels, patterns } = parseInput(basic);

let part1 = 0;
let part2 = 0;
patterns.forEach((design) => {
  const options = canMakeDesign(towels, design);
  if (options > 0) {
    part1++;
  }

  part2 += options;
});

console.info(`part 1: ${part1}`);
console.info(`part 2: ${part2}`);
