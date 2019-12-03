export default class Point {
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  public manhattanDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  public toString() {
    return `(${this.x}, ${this.y})`;
  }
}
