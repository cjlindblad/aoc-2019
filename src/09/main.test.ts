import input from "./input";
import { solver } from "./main";

describe("solution", () => {
  it("handles first given test for part one", () => {
    const instructions = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"
      .split(",")
      .map(e => Number(e));

    expect(solver([...instructions])).toEqual([...instructions]);
  });

  it("handles second given test for part one", () => {
    const instructions = "1102,34915192,34915192,7,4,7,99,0"
      .split(",")
      .map(e => Number(e));

    expect(solver([...instructions])).toEqual([1219070632396864]);
  });

  it("handles third given test for part one", () => {
    const instructions = "104,1125899906842624,99"
      .split(",")
      .map(e => Number(e));

    expect(solver([...instructions])).toEqual([1125899906842624]);
  });

  it("solves part one", () => {
    expect(
      solver(
        input.split(",").map(e => Number(e)),
        [1]
      )[0]
    ).toEqual(2682107844);
  });

  it("solves part two", () => {
    expect(
      solver(
        input.split(",").map(e => Number(e)),
        [2]
      )[0]
    ).toEqual(34738);
  });
});
