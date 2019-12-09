import Computer from "../utils/computer";

export const solver = (instructions: number[], input?: number[]) => {
  const computer = new Computer(instructions);
  if (input) {
    computer.setInput(input);
  }
  computer.execute();
  return computer.readOutput();
};
