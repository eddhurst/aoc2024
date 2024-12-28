import { parseInput } from "./parseInput";
import { prompt } from "./prompts/23.prompt";
import { basic } from "./prompts/23.basic";

console.time("processing");
const network = parseInput(prompt);
console.timeEnd("processing");

console.time("part2");

const potential = new Set<string>();
Object.keys(network).forEach((primary) => {
  const primaries = network[primary];

  // find the largest network for each computer
  let bestConnection = [] as string[];
  for (let x = 0; x < primaries.length; x++) {
    const secondary = primaries[x];
    const secondaries = network[secondary];

    if (secondary === primary) {
      continue;
    }

    for (let y = 0; y < secondaries.length; y++) {
      // filter out connections that aren't shared
      const connection = secondaries.filter((x) => primaries.includes(x));

      if (connection.length > bestConnection.length) {
        bestConnection = connection.sort();
      }
    }
  }

  potential.add(bestConnection.join(","));
});

const potentialLevel2 = new Set<string>();

Array.from(potential).forEach((maybe) => {
  const connections = maybe.split(",");

  let contains;
  for (let outer = 0; outer < connections.length; outer++) {
    const check = connections[outer];
    const subNetwork = network[check];

    contains = 0; // reset for each node
    for (let inner = 0; inner < subNetwork.length; inner++) {
      const validate = subNetwork[inner];

      // outer: a: b, c, d  -  inner: b: a, c, d
      // validate that each outer connection exists within the inner.
      for (let lookback = 0; lookback < connections.length; lookback++) {
        if (validate === connections[lookback]) {
          contains += 1;
          break;
        }
      }

      if (contains === connections.length) {
        break; // if we contain the full set of nodes, skip any remaining
      }
    }

    if (contains !== connections.length) {
      break; // if we are missing any nodes, fail.
    }
  }

  if (contains === connections.length) {
    potentialLevel2.add(maybe);
  }
});

// find longest out of potential winners
const winner = Array.from(potentialLevel2).reduce((acc, x) => {
  if (x.length > acc.length) {
    return x;
  }

  return acc;
}, "");

console.timeEnd("part2");

console.info(`winner: ${winner}`);
