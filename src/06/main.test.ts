import OrbitMap from "./main";
import input from "./input";

describe("orbit map", () => {
  it("creates nodes for supplied instructions", () => {
    const instructions = ["A)C", "A)B", "C)D"];

    const map = new OrbitMap(instructions);

    expect(map.toString()).toEqual("[A,C,B,D]");
  });
});

describe("solutions", () => {
  it("solves part one example input", () => {
    const instructions = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`.split("\n");

    const map = new OrbitMap(instructions);

    expect(map.solvePartOne()).toBe(42);
  });

  it("solves part one", () => {
    const instructions = input.split("\n");

    const map = new OrbitMap(instructions);

    expect(map.solvePartOne()).toBe(139597);
  });

  it("solves part two example input", () => {
    const instructions = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`.split("\n");

    const map = new OrbitMap(instructions);

    expect(map.solvePartTwo()).toBe(4);
  });

  it("solves part two", () => {
    const instructions = input.split("\n");

    const map = new OrbitMap(instructions);

    expect(map.solvePartTwo()).toBe(286);
  });
});
