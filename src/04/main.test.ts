import {
  hasMinimumAdjacentDigits,
  hasDecreasingDigits,
  partOne,
  partTwo
} from "./main";

describe("password validators", () => {
  it("finds adjacent digits in 122345", () => {
    expect(hasMinimumAdjacentDigits(122345, 2)).toBe(true);
  });

  it("doesn't find adjacent digits in 123456", () => {
    expect(hasMinimumAdjacentDigits(123456, 2)).toBe(false);
  });

  it("finds no decreasing digits in 111123", () => {
    expect(hasDecreasingDigits(111123)).toBe(false);
  });

  it("finds decreasing digits in 223450", () => {
    expect(hasDecreasingDigits(223450)).toBe(true);
  });
});

describe("solutions", () => {
  const input = "172930-683082";

  it("solves part one", () => {
    expect(partOne(input)).toEqual(1675);
  });

  it("solves part two", () => {
    expect(partTwo(input)).toEqual(1142);
  });
});
