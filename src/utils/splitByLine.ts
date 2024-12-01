type SplitByLine = (file: string) => string[];

export const splitByLine: SplitByLine = (file) => {
  return file.split("\n").filter((e) => e);
};
