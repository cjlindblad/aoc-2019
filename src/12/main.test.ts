import Moon, { partOne } from "./main";

const input = [
  [4, 1, 1],
  [11, -18, -1],
  [-2, -10, -4],
  [-7, -2, 14]
];

describe("moon", () => {
  it("moves by its velocity", () => {
    const moon = new Moon({ x: 1, y: -1, z: -1 }, { x: 1, y: -1, z: 1 });

    moon.move();

    expect(moon.toString()).toEqual("<x=2, y=-2, z=0>, <x=1, y=-1, z=1>");
  });

  it("calculates kinetic energy", () => {
    const moon = new Moon({ x: 0, y: 0, z: 0 }, { x: -5, y: 0, z: 5 });

    expect(moon.calculacteKineticEnergy()).toBe(10);
  });

  it("calculates potential energy", () => {
    const moon = new Moon({ x: -5, y: 0, z: 5 }, { x: 0, y: 0, z: 0 });

    expect(moon.calculatePotentialEnergy()).toBe(10);
  });

  it("applies gravity from other moon", () => {
    const moon = new Moon({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 });
    const other = new Moon({ x: 2, y: 1, z: 3 }, { x: 0, y: 0, z: 0 });

    moon.applyGravityFrom(other);

    expect(moon.toString()).toEqual("<x=1, y=2, z=3>, <x=1, y=-1, z=0>");
  });
});

describe("part one", () => {
  it("solves test input", () => {
    const input = [
      [-8, -10, 0],
      [5, 5, 10],
      [2, -7, 3],
      [9, -8, -3]
    ];
    expect(partOne(input, 100)).toBe(1940);
  });

  it("solves test part one", () => {
    expect(partOne(input, 1000)).toBe(9493);
  });
});
