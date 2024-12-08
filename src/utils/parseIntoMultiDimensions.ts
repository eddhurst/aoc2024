export const parseIntoMultiDimensions: (lines: string[]) => string[][] = (
  lines,
) => {
  return lines.reduce((outerAcc, row) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col) => {
        return [...innerAcc, col];
      }, [] as string[]),
    ];
  }, [] as string[][]);
};
