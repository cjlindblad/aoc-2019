import Computer from "../utils/computer";
import Point from "../utils/point";

enum Color {
  Black = 0,
  White = 1
}

enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3
}

export default class PaintRobot {
  private brain: Computer;
  private cameraPosition: Point;
  private grid: number[][];
  private direction: Direction;
  private minX: number;
  private minY: number;
  private maxX: number;
  private maxY: number;
  private paintedPanels: number;

  public constructor(program: number[], startColor = 0) {
    this.brain = new Computer([...program]);
    this.cameraPosition = new Point(0, 0);
    this.grid = [];
    this.direction = Direction.Up;
    this.minX = Number.MAX_SAFE_INTEGER;
    this.minY = Number.MAX_SAFE_INTEGER;
    this.maxX = Number.MIN_SAFE_INTEGER;
    this.maxY = Number.MIN_SAFE_INTEGER;
    this.paintedPanels = 0;

    if (startColor === 1) {
      this.grid[0] = [];
      this.grid[0][0] = 1;
    }
  }

  public getColorAtPosition(x: number, y: number) {
    if (this.grid[x] === undefined || this.grid[x][y] === undefined) {
      return Color.Black;
    }

    return this.grid[x][y];
  }

  public paintNextPanel() {
    if (this.brain.didReachHalt()) {
      return;
    }

    const { x, y } = this.cameraPosition;

    const input = [this.getColorAtPosition(x, y)];
    this.brain.setInput(input);
    this.brain.execute();
    const [colorInstruction, directionInstruction] = this.brain.readOutput();
    this.brain.setOutput([]);

    if (this.grid[x] === undefined) {
      this.grid[x] = [];
    }
    if (this.grid[x][y] === undefined) {
      this.paintedPanels++;
    }
    this.grid[x][y] = colorInstruction;

    if (directionInstruction === 0) {
      this.direction = (this.direction - 1 + 4) % 4;
    } else {
      this.direction = (this.direction + 1) % 4;
    }

    this.moveCamera();
  }

  private moveCamera() {
    switch (this.direction) {
      case Direction.Up:
        this.cameraPosition = this.cameraPosition.add(new Point(0, -1));
        break;
      case Direction.Right:
        this.cameraPosition = this.cameraPosition.add(new Point(1, 0));
        break;
      case Direction.Down:
        this.cameraPosition = this.cameraPosition.add(new Point(0, 1));
        break;
      case Direction.Left:
        this.cameraPosition = this.cameraPosition.add(new Point(-1, 0));
        break;
      default:
        throw new Error(`Invalid direction - ${this.direction}`);
    }

    const { x, y } = this.cameraPosition;

    if (x < this.minX) {
      this.minX = x;
    }
    if (x > this.maxX) {
      this.maxX = x;
    }
    if (y < this.minY) {
      this.minY = y;
    }
    if (y > this.maxY) {
      this.maxY = y;
    }
  }

  public paintAllInstructions() {
    while (!this.brain.didReachHalt()) {
      this.paintNextPanel();
    }
  }

  public getPaintedPanels() {
    return this.paintedPanels;
  }

  public toString() {
    let output = "";

    for (let y = this.minY; y <= this.maxY; y++) {
      for (let x = this.minX; x <= this.maxX; x++) {
        const color = this.getColorAtPosition(x, y);
        if (color === Color.White) {
          output += "#";
        } else {
          output += ".";
        }
      }
      output += "\n";
    }

    return output;
  }
}
