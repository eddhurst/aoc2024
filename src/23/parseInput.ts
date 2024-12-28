import { splitByLine } from "../utils/splitByLine";

type ParseInput = (input: string) => Record<string, string[]>;
export const parseInput: ParseInput = (input) => {
  const lines = splitByLine(input);

  const networks = lines.reduce(
    (network, line) => {
      const [primary, secondary] = line.split("-");

      let primaryNetworks = [];
      let secondaryNetworks = [];

      if (Object.hasOwn(network, primary)) {
        primaryNetworks = [...network[primary], secondary];
      } else {
        primaryNetworks = [secondary];
      }

      if (Object.hasOwn(network, secondary)) {
        secondaryNetworks = [...network[secondary], primary];
      } else {
        secondaryNetworks = [primary];
      }

      return {
        ...network,
        [primary]: primaryNetworks.sort(),
        [secondary]: secondaryNetworks.sort(),
      };
    },
    {} as Record<string, string[]>,
  );

  Object.keys(networks).forEach((key) => {
    networks[key].push(key);
  });

  return networks;
};
