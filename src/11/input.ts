import { parseInput } from "./parseInput";
import { basic } from "./prompts/11.basic";
import { logResult } from "../utils/log";
import { prompt } from "./prompts/11.prompt";

const stones = parseInput(prompt);

type Blink = (stone: number, loop: number, stopAt: number) => number;

const seenBefore = {} as Record<string, Record<string, number>>;

const blink: Blink = (stone: number, loop: number, stopAt: number) => {
  if (loop === stopAt) {
    return 1;
  }

  const string = stone.toString();
  if (seenBefore[string] && seenBefore[string][loop]) {
    return seenBefore[string][loop];
  }

  if (stone === 0) {
    const result = blink(1, loop + 1, stopAt);

    seenBefore["0"] = {
      ...(seenBefore["0"] || {}),
      ...{ [loop.toString()]: result },
    };

    return result;
  }

  if (stone.toString().length % 2 === 0) {
    const string = stone.toString();

    const lhsStone = parseInt(string.substring(0, string.length / 2));
    const rhsStone = parseInt(string.substring(string.length / 2));

    const lhsResult = blink(lhsStone, loop + 1, stopAt);
    const rhsResult = blink(rhsStone, loop + 1, stopAt);

    seenBefore[string] = {
      ...(seenBefore[string] || {}),
      ...{ [loop.toString()]: lhsResult + rhsResult },
    };

    return lhsResult + rhsResult;
  }

  const result = blink(stone * 2024, loop + 1, stopAt);

  seenBefore[stone.toString()] = {
    ...(seenBefore[stone.toString()] || {}),
    ...{ [loop.toString()]: result },
  };
  return result;
};

logResult(
  stones.reduce((totalStones, stone) => {
    return totalStones + blink(stone, 0, 75);
  }, 0),
);
