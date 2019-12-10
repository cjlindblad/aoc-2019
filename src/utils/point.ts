export default class Point {
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static degrees(p1: Point, p2: Point) {
    const degrees = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

    return (degrees + 360 + 90) % 360;
  }

  public add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  public manhattanDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  public equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  public toString() {
    return `(${this.x}, ${this.y})`;
  }
}
