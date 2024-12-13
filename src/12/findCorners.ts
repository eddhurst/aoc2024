import {Allotment, Plot, Plots} from "./parseInput";

type FindCorners = (plot: Plot, matrix: Plot[][], allotmentSize: Allotment, debug?: boolean) => number;
export const findCorners: FindCorners = (plot, matrix, allotmentSize, debug) => {
  let corners = 0;

  if (plot.edges.north && plot.edges.east) { if (debug) { console.info(`[${plot.row},${plot.col}] corner NE`); } corners += 1; }
  if (plot.edges.north && plot.edges.west) { if (debug) { console.info(`[${plot.row},${plot.col}] corner NW`); } corners += 1; }
  if (plot.edges.south && plot.edges.east) { if (debug) { console.info(`[${plot.row},${plot.col}] corner SE`); } corners += 1; }
  if (plot.edges.south && plot.edges.west) { if (debug) { console.info(`[${plot.row},${plot.col}] corner SW`); } corners += 1; }

  const up = plot.row !== 0 && matrix[plot.row - 1][plot.col];
  const right = plot.col !== allotmentSize.width && matrix[plot.row][plot.col + 1];
  const down = plot.row !== allotmentSize.height && matrix[plot.row + 1][plot.col];
  const left = plot.col !== 0 && matrix[plot.row][plot.col - 1];

  const rightNorth = right && right.veg === plot.veg && right.edges.north;
  const leftNorth = left && left.veg === plot.veg && left.edges.north;
  const rightSouth = right && right.veg === plot.veg && right.edges.south;
  const leftSouth = left && left.veg === plot.veg && left.edges.south;
  const upEast = up && up.veg === plot.veg && up.edges.east;
  const downEast = down && down.veg === plot.veg && down.edges.east;
  const upWest = up && up.veg === plot.veg && up.edges.west;
  const downWest = down && down.veg === plot.veg && down.edges.west;

  if (rightNorth && upEast) { if (debug) { console.info(`[${plot.row},${plot.col}] inside corner NE`); } corners += 1 }
  if (leftNorth && upWest) { if (debug) { console.info(`[${plot.row},${plot.col}] inside corner NW`); } corners += 1 }
  if (leftSouth && downWest) { if (debug) { console.info(`[${plot.row},${plot.col}] inside corner SW`); } corners += 1 }
  if (rightSouth && downEast) { if (debug) { console.info(`[${plot.row},${plot.col}] inside corner SE`); } corners += 1 }

  return corners;
}
