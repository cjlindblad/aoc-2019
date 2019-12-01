import { parseNumbers } from "../utils/inputParsing";

export const calculateFuelNeed = (mass: number) => Math.floor(mass / 3) - 2;

export const fuelCounterUpper = (masses: number[]) =>
  masses.reduce((prev, curr) => prev + calculateFuelNeed(curr), 0);

export const partOneSolver = (input: string) =>
  fuelCounterUpper(parseNumbers(input));
