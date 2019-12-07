import Computer from "../utils/computer";
import { generatePermutations } from "../utils/permutations";

export const partOne = (instructions: number[]) => {
  const phaseSettings = [0, 1, 2, 3, 4];
  const phaseSettingPermutations = generatePermutations(phaseSettings);

  let maxOutput = Number.MIN_SAFE_INTEGER;

  phaseSettingPermutations.forEach(permutation => {
    const amplifierA = new Computer(instructions, [permutation[0], 0]);
    amplifierA.execute();
    const outputA = amplifierA.readOutput();

    const amplifierB = new Computer(instructions, [permutation[1], outputA[0]]);
    amplifierB.execute();
    const outputB = amplifierB.readOutput();

    const amplifierC = new Computer(instructions, [permutation[2], outputB[0]]);
    amplifierC.execute();
    const outputC = amplifierC.readOutput();

    const amplifierD = new Computer(instructions, [permutation[3], outputC[0]]);
    amplifierD.execute();
    const outputD = amplifierD.readOutput();

    const amplifierE = new Computer(instructions, [permutation[4], outputD[0]]);
    amplifierE.execute();
    const outputE = amplifierE.readOutput();

    if (outputE[0] > maxOutput) {
      maxOutput = outputE[0];
    }
  });

  return maxOutput;
};
