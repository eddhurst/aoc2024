import { prompt } from "./prompts/25.prompt";
import { splitByLine } from "../utils/splitByLine";

type ParseInput = (input: string) => {
  keys: { keySchematic: string[]; key: number[] }[];
  locks: { lockSchematic: string[]; lock: number[] }[];
};
export const parseInput: ParseInput = (input: string) => {
  const groups = input.split("\n\n");

  return groups.reduce(
    (acc, group) => {
      const schematic = group.split("\n");

      if (schematic[0] === "#####") {
        const lock = [];
        for (let x = 0; x < schematic[0].length; x++) {
          for (let y = 0; y <= 6; y++) {
            if (schematic[y][x] === "#") {
              continue;
            }

            lock.push(y - 1);
            break;
          }
        }

        return {
          ...acc,
          locks: [...acc.locks, { lockSchematic: schematic, lock }],
        };
      }

      if (schematic[6] === "#####") {
        const key = [];
        for (let x = 0; x < schematic[0].length; x++) {
          for (let y = 6; y >= 0; y--) {
            if (schematic[y][x] === "#") {
              continue;
            }

            key.push(5 - y);
            break;
          }
        }

        return {
          ...acc,
          keys: [...acc.keys, { keySchematic: schematic, key }],
        };
      }

      return acc;
    },
    { keys: [], locks: [] } as {
      keys: { keySchematic: string[]; key: number[] }[];
      locks: { lockSchematic: string[]; lock: number[] }[];
    },
  );
};

const { keys, locks } = parseInput(prompt);
