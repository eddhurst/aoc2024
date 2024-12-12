import {basic} from "./prompts/12.basic";
import {parseInput} from "./parseInput";
import {example} from "./prompts/12.example";

const { matrix, plots, allotmentSize } = parseInput(example);

const totalFence = Object.keys(plots).reduce(( totalCost, vegetable ) => {
  const vegetablePlots = plots[vegetable];

  const area = plots[vegetable].length;
  const plotPerimeter = vegetablePlots.reduce((perimeter, plot) => {
    let fencePanels = 0;


    // TODO: Move this into parseInput to store with each plot
    // TODO: Then here, recursively find all touching points, and store them as "groups"
    // For each group, read all the fencepost data, and multiply by length.
    // North
    if (plot.row !== 0) {
      if (matrix[plot.row - 1][plot.col] !== vegetable) {
        fencePanels += 1;
      }
    } else {
      fencePanels += 1;
    }

    // South
    if (plot.row !== allotmentSize.height - 1) {
      if (matrix[plot.row + 1][plot.col] !== vegetable) {
        fencePanels += 1;
      }
    } else {
      fencePanels += 1;
    }

    // East
    if (plot.col !== allotmentSize.width - 1) {
      if (matrix[plot.row][plot.col + 1] !== vegetable) {
        fencePanels += 1;
      }
    } else {
      fencePanels += 1;
    }

    // West
    if (plot.col !== 0) {
      if (matrix[plot.row][plot.col - 1] !== vegetable) {
        fencePanels += 1;
      }
    } else {
      fencePanels += 1;
    }

    // console.info(`[${plot.row},${plot.col}] has ${fencePanels} fencePanels`);

    return perimeter + fencePanels;
  }, 0)

  console.info(`Plot ${vegetable}: Area (${area}) * Perimeter (${plotPerimeter}) = ${area * plotPerimeter}`)

  return totalCost + (area * plotPerimeter);
}, 0)

console.info(totalFence);
