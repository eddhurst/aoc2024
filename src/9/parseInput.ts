import { HardDrive } from "./types";

export const parseInput = (input: string) => {
  return input.matchAll(/(\d)(\d)?/g);
};

type BuildFileSystem = (files: RegExpExecArray[]) => HardDrive;

export const buildFileSystem: BuildFileSystem = (files) => {
  console.info("Building Files");

  const hardDrive = {} as HardDrive;

  let lastIndex = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileSize = parseInt(file[1]);
    const freeSpace = parseInt(file[2]) || 0;

    const finalIndex = lastIndex + fileSize + freeSpace;

    for (let j = lastIndex; j < finalIndex; j++) {
      if (j >= lastIndex + fileSize) {
        hardDrive[j] = {
          size: freeSpace,
          startIndex: lastIndex + fileSize,
          file: -1,
        };
      } else {
        hardDrive[j] = { size: fileSize, startIndex: lastIndex, file: i };
      }
    }
    lastIndex += fileSize + freeSpace;
  }

  return hardDrive;
};
