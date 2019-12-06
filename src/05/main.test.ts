import input from "./input";
import { partOne, partTwo } from "./main";

describe("solution", () => {
  it("solves part one", () => {
    expect(partOne(input)).toEqual([9431221]);
  });

  it("solves part two", () => {
    expect(partTwo(input)).toEqual([1409363]);
  });
});
