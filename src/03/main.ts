import Points from "../utils/points";
import Point from "../utils/point";

enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R"
}

export default class Wire {
  public readonly points: Points;

  public constructor(instructions?: string[]) {
    this.points = new Points();

    if (instructions && instructions.length > 0) {
      this.initializePoints(instructions);
    }
  }

  private initializePoints(instructions: string[]) {
    let currentPoint = new Point(0, 0);

    const directions = {
      [Direction.Up]: new Point(0, -1),
      [Direction.Down]: new Point(0, 1),
      [Direction.Left]: new Point(-1, 0),
      [Direction.Right]: new Point(1, 0)
    };

    instructions.forEach(instruction => {
      const directionCharacter = instruction.substring(0, 1);
      const steps = Number(instruction.substring(1));

      const direction = directions[directionCharacter];

      if (!direction) {
        throw new Error(`Invalid direction character - ${directionCharacter}`);
      }

      for (let i = 0; i < steps; i++) {
        currentPoint = currentPoint.add(direction);
        this.points.add(currentPoint);
      }
    });
  }

  public getIntersectionsWith(wire: Wire): Points {
    return this.points.getIntersectionsWith(wire.points);
  }

  public stepsTo(point: Point) {
    return this.points.stepsTo(point);
  }

  public toString() {
    return this.points.toString();
  }
}

export const partOne = (input: string) => {
  const instructions = input.split("\n");
  const instructionsA = instructions[0].split(",");
  const instructionsB = instructions[1].split(",");

  const wireA = new Wire(instructionsA);
  const wireB = new Wire(instructionsB);

  const intersections = wireA.getIntersectionsWith(wireB);

  intersections.sort();

  const closestIntersection = intersections.points[0];

  return closestIntersection.manhattanDistance();
};

export const partTwo = (input: string) => {
  const instructions = input.split("\n");
  const instructionsA = instructions[0].split(",");
  const instructionsB = instructions[1].split(",");

  const wireA = new Wire(instructionsA);
  const wireB = new Wire(instructionsB);

  const intersections = wireA.getIntersectionsWith(wireB);

  const shortestIntersectionDistance = intersections.points
    .map(
      intersection => wireA.stepsTo(intersection) + wireB.stepsTo(intersection)
    )
    .sort((a, b) => a - b)[0];

  return shortestIntersectionDistance;
};
