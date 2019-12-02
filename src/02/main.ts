import { parseNumbers } from "../utils/inputParsing";

enum OpCode {
  Add = 1,
  Multiply = 2,
  Halt = 99
}

interface Operation {
  (leftOperand: number, rightOperand: number): number;
}

export class Computer {
  private memory: number[];
  private programCounter: number;

  public constructor(instructions: number[]) {
    this.memory = instructions;
    this.programCounter = 0;
  }

  public execute(): void {
    while (true) {
      const opCode = this.memory[this.programCounter];
      let operation: Operation;

      switch (opCode) {
        case OpCode.Add:
          operation = (a, b) => a + b;
          break;
        case OpCode.Multiply:
          operation = (a, b) => a * b;
          break;
        case OpCode.Halt:
          return;
        default:
          throw new Error(`Invalid opcode - ${opCode}`);
      }

      const leftOperandPosition = this.memory[this.programCounter + 1];
      const rightOperandPosition = this.memory[this.programCounter + 2];
      const resultPosition = this.memory[this.programCounter + 3];

      const leftOperand = this.memory[leftOperandPosition];
      const rightOperand = this.memory[rightOperandPosition];

      const result = operation(leftOperand, rightOperand);

      this.memory[resultPosition] = result;

      this.programCounter += 4;
    }
  }

  public getMemoryDump() {
    return [...this.memory];
  }
}

export const partOneSolver = (input: string) => {
  const instructions = parseNumbers(input, ",");
  instructions[1] = 12;
  instructions[2] = 2;

  const computer = new Computer(instructions);
  computer.execute();
  const memory = computer.getMemoryDump();

  return memory[0];
};
