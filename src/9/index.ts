import { defrag } from "./defrag";
import { buildFileSystem, parseInput } from "./parseInput";
import { prompt } from "./prompts/9.prompt";
import { basic } from "./prompts/9.basic";
import { logResult } from "../utils/log";

const matches = parseInput(prompt);
const files = Array.from(matches);

const hardDrive = buildFileSystem(files);
const defraggedHardDrive = defrag(hardDrive);

console.info("Calculating");

const result = Object.keys(defraggedHardDrive).reduce((acc, x, index) => {
  if (defraggedHardDrive[x].file === -1) {
    return acc;
  }

  return acc + defraggedHardDrive[x].file * index;
}, 0);

logResult(result.toString());
