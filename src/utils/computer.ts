enum OpCode {
  Add = 1,
  Multiply = 2,
  Halt = 99
}

interface Operation {
  (leftOperand: number, rightOperand: number): number;
}

export default class Computer {
  private memory: number[];
  private instructionPointer: number;

  public constructor(instructions: number[]) {
    this.memory = instructions;
    this.instructionPointer = 0;
  }

  public execute(): void {
    while (true) {
      const opCode = this.memory[this.instructionPointer];
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

      const leftOperandPosition = this.memory[this.instructionPointer + 1];
      const rightOperandPosition = this.memory[this.instructionPointer + 2];
      const resultPosition = this.memory[this.instructionPointer + 3];

      const leftOperand = this.memory[leftOperandPosition];
      const rightOperand = this.memory[rightOperandPosition];

      const result = operation(leftOperand, rightOperand);

      this.memory[resultPosition] = result;

      this.instructionPointer += 4;
    }
  }

  public getMemoryDump() {
    return [...this.memory];
  }
}
