import { splitByLine } from "../utils/splitByLine";

export const process = (sample: string) => {
  const lines = splitByLine(sample);

  const list1 = [];
  const similarities = {};

  lines.forEach((line) => {
    return line.split(/\s+/).forEach((x, index) => {
      if (index === 0) {
        list1.push(parseInt(x, 10));
      } else {
        if (similarities.hasOwnProperty(x)) {
          similarities[x] = similarities[x] + 1;
        } else {
          similarities[x] = 1;
        }
      }
    });
  });

  return { list: list1, similarities };
};
