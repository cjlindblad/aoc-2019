import Computer from "../utils/computer";
import { generatePermutations } from "../utils/permutations";

export const solver = (instructions: number[], phaseSettings: number[]) => {
  const phaseSettingPermutations = generatePermutations(phaseSettings);

  let maxOutput = Number.MIN_SAFE_INTEGER;

  phaseSettingPermutations.forEach(permutation => {
    const ampA = new Computer([...instructions]);
    const ampB = new Computer([...instructions]);
    const ampC = new Computer([...instructions]);
    const ampD = new Computer([...instructions]);
    const ampE = new Computer([...instructions]);

    const eaBuffer = [permutation[0], 0];
    const abBuffer = [permutation[1]];
    const bcBuffer = [permutation[2]];
    const cdBuffer = [permutation[3]];
    const deBuffer = [permutation[4]];

    ampA.setInput(eaBuffer);
    ampA.setOutput(abBuffer);

    ampB.setInput(abBuffer);
    ampB.setOutput(bcBuffer);

    ampC.setInput(bcBuffer);
    ampC.setOutput(cdBuffer);

    ampD.setInput(cdBuffer);
    ampD.setOutput(deBuffer);

    ampE.setInput(deBuffer);
    ampE.setOutput(eaBuffer);

    while (!ampE.didReachHalt()) {
      ampA.execute();
      ampB.execute();
      ampC.execute();
      ampD.execute();
      ampE.execute();
    }

    const outputE = ampE.readOutput()[0];

    if (outputE > maxOutput) {
      maxOutput = outputE;
    }
  });

  return maxOutput;
};
