import { logResult } from "../utils/log";
import { parseInput } from "./parseInput";
import { parseRanges } from "./parseRanges";

export const VALID = "valid";
export const INVALID = "invalid";

const run = (filename: string) => {
  const instructions = parseInput(`./prompts/${filename}`);
  const commandRange = parseRanges(instructions);
  const parsed = [...instructions.matchAll(/mul\(\d+,\d+\)/g)];

  return parsed.reduce((acc, matched) => {
    const [match] = matched;
    const { index } = matched;

    let matchStatus = VALID;

    for (let i = 0; i < commandRange.length; i++) {
      if (index < commandRange[i].index) {
        break;
      }

      matchStatus = commandRange[i].status;
    }

    if (matchStatus === INVALID) {
      return acc;
    }

    const mul = match.replace("mul(", "").replace(")", "").split(",");
    return acc + BigInt(mul[0]) * BigInt(mul[1]);
  }, BigInt(0));
};

const SAMPLE = "3.sample.txt";
const SAMPLE2 = "3.sample2.txt";
const PROMPT = "3.prompt.txt";

logResult(run(PROMPT).toString());
