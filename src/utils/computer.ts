enum OpCode {
  Add = 1,
  Multiply = 2,
  ReadInput = 3,
  WriteOutput = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
  Halt = 99
}

enum ParameterMode {
  Positional = 0,
  Immediate = 1
}

enum ParameterType {
  Read,
  Write
}

const parametersByOpCode = {
  [OpCode.Add]: [ParameterType.Read, ParameterType.Read, ParameterType.Write],
  [OpCode.Multiply]: [
    ParameterType.Read,
    ParameterType.Read,
    ParameterType.Write
  ],
  [OpCode.ReadInput]: [ParameterType.Write],
  [OpCode.WriteOutput]: [ParameterType.Read],
  [OpCode.JumpIfTrue]: [ParameterType.Read, ParameterType.Read],
  [OpCode.JumpIfFalse]: [ParameterType.Read, ParameterType.Read],
  [OpCode.LessThan]: [
    ParameterType.Read,
    ParameterType.Read,
    ParameterType.Write
  ],
  [OpCode.Equals]: [
    ParameterType.Read,
    ParameterType.Read,
    ParameterType.Write
  ],
  [OpCode.Halt]: []
};

export default class Computer {
  private memory: number[];
  private instructionPointer: number;
  private input: number[];
  private output: number[];

  public constructor(instructions: number[], input: number[] = []) {
    this.memory = instructions;
    this.instructionPointer = 0;
    this.input = input;
    this.output = [];
  }

  private getCurrentInstruction() {
    return this.memory[this.instructionPointer];
  }

  private parseParameterModes(numberOfParameters: number) {
    const instruction = this.getCurrentInstruction();
    const parameterModes: number[] = [];
    for (let i = 0; i < numberOfParameters; i++) {
      parameterModes.push(0);
    }
    if (instruction > 100) {
      let currentMode = Math.floor(instruction / 100);
      let i = 0;
      while (currentMode > 0) {
        parameterModes[i] = currentMode % 10;
        currentMode = Math.floor(currentMode / 10);
        i++;
      }
    }

    return parameterModes;
  }

  public execute(): void {
    while (true) {
      const instruction = this.getCurrentInstruction();

      if (instruction === OpCode.Halt) {
        return;
      }

      const opCode = instruction % 100;
      const parameters = parametersByOpCode[opCode];
      const numberOfParameters = parameters.length;

      const parameterModes = this.parseParameterModes(numberOfParameters);

      const parameterValues = parameters.map((parameter, i) => {
        const pointer = this.instructionPointer + i + 1;
        if (
          parameter === ParameterType.Read &&
          parameterModes[i] === ParameterMode.Positional
        ) {
          return this.memory[this.memory[pointer]];
        }
        return this.memory[pointer];
      });

      const autoIncreaseInstructionPointer = () => {
        this.instructionPointer += numberOfParameters + 1;
      };

      switch (opCode) {
        case OpCode.Add:
          this.memory[parameterValues[2]] =
            parameterValues[0] + parameterValues[1];
          autoIncreaseInstructionPointer();
          break;
        case OpCode.Multiply:
          this.memory[parameterValues[2]] =
            parameterValues[0] * parameterValues[1];
          autoIncreaseInstructionPointer();
          break;
        case OpCode.ReadInput:
          this.memory[parameterValues[0]] = this.readNextInput();
          autoIncreaseInstructionPointer();
          break;
        case OpCode.WriteOutput:
          this.output.push(parameterValues[0]);
          autoIncreaseInstructionPointer();
          break;
        case OpCode.JumpIfTrue:
          if (parameterValues[0] !== 0) {
            this.instructionPointer = parameterValues[1];
          } else {
            autoIncreaseInstructionPointer();
          }
          break;
        case OpCode.JumpIfFalse:
          if (parameterValues[0] === 0) {
            this.instructionPointer = parameterValues[1];
          } else {
            autoIncreaseInstructionPointer();
          }
          break;
        case OpCode.LessThan:
          this.memory[parameterValues[2]] =
            parameterValues[0] < parameterValues[1] ? 1 : 0;
          autoIncreaseInstructionPointer();
          break;
        case OpCode.Equals:
          this.memory[parameterValues[2]] =
            parameterValues[0] === parameterValues[1] ? 1 : 0;
          autoIncreaseInstructionPointer();
          break;
        default:
          throw new Error(`Invalid opcode - ${instruction}`);
      }

      if (this.instructionPointer >= this.memory.length) {
        throw new Error(
          `Invalid instruction pointer value - ${this.instructionPointer}`
        );
      }
    }
  }

  private readNextInput() {
    return this.input.shift();
  }

  public getMemoryDump() {
    return [...this.memory];
  }

  public readOutput() {
    return [...this.output];
  }
}
