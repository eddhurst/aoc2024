import { Antenna, AntiNode, CitySize } from "./types";

type CheckCollinearity = (
  a1: Antenna,
  a2: Antenna,
  citySize: CitySize,
) => AntiNode[];

export const checkCollinearity: CheckCollinearity = (a1, a2, citySize) => {
  const antiNodes = [];

  // Matches E/W
  if (a1.row === a2.row) {
    const diff = Math.abs(a1.col - a2.col);

    let pre = Math.min(a1.col, a2.col) - diff;
    let post = Math.max(a1.col, a2.col) + diff;

    while (pre >= 0 && pre < citySize.width) {
      antiNodes.push({ row: a1.row, col: pre });
      pre -= diff;
    }

    while (post >= 0 && post < citySize.width) {
      antiNodes.push({ row: a1.row, col: post });
      post += diff;
    }
  }

  // Matches N/S
  if (a1.col === a2.col) {
    const diff = Math.abs(a1.row - a2.row);

    let pre = Math.min(a1.row, a2.row) - diff;
    let post = Math.max(a1.row, a2.row) + diff;

    while (pre >= 0 && pre < citySize.height) {
      antiNodes.push({ row: pre, col: a1.col });
      pre -= diff;
    }

    while (post >= 0 && post < citySize.height) {
      antiNodes.push({ row: post, col: a1.col });
      post += diff;
    }
  }

  // Matches NE/SW
  if (a1.col < a2.col) {
    const rowDiff = Math.abs(a1.row - a2.row);
    const colDiff = Math.abs(a1.col - a2.col);

    let preRow = Math.min(a1.row, a2.row) - rowDiff;
    let preCol = Math.min(a1.col, a2.col) - colDiff;

    let postRow = Math.max(a1.row, a2.row) + rowDiff;
    let postCol = Math.max(a1.col, a2.col) + colDiff;

    while (
      preRow >= 0 &&
      preCol >= 0 &&
      preRow < citySize.height &&
      preCol < citySize.width
    ) {
      antiNodes.push({ row: preRow, col: preCol });
      preRow -= rowDiff;
      preCol -= colDiff;
    }

    while (
      postRow >= 0 &&
      postCol >= 0 &&
      postRow < citySize.height &&
      postCol < citySize.width
    ) {
      antiNodes.push({ row: postRow, col: postCol });
      postRow += rowDiff;
      postCol += colDiff;
    }
  }

  // Matches NW/SE
  if (a1.col > a2.col) {
    const rowDiff = Math.abs(a1.row - a2.row);
    const colDiff = Math.abs(a1.col - a2.col);

    let preRow = Math.min(a1.row, a2.row) - rowDiff;
    let preCol = Math.max(a1.col, a2.col) + colDiff;

    let postRow = Math.max(a1.row, a2.row) + rowDiff;
    let postCol = Math.min(a1.col, a2.col) - colDiff;

    while (
      preRow >= 0 &&
      preCol >= 0 &&
      preRow < citySize.height &&
      preCol < citySize.width
    ) {
      antiNodes.push({ row: preRow, col: preCol });
      preRow -= rowDiff;
      preCol += colDiff;
    }

    while (
      postRow >= 0 &&
      postCol >= 0 &&
      postRow < citySize.height &&
      postCol < citySize.width
    ) {
      antiNodes.push({ row: postRow, col: postCol });
      postRow += rowDiff;
      postCol -= colDiff;
    }
  }

  return antiNodes;
};
