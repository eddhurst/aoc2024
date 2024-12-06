import { basic } from "./prompts/4.basic";
import { sample } from "./prompts/4.sample";
import { prompt } from "./prompts/4.prompt";
import { parseInput } from "./parseInput";
import { directions, lookForXMAS } from "./validate";
import { lookForMas } from "./validateMas";

const wordSearch = parseInput(prompt);

let numberOfMas = 0;

for (let row = 0; row < wordSearch.length; row++) {
  for (let col = 0; col < wordSearch[row].length; col++) {
    if (wordSearch[row][col] === "A") {
      // lookForXMAS(wordSearch, row, col);
      if (lookForMas(wordSearch, row, col)) {
        numberOfMas++;
      }
    }
  }
}

console.info(numberOfMas);
