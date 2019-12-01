import {
  calculateFuelNeed,
  fuelCounterUpper,
  partOneSolver,
  calculateRecursiveFuelNeed,
  partTwoSolver
} from "./main";
import input from "./input";

describe("fuel need calculator", () => {
  it("calculates fuel need for mass 12", () => {
    expect(calculateFuelNeed(12)).toEqual(2);
  });

  it("calculates fuel need for mass 14", () => {
    expect(calculateFuelNeed(14)).toEqual(2);
  });

  it("calculates fuel need for mass 1969", () => {
    expect(calculateFuelNeed(1969)).toEqual(654);
  });

  it("calculates fuel need for mass 100756", () => {
    expect(calculateFuelNeed(100756)).toEqual(33583);
  });
});

describe("recursive fuel need calculator", () => {
  it("calculates recursive fuel need for mass 12", () => {
    expect(calculateRecursiveFuelNeed(12)).toEqual(2);
  });

  it("calculates recursive fuel need for mass 1969", () => {
    expect(calculateRecursiveFuelNeed(1969)).toEqual(966);
  });

  it("calculates recursive fuel need for mass 100756", () => {
    expect(calculateRecursiveFuelNeed(100756)).toEqual(50346);
  });
});

describe("fuel counter upper", () => {
  it("calulates total fuel need for given test cases", () => {
    const masses = [12, 14, 1969, 100756];
    const expectedResult = 2 + 2 + 654 + 33583;

    const result = fuelCounterUpper(masses, calculateFuelNeed);

    expect(result).toEqual(expectedResult);
  });
});

describe("part one solver", () => {
  expect(partOneSolver(input)).toEqual(3167282);
});

describe("part two solver", () => {
  expect(partTwoSolver(input)).toEqual(4748063);
});
