import esMain from "es-main";
import { splitByLine } from "../utils/splitByLine";
import { sample } from "./prompts/2.sample";

type ProcessInput = (sample: string) => number[][];

export const processInput: ProcessInput = (sample) => {
  const lines = splitByLine(sample);
  return lines.map((line) => line.split(/\s/).map((x) => parseInt(x)));
};

// If running this file directly, run test input.
if (esMain(import.meta)) {
  console.info(processInput(sample));
}
