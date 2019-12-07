import Computer from "../utils/computer";

export const partOne = (input: string) => {
  const instructions = input.split(",").map(chars => Number(chars));
  const computer = new Computer(instructions, [1]);
  computer.execute();
  const output = computer.readOutput();
  return output.filter(number => number !== 0);
};

export const partTwo = (input: string) => {
  const instructions = input.split(",").map(chars => Number(chars));
  const computer = new Computer(instructions, [5]);
  computer.execute();
  const output = computer.readOutput();
  return output.filter(number => number !== 0);
};
