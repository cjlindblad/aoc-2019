import { AsteroidMap } from "./main";
import Point from "../utils/point";
import input from "./input";

describe("asteroid map", () => {
  it("constructs map correctly", () => {
    const input = `.#..#
.....
#####
....#
...##`;

    const map = new AsteroidMap(input);

    expect(map.toString()).toEqual(input);
  });

  it("finds asteroids in line", () => {
    const input = `.#..#
.....
#####
....#
...##`;

    const map = new AsteroidMap(input);
    const asteroidLine = map.getAsteroidLine(new Point(3, 4), new Point(1, 0));

    expect(asteroidLine.length).toBe(2);
    expect(asteroidLine[0].x).toBe(2);
    expect(asteroidLine[0].y).toBe(2);
    expect(asteroidLine[1].x).toBe(1);
    expect(asteroidLine[1].y).toBe(0);
  });

  it("finds visible asteroids from point", () => {
    const input = `.#..#
.....
#####
....#
...##`;

    const map = new AsteroidMap(input);

    expect(map.asteroidsVisibleFrom(new Point(3, 4))).toEqual(8);
  });
});

describe("solution", () => {
  it("solves given test case for part one", () => {
    const input = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

    const map = new AsteroidMap(input);
    const result = map.findAsteroidWithBestVisibility();

    expect(result.asteroid.x).toBe(5);
    expect(result.asteroid.y).toBe(8);
    expect(result.visibleAsteroids).toBe(33);
  });

  it("solves part one", () => {
    const map = new AsteroidMap(input);
    expect(map.findAsteroidWithBestVisibility().visibleAsteroids).toBe(276);
  });

  it("solves part two example", () => {
    const input = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

    const map = new AsteroidMap(input);
    const result = map.partTwo();

    expect(`${result.x}, ${result.y}`).toBe("8, 2");
  });

  it("solves part two", () => {
    const map = new AsteroidMap(input);
    const result = map.partTwo();
    expect(result.x * 100 + result.y).toBe(1321);
  });
});
