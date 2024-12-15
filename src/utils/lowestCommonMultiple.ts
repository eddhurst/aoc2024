type GCD = (a: number, b: number) => number;
export const findGreatestDivisor: GCD = (a, b) => {
  if (a === b) {
    return a;
  }

  if (a > b) {
    return findGreatestDivisor(a - b, b);
  }

  return findGreatestDivisor(a, b - a);
};

type LCM = (a: number, b: number) => { gcd: number; lcm: number };
export const findLowestCommonMultiple: LCM = (a, b) => {
  const gcd = findGreatestDivisor(a, b);
  const lcm = (a * b) / gcd;
  return { gcd, lcm };
};
