import { parseInput } from "./parseInput";
import { basic } from "./prompts/7.basic";
import { prompt } from "./prompts/7.prompt";

type Calculate = (p1: {
  result: number;
  acc: number;
  nextNumbers: number[];
  operations: string;
}) => boolean;

const calculate: Calculate = ({ result, acc, nextNumbers, operations }) => {
  if (nextNumbers.length === 0) {
    if (result === acc) {
      console.info(`${operations} = ${result}`);
    }
    return acc === result;
  }

  const _nextNumbers = nextNumbers.toSpliced(0, 1);
  const add = acc + nextNumbers[0];
  const mul = acc * nextNumbers[0];
  const concat = parseInt(`${acc}${nextNumbers[0]}`);

  return (
    calculate({
      result,
      acc: add,
      nextNumbers: _nextNumbers,
      operations: `${operations} + ${nextNumbers[0]}`,
    }) ||
    calculate({
      result,
      acc: mul,
      nextNumbers: _nextNumbers,
      operations: `${operations} * ${nextNumbers[0]}`,
    }) ||
    calculate({
      result,
      acc: concat,
      nextNumbers: _nextNumbers,
      operations: `${operations} || ${nextNumbers[0]}`,
    })
  );
};

const data = parseInput(basic);

const result = data.reduce((validCount, line) => {
  const result = calculate({
    result: line.result,
    acc: line.numbers[0],
    nextNumbers: line.numbers.toSpliced(0, 1),
    operations: line.numbers[0].toString(),
  });

  if (result) {
    return validCount + line.result;
  }

  return validCount;
}, 0);

console.info(result);
