import Point from "./point";

export default class Points {
  public readonly points: Point[] = [];
  private coordinates: { [x: string]: boolean } = {};

  public add(point: Point) {
    this.points.push(point);
    this.coordinates[point.toString()] = true;
  }

  public contains(point: Point) {
    return Boolean(this.coordinates[point.toString()]);
  }

  public getIntersectionsWith(other: Points) {
    const intersections: Points = new Points();

    this.points.forEach(point => {
      if (other.contains(point)) {
        intersections.add(point);
      }
    });

    return intersections;
  }

  public stepsTo(point: Point) {
    for (let i = 0; i < this.points.length; i++) {
      const currentPoint = this.points[i];

      if (currentPoint.x === point.x && currentPoint.y === point.y) {
        return i + 1;
      }
    }

    throw new Error(`Could not find point - ${point.toString()}`);
  }

  public sort(sort?: typeof manhattanSort) {
    const manhattanSort = (a: Point, b: Point) => {
      return a.manhattanDistance() - b.manhattanDistance();
    };

    this.points.sort(sort || manhattanSort);
    return this;
  }

  public toString(): string {
    const pointsString = this.points.map(point => point.toString()).join(", ");

    return `[${pointsString}]`;
  }
}
