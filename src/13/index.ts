import { parseInput } from "./parseInput";
import { basic } from "./prompts/13.basic";
import { prompt } from "./prompts/13.prompt";

const machines = parseInput(prompt);

const payToPlay = machines.reduce((totalCost, machine) => {
  const [xA, yA] = machine.buttonA;
  const [xB, yB] = machine.buttonB;
  const [prizeX, prizeY] = machine.prize;

  const winners = [];

  for (let pushB = Math.round(prizeY / xB); pushB >= 0; pushB--) {
    if (pushB >= 100) {
      continue;
    }

    const pushA = (prizeY - pushB * yB) / yA;

    if (!Number.isInteger(pushA)) {
      continue;
    }

    if (
      pushA * xA + pushB * xB === prizeX &&
      pushA * yA + pushB * yB === prizeY
    ) {
      winners.push({ pushA: pushA, pushB, cost: pushA * 3 + pushB });
    }
  }

  for (let pushA = Math.round(prizeY / xA); pushA >= 0; pushA--) {
    if (pushA >= 100) {
      continue;
    }

    const pushB = (prizeY - pushA * yA) / yB;

    if (!Number.isInteger(pushB)) {
      continue;
    }

    if (
      pushA * xA + pushB * xB === prizeX &&
      pushA * yA + pushB * yB === prizeY
    ) {
      winners.push({ pushA: pushA, pushB, cost: pushA * 3 + pushB });
    }
  }

  if (winners.length === 0) {
    return totalCost;
  }

  console.info(winners);

  const { cost } = winners.reduce(
    (cheapest, winner) => {
      if (!cheapest.cost || winner.cost < cheapest.cost) {
        return winner;
      }

      return cheapest;
    },
    {} as { pushA: number; pushB: number; cost: number },
  );

  return totalCost + cost;
}, 0);

// console.info(winners);
console.info(payToPlay);
