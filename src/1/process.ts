import {splitByLine} from "../utils/splitByLine";

export const process = (sample: string) => {
  const lines = splitByLine(sample);

  const list1 = []
  const list2 = {};

  lines.forEach(line => {
    return line.split(/\s+/).forEach((x, index) => {
      if (index === 0) {
        list1.push(parseInt(x, 10));
      } else {
        if (list2.hasOwnProperty(x)) {
          list2[x] = list2[x] + 1;
        } else {
          list2[x] = 1;
        }
      }
    })
  });

  // list1.sort((a, b) => a - b);

  return {list: list1, similarities: list2};
}