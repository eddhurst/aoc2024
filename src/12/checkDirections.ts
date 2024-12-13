type CheckDirections = (
  plot: { row: number; col: number },
  lines: string[],
) => { fencePanels: number; contiguous: string[] };

export const checkDirections: CheckDirections = ({ row, col }, lines) => {
  let fencePanels = 0;

  const vegetable = lines[row][col];
  const allotmentSize = { height: lines.length, width: lines[0].length };

  const contiguous = [];

  // For each group, read all the fencepost data, and multiply by length.
  // North
  if (row !== 0) {
    if (lines[row - 1][col] !== vegetable) {
      fencePanels += 1;
    } else {
      contiguous.push(`${row - 1},${col}`);
    }
  } else {
    fencePanels += 1;
  }

  // South
  if (row !== allotmentSize.height - 1) {
    if (lines[row + 1][col] !== vegetable) {
      fencePanels += 1;
    } else {
      contiguous.push(`${row + 1},${col}`);
    }
  } else {
    fencePanels += 1;
  }

  // East
  if (col !== allotmentSize.width - 1) {
    if (lines[row][col + 1] !== vegetable) {
      fencePanels += 1;
    } else {
      contiguous.push(`${row},${col + 1}`);
    }
  } else {
    fencePanels += 1;
  }

  // West
  if (col !== 0) {
    if (lines[row][col - 1] !== vegetable) {
      fencePanels += 1;
    } else {
      contiguous.push(`${row},${col - 1}`);
    }
  } else {
    fencePanels += 1;
  }

  return { fencePanels, contiguous };
};
