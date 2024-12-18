export type Locator = { col: number; row: number };
export interface LocatorJunction extends Locator {
  isCorner: boolean,
  isJunction: boolean,
  north: boolean,
  east: boolean,
  south: boolean,
  west: boolean
}
export interface Tile extends LocatorJunction { type: '.' | '#' | 'S' | 'E' }

export type MazeSize = { width: number; height: number };

export type Direction = 'N' | 'E' | 'S' | 'W';


export const TILE = '.';
export const WALL = '#';
export const START = 'S';
export const END = 'E';
