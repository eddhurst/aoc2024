import { prompt } from "./prompts/25.prompt";
import { parseInput } from "./parseInput";

const { keys, locks } = parseInput(prompt);

const totalValidLocks = locks.reduce((worksWithLock, { lock }) => {
  const totalValidKeys = keys.reduce((worksWithKeys, { key }) => {
    let invalidKey = false;
    for (let i = 0; i < key.length; i++) {
      if (key[i] + lock[i] <= 5) {
        continue;
      }

      invalidKey = true;
      break;
    }

    if (invalidKey) {
      return worksWithKeys;
    }

    return worksWithKeys + 1;
  }, 0);

  return worksWithLock + totalValidKeys;
}, 0);

console.info(totalValidLocks);
