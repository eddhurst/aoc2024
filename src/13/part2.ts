import { parseInput } from "./parseInput";
import { prompt } from "./prompts/13.prompt";
import { basic } from "./prompts/13.basic";
import { findLowestCommonMultiple } from "../utils/lowestCommonMultiple";
import { logResult } from "../utils/log";

const machines = parseInput(prompt, true);
const DEBUG = false;

const payToWin = machines.reduce((totalCost, machine) => {
  const [aX, aY] = machine.buttonA;
  const [bX, bY] = machine.buttonB;
  const [prizeX, prizeY] = machine.prize;

  const { gcd, lcm } = findLowestCommonMultiple(bX, bY);
  const top = lcm / bX;
  const bottom = lcm / bY;
  const solveForA =
    Math.abs(prizeY * bottom - prizeX * top) / Math.abs(aY * bottom - aX * top); // We don't know which is bigger.

  const aThusB = (prizeY - solveForA * aY) / bY;

  if (!Number.isInteger(solveForA) || !Number.isInteger(aThusB)) {
    return totalCost;
  }

  if (!DEBUG) {
    return totalCost + 3 * solveForA + aThusB;
  }

  console.info(machine);

  console.info(`GCD (b): ${bX}, ${bY}): ${gcd}`);
  console.info(`LCM (b): ${bX}, ${bY}): ${lcm}`);

  console.info("---- Equations ----");

  console.info(`${aX}a + ${bX}b = ${prizeX}`);
  console.info(`${aY}a + ${bY}b = ${prizeY}`);
  console.info(`${aX * top}a + ${bX * top}b = ${prizeX * top}`);
  console.info(`${aY * bottom}a + ${bY * bottom}b = ${prizeY * bottom}`);
  console.info(
    `${Math.abs(aY * bottom - aX * top)}a = ${Math.abs(prizeY * bottom - prizeX * top)}`,
  );
  console.info("---- Solution ----");
  console.info(`a = ${solveForA}, b = ${aThusB}`);

  return totalCost + 3 * solveForA + aThusB;
}, 0);

logResult(payToWin);
