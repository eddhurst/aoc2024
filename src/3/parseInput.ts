import fs from "fs";

export const parseInput = (filename: string) => {
  const file = fs.readFileSync(filename, { encoding: "utf8" });

  return file;
};
