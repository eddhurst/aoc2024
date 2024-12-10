import { parseInput } from "./parseInput";
import { example } from "./prompts/10.example";
import { walkTrail } from "./walkTrail";
import { small } from "./prompts/10.small";

const { matrix, trailHeads, trailTails, parkSize } = parseInput(example);

// console.info(matrix);
// console.info(trailHeads);

const validTrails = trailHeads.reduce((fullTrails, trailHead) => {
  // console.info(trailHead);

  const viableTrails = walkTrail(
    matrix,
    trailHead,
    { lastStepHeight: 0, cameFrom: "X" },
    parkSize,
    `X`,
  );

  console.info(
    `trailHead at [${trailHead.row},${trailHead.col}] has ${viableTrails} trails`,
  );

  return fullTrails + viableTrails;
}, 0);

console.info(validTrails);
