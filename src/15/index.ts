import { parseInput } from "./parseInput";
import { basic } from "./prompts/15.basic";

const { matrix, instructions, player } = parseInput(basic);

console.info(player);
