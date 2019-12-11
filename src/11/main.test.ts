import PaintRobot from "./main";
import input from "./input";

describe("paint robot", () => {
  it("solves part one", () => {
    const robot = new PaintRobot(input.split(",").map(e => Number(e)));
    robot.paintAllInstructions();
    expect(robot.getPaintedPanels()).toBe(1564);
  });

  it("solves part two", () => {
    const robot = new PaintRobot(
      input.split(",").map(e => Number(e)),
      1
    );
    robot.paintAllInstructions();
    const output = robot.toString();
    const expectedOutput = `.###..####.####.###...##..####.####.###....
.#..#.#....#....#..#.#..#.#....#....#..#...
.#..#.###..###..#..#.#....###..###..###....
.###..#....#....###..#....#....#....#..#...
.#.#..#....#....#....#..#.#....#....#..#...
.#..#.#....####.#.....##..#....####.###....
`;
    expect(output).toBe(expectedOutput);
  });
});
