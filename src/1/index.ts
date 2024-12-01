import { processInput } from "./processInput";
import { sample } from "./prompts/1.sample";
import { prompt } from "./prompts/1.prompt";
import { logResult } from "../utils/log";
import { addProgressBar, progressComplete } from "../utils/progressBar";

const run = (input: string) => {
  const { list, similarities } = processInput(input);

  const calculatingBar = addProgressBar(list.length, "Calculating Results");

  return list.reduce((acc, item) => {
    calculatingBar.increment();
    return acc + item * (similarities[item] || 0);
  }, 0);
};

const result = run(prompt);

progressComplete();

logResult(result);
