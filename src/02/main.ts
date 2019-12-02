import { parseNumbers } from "../utils/inputParsing";
import Computer from "../utils/computer";

export const partOneSolver = (input: string) => {
  const instructions = parseNumbers(input, ",");
  instructions[1] = 12;
  instructions[2] = 2;

  const computer = new Computer(instructions);
  computer.execute();
  const memory = computer.getMemoryDump();

  return memory[0];
};

export const partTwoSolver = (input: string) => {
  const originalInstructions = parseNumbers(input, ",");

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const instructions = [...originalInstructions];
      instructions[1] = noun;
      instructions[2] = verb;

      const computer = new Computer(instructions);
      computer.execute();

      const memory = computer.getMemoryDump();
      const output = memory[0];

      if (output === 19690720) {
        return {
          noun,
          verb
        };
      }
    }
  }
};
