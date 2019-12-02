import { Computer, partOneSolver } from "./main";
import input from "./input";

describe("computer", () => {
  it("calculates [1, 0, 0, 0, 99]", () => {
    const program = [1, 0, 0, 0, 99];
    const computer = new Computer(program);

    computer.execute();
    const result = computer.getMemoryDump();

    expect(result).toEqual([2, 0, 0, 0, 99]);
  });

  it("calculates [2, 3, 0, 3, 99]", () => {
    const program = [2, 3, 0, 3, 99];
    const computer = new Computer(program);

    computer.execute();
    const result = computer.getMemoryDump();

    expect(result).toEqual([2, 3, 0, 6, 99]);
  });

  it("calculates [2, 4, 4, 5, 99, 0]", () => {
    const program = [2, 4, 4, 5, 99, 0];
    const computer = new Computer(program);

    computer.execute();
    const result = computer.getMemoryDump();

    expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
  });

  it("calculates [1, 1, 1, 4, 99, 5, 6, 0, 99]", () => {
    const program = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const computer = new Computer(program);

    computer.execute();
    const result = computer.getMemoryDump();

    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
});

describe("part one solver", () => {
  expect(partOneSolver(input)).toEqual(4930687);
});
