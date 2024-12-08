import { small } from "./prompts/8.small";
import { basic } from "./prompts/8.basic";
import { prompt } from "./prompts/8.prompt";
import { parseInput } from "./parseInput";
import { checkCollinearity } from "./checkCollinearity";

const { matrix, citySize, antenna } = parseInput(prompt);

console.info(antenna);

const potentialAntiNodes = {} as Record<string, Set<number>>;
for (let i = 0; i < citySize.height; i++) {
  potentialAntiNodes[i] = new Set();
}

const foundAntiNodes = Object.keys(antenna).reduce(
  (acc, location) => {
    for (let min = 0; min < antenna[location].length; min++) {
      for (let max = min + 1; max < antenna[location].length; max++) {
        const foundAntiNodes = checkCollinearity(
          antenna[location][min],
          antenna[location][max],
          citySize,
        );

        console.info(foundAntiNodes);

        foundAntiNodes.forEach((x) => {
          acc[x.row].add(x.col);
        });

        // add the antennae into the mix
        acc[antenna[location][min].row].add(antenna[location][min].col);
        acc[antenna[location][max].row].add(antenna[location][max].col);
      }
    }

    return acc;
  },
  potentialAntiNodes as { [p: string]: Set<number> },
);

// console.info(foundAntiNodes);

const totalNodes = Object.keys(foundAntiNodes).reduce((acc, nodes) => {
  return (acc += foundAntiNodes[nodes].size);
}, 0);

console.info(totalNodes);
