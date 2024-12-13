import {argsAsString} from "../utils/argsAsString";

export type Edges = { north: boolean, east: boolean, south: boolean, west: boolean };

type CheckDirections = (
  plot: { row: number; col: number },
  lines: string[],
) => { fencePanels: number; contiguous: string[], edges: Edges };

export const checkDirections: CheckDirections = ({ row, col }, lines) => {
  let fencePanels = 0;

  const vegetable = lines[row][col];
  const allotmentSize = { height: lines.length, width: lines[0].length };

  const contiguous = [];
  let north = false;
  let east = false;
  let south = false;
  let west = false;

  // North
  if (row !== 0) {
    if (lines[row - 1][col] !== vegetable) {
      fencePanels += 1;
      north = true;
    } else {
      contiguous.push(argsAsString(row - 1,col));
    }
  } else {
    north = true;
    fencePanels += 1;
  }

  // South
  if (row !== allotmentSize.height - 1) {
    if (lines[row + 1][col] !== vegetable) {
      fencePanels += 1;
      south = true
    } else {
      contiguous.push(argsAsString(row + 1,col));
    }
  } else {
    south = true;
    fencePanels += 1;
  }

  // East
  if (col !== allotmentSize.width - 1) {
    if (lines[row][col + 1] !== vegetable) {
      fencePanels += 1;
      east = true;
    } else {
      contiguous.push(argsAsString(row,col + 1));
    }
  } else {
    east = true;
    fencePanels += 1;
  }

  // West
  if (col !== 0) {
    if (lines[row][col - 1] !== vegetable) {
      fencePanels += 1;
      west = true;
    } else {
      contiguous.push(argsAsString(row,col - 1));
    }
  } else {
    west = true;
    fencePanels += 1;
  }

  return { fencePanels, contiguous, edges: { north, east, south, west } };
};
