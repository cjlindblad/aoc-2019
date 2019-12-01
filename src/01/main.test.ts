import { calculateFuelNeed, fuelCounterUpper, partOneSolver } from "./main";
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

describe("fuel counter upper", () => {
  it("calulates total fuel need for given test cases", () => {
    const masses = [12, 14, 1969, 100756];
    const expectedResult = 2 + 2 + 654 + 33583;

    const result = fuelCounterUpper(masses);

    expect(result).toEqual(expectedResult);
  });
});

describe("part one solver", () => {
  expect(partOneSolver(input)).toEqual(3167282);
});
