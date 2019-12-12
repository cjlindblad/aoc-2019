interface Point {
  x: number;
  y: number;
  z: number;
}

export default class Moon {
  private position: Point;
  private velocity: Point;

  public constructor(position: Point, velocity: Point = { x: 0, y: 0, z: 0 }) {
    this.position = position;
    this.velocity = velocity;
  }

  public applyGravityFrom(other: Moon) {
    if (this.position.x > other.position.x) {
      this.velocity.x -= 1;
    }
    if (this.position.x < other.position.x) {
      this.velocity.x += 1;
    }
    if (this.position.y > other.position.y) {
      this.velocity.y -= 1;
    }
    if (this.position.y < other.position.y) {
      this.velocity.y += 1;
    }
    if (this.position.z > other.position.z) {
      this.velocity.z -= 1;
    }
    if (this.position.z < other.position.z) {
      this.velocity.z += 1;
    }
  }

  public move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }

  public calculacteKineticEnergy() {
    return (
      Math.abs(this.velocity.x) +
      Math.abs(this.velocity.y) +
      Math.abs(this.velocity.z)
    );
  }

  public calculatePotentialEnergy() {
    return (
      Math.abs(this.position.x) +
      Math.abs(this.position.y) +
      Math.abs(this.position.z)
    );
  }

  public toString() {
    return `<x=${this.position.x}, y=${this.position.y}, z=${this.position.z}>, <x=${this.velocity.x}, y=${this.velocity.y}, z=${this.velocity.z}>`;
  }
}

export const partOne = (input: number[][], steps: number) => {
  const moons: Moon[] = input.map(
    line => new Moon({ x: line[0], y: line[1], z: line[2] })
  );

  for (let i = 0; i < steps; i++) {
    for (
      let firstMoonIndex = 0;
      firstMoonIndex < moons.length;
      firstMoonIndex++
    ) {
      for (
        let secondMoonIndex = firstMoonIndex + 1;
        secondMoonIndex < moons.length;
        secondMoonIndex++
      ) {
        const firstMoon = moons[firstMoonIndex];
        const secondMoon = moons[secondMoonIndex];

        firstMoon.applyGravityFrom(secondMoon);
        secondMoon.applyGravityFrom(firstMoon);
      }
    }

    moons.forEach(moon => {
      moon.move();
    });
  }

  const totalEnergy = moons.reduce(
    (acc, cur) =>
      acc + cur.calculacteKineticEnergy() * cur.calculatePotentialEnergy(),
    0
  );

  return totalEnergy;
};

export const partTwo = (input: number[][]) => {
  const moons: Moon[] = input.map(
    line => new Moon({ x: line[0], y: line[1], z: line[2] })
  );

  const existingPositions: { [key: string]: boolean } = {};

  let iterations = 0;

  while (true && iterations < 4686774924) {
    for (
      let firstMoonIndex = 0;
      firstMoonIndex < moons.length;
      firstMoonIndex++
    ) {
      for (
        let secondMoonIndex = firstMoonIndex + 1;
        secondMoonIndex < moons.length;
        secondMoonIndex++
      ) {
        const firstMoon = moons[firstMoonIndex];
        const secondMoon = moons[secondMoonIndex];

        firstMoon.applyGravityFrom(secondMoon);
        secondMoon.applyGravityFrom(firstMoon);
      }
    }

    moons.forEach(moon => {
      moon.move();
    });

    const position = moons.map(moon => moon.toString()).join(",");

    if (existingPositions[position]) {
      break;
    }

    existingPositions[position] = true;

    iterations++;
  }

  return iterations;
};
