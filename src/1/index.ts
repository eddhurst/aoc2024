import { process } from "./process";
import { sample } from "./1.sample";
import { prompt } from "./1.prompt";

const run = (input: string) => {
  const { list, similarities } = process(input);

  return list.reduce((acc, item) => {
    return acc + parseInt(item, 10) * (similarities[item] || 0);
  }, 0);
};

console.info(run(prompt));
