export const parseIntoMultiDimensions: (lines: string[]) => string[][] = (
  lines,
) => {
  return lines.reduce((outerAcc, row, rowIndex) => {
    return [
      ...outerAcc,
      row.split("").reduce((innerAcc, col, colIndex) => {
        if (col === '.') {
          console.info(`DOT FOUND, [${rowIndex}, ${colIndex}]`)
        }

        return [...innerAcc, col];
      }, [] as string[]),
    ];
  }, [] as string[][]);
};
