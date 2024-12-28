import { prompt } from "./prompts/23.prompt";
import { parseInput } from "./parseInput";
import { basic } from "./prompts/23.basic";

const network = parseInput(prompt);

const mockNetwork = { co: true };

console.time("part1");

const matches = new Set();

const result = Object.keys(network).reduce((acc, terminal) => {
  let newAcc = acc;
  const primary = terminal;
  const primaries = network[terminal];

  for (let x = 0; x < primaries.length; x++) {
    const secondary = primaries[x];
    const secondaries = network[secondary];

    let exists = 0;

    for (let y = 0; y < secondaries.length; y++) {
      const tertiary = secondaries[y];
      const tertiaries = network[secondaries[y]];

      // no need to look back at the tree
      if (
        secondary === primary ||
        tertiary === primary ||
        secondary === tertiary
      ) {
        continue;
      }

      for (let z = 0; z < tertiaries.length; z++) {
        const validation = tertiaries[z];

        if (validation === primary || validation === secondary) {
          exists += 1;
        }

        // console.info(
        //   primary,
        //   primaries,
        //   secondary,
        //   secondaries,
        //   tertiary,
        //   tertiaries,
        //   validation,
        //   exists,
        // );

        if (exists === 2) {
          const match = [primary, secondary, tertiary].sort().join(",");

          if (matches.has(match)) {
            break;
          }

          if (
            primary[0] === "t" ||
            secondary[0] === "t" ||
            tertiary[0] === "t"
          ) {
            newAcc += 1;
            matches.add(match);
          }

          // newAcc += 1;

          break;
        }
      }

      exists = 0;
    }
  }

  return newAcc;
}, 0);

// console.info(result);

console.timeEnd("part1");

console.info(Array.from(matches).sort().join("\n"));

console.info(matches.size);
