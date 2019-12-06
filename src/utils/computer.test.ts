import Computer from "./computer";

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

  it("calculates [1002, 4, 3, 4, 33]", () => {
    const program = [1002, 4, 3, 4, 33];
    const computer = new Computer(program);

    computer.execute();
    const result = computer.getMemoryDump();

    expect(result).toEqual([1002, 4, 3, 4, 99]);
  });

  it("outputs 0 when input is zero", () => {
    const program = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
    const computer = new Computer(program, 0);

    computer.execute();

    const output = computer.readOutput();

    expect(output).toEqual([0]);
  });

  it("outputs 1 when input is non zero", () => {
    const program = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
    const computer = new Computer(program, 1337);

    computer.execute();

    const output = computer.readOutput();

    expect(output).toEqual([1]);
  });

  it("handles i/o", () => {
    const program = [3, 0, 4, 0, 99];
    const input = 1337;
    const computer = new Computer(program, input);

    computer.execute();

    expect(computer.readOutput()).toEqual([1337]);
  });
});
