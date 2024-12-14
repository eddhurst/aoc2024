export type Machine = { buttonA: number[]; buttonB: number[]; prize: number[] };
export type Machines = Machine[];

export const parseInput: (input: string) => Machines = (input) => {
  const groups = input.split("\n\n");

  return groups.reduce((acc, group) => {
    const [buttonA, buttonB, prizes] = group.split("\n");

    const [xA, yA] = Array.from(buttonA.matchAll(/\d+/g)).reduce(
      (acc, match) => [...acc, parseInt(match[0])],
      [] as number[],
    );

    const [xB, yB] = Array.from(buttonB.matchAll(/\d+/g)).reduce(
      (acc, match) => [...acc, parseInt(match[0])],
      [] as number[],
    );

    const [prizeX, prizeY] = Array.from(prizes.matchAll(/\d+/g)).reduce(
      (acc, match) => [...acc, parseInt(match[0])],
      [] as number[],
    );

    return [
      ...acc,
      { buttonA: [xA, yA], buttonB: [xB, yB], prize: [prizeX, prizeY] },
    ];
  }, [] as Machine[]);
};
