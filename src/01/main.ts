import { parseNumbers } from "../utils/inputParsing";

interface FuelNeedCalculator {
  (mass: number): number;
}

export const calculateFuelNeed: FuelNeedCalculator = (mass: number) =>
  Math.floor(mass / 3) - 2;

export const calculateRecursiveFuelNeed: FuelNeedCalculator = (
  mass: number
) => {
  const fuelNeed = calculateFuelNeed(mass);

  if (fuelNeed <= 0) {
    return 0;
  }

  return fuelNeed + calculateRecursiveFuelNeed(fuelNeed);
};

export const fuelCounterUpper = (
  masses: number[],
  fuelNeedCalculator: FuelNeedCalculator
) => masses.reduce((prev, curr) => prev + fuelNeedCalculator(curr), 0);

export const partOneSolver = (input: string) =>
  fuelCounterUpper(parseNumbers(input, "\n"), calculateFuelNeed);

export const partTwoSolver = (input: string) =>
  fuelCounterUpper(parseNumbers(input, "\n"), calculateRecursiveFuelNeed);
