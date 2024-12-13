import { argsAsString } from "../utils/argsAsString";
import { parseInput, Plot, Plots } from "./parseInput";
import { example } from "./prompts/12.example";

type DeriveGroups = (input: Plots) => unknown;

export const deriveGroups: DeriveGroups = (input) => {
  return ["C"]
    .map((vegetable) => {
      const plot = input[vegetable][0];
      const contiguousGroup = new Set([
        argsAsString(plot.row, plot.col),
        ...plot.contiguous,
      ]);

      const vegetableGroups = input[vegetable].reduce(
        (groups, plot) => {
          if (
            contiguousGroup.has(argsAsString(plot.row, plot.col)) ||
            plot.contiguous.some((x) => contiguousGroup.has(x))
          ) {
            plot.contiguous.forEach((x) => contiguousGroup.add(x));
          } else {
            if (!groups[vegetable]) {
              groups[vegetable] = [];
            }

            console.info("NEW GROUP", plot.row, plot.col);

            groups[vegetable].push([]);
            const index = groups[vegetable].length - 1;
            contiguousGroup.forEach((x) => groups[vegetable][index].push(x));

            contiguousGroup.clear();
            contiguousGroup.add(argsAsString(plot.row, plot.col));
            plot.contiguous.forEach((x) => contiguousGroup.add(x));
          }

          return groups;
        },
        {} as Record<string, string[][]>,
      );

      if (!vegetableGroups[vegetable]) {
        vegetableGroups[vegetable] = [];
      }
      vegetableGroups[vegetable].push([]);
      const index = vegetableGroups[vegetable].length - 1;
      contiguousGroup.forEach((x) => vegetableGroups[vegetable][index].push(x));

      return vegetableGroups;
    })
    .reduce((acc, x) => ({ ...acc, ...x }));
};

const { matrix, plots } = parseInput(example);

// console.info(deriveGroups(plots));

// > 0,6
// 1,6  0,7

// > 1,6
// X  2,6  1,7

// > 2,6
// X  2,5

// > 2,5
// 3,5  X

// > 3,5
// X  3,4

// > 3,4
// 4,4  X  3,3

// > 4,4
// X  5,4

// > 5,4
// X  5,5

// > 5,5
// 6,5  X

// > 6,5
// X

type AddContiguous = (
  plot: Plot,
  seenBefore: Set<string>,
) => { seenBefore: Set<string>; contiguousPlots: Plot[] };

const addContiguous: AddContiguous = (plot, seenBefore) => {
  const locator = argsAsString(plot.row, plot.col);

  const plots = [matrix[plot.row][plot.col]];

  if (!seenBefore.has(locator)) {
    seenBefore.add(locator);
  }

  const depth = plot.contiguous.reduce(
    (acc, touching: string) => {
      if (!seenBefore.has(touching)) {
        const [nextRow, nextCol] = touching.split(",");
        const next = addContiguous(
          matrix[parseInt(nextRow)][parseInt(nextCol)],
          seenBefore,
        );

        next.seenBefore.forEach((x) => acc.seenBefore.add(x));

        return {
          seenBefore,
          contiguousPlots: [...acc.contiguousPlots, ...next.contiguousPlots],
        };
      }

      return acc;
    },
    { seenBefore, contiguousPlots: [] } as {
      seenBefore: Set<string>;
      contiguousPlots: Plot[];
    },
  );

  return {
    seenBefore,
    contiguousPlots: [...plots, ...depth.contiguousPlots],
  };
};

const cGroups = plots["C"].reduce(
  (acc, plot) => {
    const { seenBefore, contiguousPlots } = addContiguous(plot, acc.seenBefore);

    seenBefore.forEach((x) => acc.seenBefore.add(x));
    const newGroups = [...acc.groups, contiguousPlots];

    return {
      seenBefore,
      groups: newGroups,
    };
  },
  { seenBefore: new Set<string>(), groups: [] as Plot[] },
);

console.info(cGroups);

// console.info(addContiguous(plots["C"][0], new Set()));
