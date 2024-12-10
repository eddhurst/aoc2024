import { HardDrive } from "./types";

export const defrag = (input: HardDrive) => {
  const defragged = { ...input };

  console.info("Defragging");

  let defragIndex = Object.keys(defragged).length - 1;
  while (defragIndex > 0) {
    // skip to next file.
    if (defragged[defragIndex].file === -1) {
      defragIndex--;
      continue;
    }

    // next index position
    const fileToProcess = defragged[defragIndex];
    defragIndex = fileToProcess.startIndex - 1;

    for (let i = 0; i < fileToProcess.startIndex; i++) {
      if (defragged[i].file !== -1) {
        continue;
      }

      if (defragged[i].size < fileToProcess.size) {
        i += defragged[i].size - 1;
        continue;
      }

      const currentEmpty = defragged[i];

      if (currentEmpty.size >= fileToProcess.size) {
        const newStartIndex = currentEmpty.startIndex;

        // copy file, and reallocate remaining empty space with new sizes.
        for (let j = 0; j < currentEmpty.size; j++) {
          if (j >= fileToProcess.size) {
            defragged[newStartIndex + j] = {
              startIndex: newStartIndex + fileToProcess.size,
              size: currentEmpty.size - fileToProcess.size,
              file: -1,
              defragged: true,
            };
          } else {
            defragged[newStartIndex + j] = {
              ...fileToProcess,
              startIndex: newStartIndex,
              defragged: true,
            };
          }
        }

        // Remove original file.
        for (let j = 0; j < fileToProcess.size; j++) {
          defragged[fileToProcess.startIndex + j] = {
            startIndex: fileToProcess.startIndex,
            size: -1,
            file: -1,
            defragged: true,
          };
        }

        break;
      }
    }
  }

  return defragged;
};
