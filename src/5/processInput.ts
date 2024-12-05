import { splitByLine } from "../utils/splitByLine";

interface Input {
  ordering: string;
  pages: string;
}

type ProcessRules = ({ ordering }: Input) => Record<string, string[]>;

export const processRules: ProcessRules = ({ ordering }) => {
  const orders = splitByLine(ordering);

  return orders.reduce(
    (acc, order) => {
      const [first, last] = order.split("|");
      const _rules = { ...acc };

      if (_rules[first]) {
        _rules[first].push(last);
      } else {
        _rules[first] = [last];
      }
      return _rules;
    },
    {} as Record<string, string[]>,
  );
};

type ProcessPages = ({ pages }: Input) => string[][];

export const processPages: ProcessPages = ({ pages }) => {
  const lines = splitByLine(pages);
  return lines.map((x) => x.split(","));
};
