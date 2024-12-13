import { basic } from "./prompts/12.basic";
import { parseInput } from "./parseInput";
import { example } from "./prompts/12.example";
import { argsAsString } from "../utils/argsAsString";
import { deriveGroups } from "./deriveGroups";

const { matrix, plots, allotmentSize } = parseInput(example);

const totalGroups = deriveGroups(plots);

console.info(totalGroups);

const cost = Object.keys(totalGroups).reduce((totalCost, vegetable) => {
  const groups = totalGroups[vegetable];

  const groupCost = groups.reduce((groupArea, group) => {
    const perimeter = group.reduce((fencePanels, plot) => {
      const [row, col] = plot.split(",");
      return fencePanels + matrix[parseInt(row)][parseInt(col)].fencePanels;
    }, 0);

    console.info(vegetable, group);
    console.info(
      `${perimeter} * ${group.length} = ${perimeter * group.length}`,
    );
    console.info();

    return groupArea + perimeter * group.length;
  }, 0);

  return groupCost + totalCost;
}, 0);

console.info("----------");
console.info(cost);

process.exit(0);

console.info(matrix);

type FindContiguousPlots = (
  row: number,
  col: number,
  cameFrom: string,
  vegetable: string,
) => Set<string>;
const findContiguousPlots: FindContiguousPlots = (
  row,
  col,
  cameFrom,
  vegetable,
) => {
  if (matrix[row][col] !== vegetable) {
    return new Set();
  }

  console.info(`${row}, ${col} entered`);

  const directions = new Set([`${row},${col}`]);

  if (row !== 0 && cameFrom !== "N") {
    const north = findContiguousPlots(row - 1, col, "N", vegetable); // North
    if (north.size) {
      north.forEach((x) => directions.add(x));
    }
  }
  if (col < allotmentSize.width && cameFrom !== "E") {
    const east = findContiguousPlots(row, col + 1, "E", vegetable); // East
    if (east.size) {
      east.forEach((x) => directions.add(x));
    }
  }
  if (row < allotmentSize.height && cameFrom !== "S") {
    const south = findContiguousPlots(row + 1, col, "S", vegetable); // South
    if (south.size) {
      south.forEach((x) => directions.add(x));
    }
  }
  if (col !== 0 && cameFrom !== "W") {
    const west = findContiguousPlots(row, col - 1, "W", vegetable); // West
    if (west.size) {
      west.forEach((x) => directions.add(x));
    }
  }

  return directions;
};

const connected = findContiguousPlots(0, 0, "X", "A");

console.info(connected);

const newPlots = Object.keys(plots).map((key) => {
  const initialPlot = [`${plots[key][0].row},${plots[key][0].col}`];

  return plots[key].reduce(
    (acc, plot) => {
      if (
        acc.groups[acc.validate].size === 0 ||
        acc.groups[acc.validate].has(`${plot.row},${plot.col}`)
      ) {
        plot.contiguous.forEach((x) => acc.groups[acc.validate].add(x));
      } else {
        acc.groups.push(new Set());
        return { ...acc, validate: acc.validate + 1 };
      }

      return acc;
    },
    { validate: 0, key, groups: [new Set(initialPlot)] as Set<string>[] },
  );
});

process.exit(0);

/***

 const totalFence = Object.keys(plots).reduce((totalCost, vegetable) => {
  const vegetablePlots = plots[vegetable];

  const distinctPlots = vegetablePlots.reduce(
    (groups, plot) => {
      const vegetable = matrix[plot.row][plot.col];

      const connectedPlots = findContiguousPlots(plot.row, plot.col, vegetable);

      const test = [] as string[];
      connectedPlots.forEach((x) => test.push(x));

      if (groups[vegetable]) {
        groups[vegetable].push(test);
      } else {
        groups[vegetable] = [test];
      }

      return groups;
    },
    {} as Record<string, string[][]>,
  );

  console.info(distinctPlots);

  const area = plots[vegetable].length;
  const plotPerimeter = vegetablePlots.reduce((perimeter, plot) => {
    // TODO: Then here, recursively find all touching points, and store them as "groups"

    return perimeter + plot.fencePanels;
  }, 0);

  console.info(
    `Plot ${vegetable}: Area (${area}) * Perimeter (${plotPerimeter}) = ${area * plotPerimeter}`,
  );

  return totalCost + area * plotPerimeter;
}, 0);

console.info(totalFence);

 **/
