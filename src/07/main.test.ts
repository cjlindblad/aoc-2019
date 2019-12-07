import input from "./input";
import { partOne } from "./main";

describe("solution", () => {
  it("solves first given test case for part one", () => {
    const program = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"
      .split(",")
      .map(e => Number(e));

    expect(partOne(program)).toEqual(43210);
  });

  it("solves second given test case for part one", () => {
    const program = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
      .split(",")
      .map(e => Number(e));

    expect(partOne(program)).toEqual(54321);
  });

  it("solves third given test case for part one", () => {
    const program = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
      .split(",")
      .map(e => Number(e));

    expect(partOne(program)).toEqual(65210);
  });

  it("solves part one", () => {
    const program = input.split(",").map(e => Number(e));

    expect(partOne(program)).toEqual(118936);
  });
});
