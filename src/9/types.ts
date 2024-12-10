export interface File {
  size: number;
  startIndex: number;
  file: number;
  defragged?: boolean;
}

export type HardDrive = Record<string, File>;
