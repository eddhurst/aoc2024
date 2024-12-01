import { splitByLine } from "../utils/splitByLine";
import { addProgressBar } from "../utils/progressBar";
import esMain from "es-main";
import { logTest } from "../utils/log";

export const processInput = (sample: string) => {
  const lines = splitByLine(sample);

  const processingBar = addProgressBar(lines.length, "Processing Inputs");

  const list1 = [] as number[];
  const similarities = {} as Record<string, number>;

  lines.forEach((line) => {
    processingBar.increment();

    return line.split(/\s+/).forEach((x, index) => {
      if (index === 0) {
        list1.push(parseInt(x, 10));
      } else {
        if (Object.hasOwn(similarities, x)) {
          similarities[x] = similarities[x] + 1;
        } else {
          similarities[x] = 1;
        }
      }
    });
  });

  return { list: list1, similarities };
};

// If running this file directly, run test input.
if (esMain(import.meta)) {
  logTest(processInput("1 2\n3 4\n5 6\n\n"));
}
