type ArgsAsString = (...p: number[] | string[]) => string;

export const argsAsString: ArgsAsString = (...args) => args.join(",");
