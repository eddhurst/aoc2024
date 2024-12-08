export interface Guard {
  row: number;
  col: number;
  direction: "X" | "N" | "E" | "S" | "W" | string;
}

export type Obstacles = Record<string, number[]>;

export type RoomSize = { width: number; height: number };

export type Steps = Record<string, Record<string, { direction: string[] }>>;
