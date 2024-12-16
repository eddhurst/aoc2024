export type Position = { col: number; row: number };

export type Robot = {
  startingPosition: Position;
  velocity: { horizontal: number; vertical: number };
};

export type Robots = Robot[];

export type ParseInput = (input: string) => {
  robots: Robots;
  map: {
    width: number;
    height: number;
    middleCol: number;
    middleRow: number;
  };
};
