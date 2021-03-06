import { parseNumbers } from "./inputParsing";

describe("input parsing", () => {
  it("can parse input lines to number array", () => {
    const input = `1
    2
    3
    4
    5`;

    const result = parseNumbers(input, "\n");

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("can parse comma separated numbers to number array", () => {
    const input = "1,2,3,4,5";

    const result = parseNumbers(input, ",");

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
