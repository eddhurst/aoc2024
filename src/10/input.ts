import { parseInput } from "./parseInput";
import { example } from "./prompts/10.example";
import { walkTrail } from "./walkTrail";
import { small } from "./prompts/10.small";
import { prompt } from "./prompts/10.prompt";

const { matrix, trailHeads, trailTails, parkSize } = parseInput(prompt);

// console.info(matrix);
// console.info(trailHeads);

const validTrails = trailHeads.reduce((fullTrails, trailHead) => {
  // console.info(trailHead);

  const viableTrails = walkTrail(
    matrix,
    trailHead,
    {
      lastStepHeight: 0,
      cameFrom: "X",
      prevCol: trailHead.col,
      prevRow: trailHead.row,
    },
    parkSize,
    `X`,
  );

  // let count = 0;
  // viableTrails.forEach((x) => {
  //   if (x[x.length - 1] === "9") {
  //     count++;
  //   }
  // });

  // console.info(
  //   `trailHead at [${trailHead.row},${trailHead.col}] has ${viableTrails} trails`,
  // );

  return fullTrails + viableTrails.length;
}, 0);

console.info(validTrails);
