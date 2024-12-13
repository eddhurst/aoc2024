import {parseInput, Plot, Plots} from "./parseInput";
import {argsAsString} from "../utils/argsAsString";
import {example} from "./prompts/12.example";
import {logResult} from "../utils/log";
import {prompt} from "./prompts/12.prompt";
import {findCorners} from "./findCorners";

const { matrix, plots, allotmentSize } = parseInput(prompt);

let alreadyVisited = new Set();
let contiguous = [] as Plot[];

type FindContiguous = (input: string, initializer?: boolean) => void

const findContiguous: FindContiguous = (input) => {
  if (alreadyVisited.has(input)) {
    return;
  }

  alreadyVisited.add(input);
  const [row, col] = input.split(",");
  const plot = matrix[parseInt(row)][parseInt(col)];
  contiguous.push(plot);

  if (plot.contiguous.length === 0) {
    return;
  }

  plot.contiguous.forEach(locator => findContiguous(locator));
}

type Groups = { locator: string, seen: Set<string>, contiguous: Plot[] }[]
type DeriveContiguous = (plots: Plots) => number;
const deriveContiguous: DeriveContiguous = (plots) => {
  return Object.keys(plots).reduce((totalCost, vegetable) => {
    const vegPlots = plots[vegetable];

    const vegGroups = vegPlots.reduce((groups, plot) => {
      alreadyVisited = new Set();
      contiguous = [];

      const string = argsAsString(plot.row, plot.col);

      for (let i = 0; i < groups.length; i++) {
        if (groups[i].seen.has(string)) {
          return groups;
        }
      }

      findContiguous(string, true);

      return [ ...groups, { locator: string, seen: alreadyVisited, contiguous } ] as Groups;
    }, [] as Groups)

    return totalCost + vegGroups.reduce((groupsArea, group, groupIndex) => {
      const perimeter = group.contiguous.reduce((edges, plot) => {
        return edges + findCorners(plot, matrix, allotmentSize, true)
      }, 0);

      const area = group.contiguous.length;

      console.info(vegetable, groupIndex)
      console.info(`${area} * ${perimeter} = ${area * perimeter}`);

      return groupsArea + perimeter * area
    }, 0)
  }, 0)
}

logResult(deriveContiguous(plots));
