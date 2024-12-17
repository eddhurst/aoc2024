type GenerateEmpty = (map: { width: number; height: number }) => string[];
export const generateEmpty: GenerateEmpty = (map) => {
  const empty = [] as string[];

  for (let y = 0; y <= map.height; y++) {
    empty.push("");

    for (let x = 0; x <= map.width; x++) {
      empty[y] += ".";
    }

    empty[y] += "\n";
  }

  return empty;
};

export const addLocator = ({ col, row }, map) => {
  map[row] = map[row].substring(0, col) + "X" + map[row].substring(col + 1);
};
//
// const newMap = generateEmpty({ width: 5, height: 5 });
// addLocator({ col: 0, row: 0 }, newMap);
// addLocator({ col: 1, row: 1 }, newMap);
// addLocator({ col: 2, row: 2 }, newMap);
// addLocator({ col: 3, row: 3 }, newMap);
// addLocator({ col: 4, row: 4 }, newMap);
// console.info(newMap.join(""));
