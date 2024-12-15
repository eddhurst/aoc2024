import { parseInput } from "./parseInput";
import { basic } from "./prompts/13.basic";
import { prompt } from "./prompts/13.prompt";

const machines = parseInput(prompt, false);

const payToPlay = [machines[1]].reduce((totalCost, machine) => {
  console.info(machine);

  const [xA, yA] = machine.buttonA;
  const [xB, yB] = machine.buttonB;
  const [prizeX, prizeY] = machine.prize;

  let winner;

  console.info(Math.round(prizeY / xB));

  for (let pushB = Math.round(prizeY / xB); pushB >= 0 && !winner; pushB--) {
    const pushA = (prizeY - pushB * yB) / yA;

    if (!Number.isInteger(pushA)) {
      continue;
    }

    if (
      pushA * xA + pushB * xB === prizeX &&
      pushA * yA + pushB * yB === prizeY
    ) {
      winner = { pushA: pushA, pushB, cost: pushA * 3 + pushB };
    }
  }

  if (!winner) {
    for (let pushA = Math.round(prizeY / xA); pushA >= 0 && !winner; pushA--) {
      const pushB = (prizeY - pushA * yA) / yB;

      if (!Number.isInteger(pushB)) {
        continue;
      }

      if (
        pushA * xA + pushB * xB === prizeX &&
        pushA * yA + pushB * yB === prizeY
      ) {
        winner = { pushA: pushA, pushB, cost: pushA * 3 + pushB };
      }
    }
  }

  if (!winner) {
    return totalCost;
  }

  console.info(winner);

  return totalCost + winner.cost;
}, 0);

// console.info(winners);
console.info(payToPlay);
