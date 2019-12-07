import { generatePermutations } from "./permutations";

describe("permutations", () => {
  it("returns single element", () => {
    const input = [1];
    const permutations = generatePermutations(input);
    expect(permutations).toEqual([[1]]);
  });

  it("returns permutations of two elements", () => {
    const input = [1, 2];
    const permutations = generatePermutations(input);
    expect(permutations).toEqual([
      [2, 1],
      [1, 2]
    ]);
  });

  it("returns permutations of three elements", () => {
    const input = [1, 2, 3];
    const permutations = generatePermutations(input);
    expect(permutations).toEqual([
      [2, 3, 1],
      [3, 2, 1],
      [3, 1, 2],
      [1, 3, 2],
      [2, 1, 3],
      [1, 2, 3]
    ]);
  });
});
