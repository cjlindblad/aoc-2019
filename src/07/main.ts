import Computer from "../utils/computer";
import { generatePermutations } from "../utils/permutations";

export const solver = (instructions: number[], phaseSettings: number[]) => {
  const INITIAL_SIGNAL = 0;

  const phaseSettingPermutations = generatePermutations(phaseSettings);

  let maxOutput = Number.MIN_SAFE_INTEGER;

  phaseSettingPermutations.forEach(permutation => {
    const amplifiers: Computer[] = [];
    const memoryBuffers: number[][] = [];

    const amplifierCount = phaseSettings.length;

    for (let i = 0; i < amplifierCount; i++) {
      const amplifier = new Computer([...instructions]);
      const buffer = [permutation[i]];

      if (i === 0) {
        buffer.push(INITIAL_SIGNAL);
      }

      memoryBuffers.push(buffer);
      amplifiers.push(amplifier);
    }

    amplifiers.forEach((amplifier, index) => {
      amplifier.setInput(
        memoryBuffers[(index + amplifierCount - 1) % amplifierCount]
      );
      amplifier.setOutput(memoryBuffers[(index + 1) % amplifierCount]);
    });

    const lastAmplifier = amplifiers[amplifierCount - 1];

    while (!lastAmplifier.didReachHalt()) {
      amplifiers.forEach(amplifier => {
        amplifier.execute();
      });
    }

    const lastOutput = lastAmplifier.readOutput()[0];

    if (lastOutput > maxOutput) {
      maxOutput = lastOutput;
    }
  });

  return maxOutput;
};
