import { partOneSolver, partTwoSolver } from "./main";
import input from "./input";

describe("solution", () => {
  it("solves part one", () => {
    expect(partOneSolver(input)).toEqual(4930687);
  });

  it("solves part two", () => {
    expect(partTwoSolver(input)).toEqual({
      noun: 53,
      verb: 35
    });
  });
});
