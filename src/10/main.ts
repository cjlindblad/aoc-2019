import Point from "../utils/point";

const gcd = (a: number, b: number) => {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};

interface AsteroidByXY {
  [x: number]: { [y: number]: Point };
}

export class AsteroidMap {
  private width: number;
  private height: number;
  private asteroids: Point[];
  private asteroidsByXY: AsteroidByXY;

  public constructor(input: string) {
    const inputLines = input.split("\n");

    this.height = inputLines.length;
    this.width = inputLines[0].length;

    this.asteroids = [];
    this.asteroidsByXY = {};

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (inputLines[y][x] === "#") {
          const asteroid = new Point(x, y);
          this.asteroids.push(asteroid);
          if (!this.asteroidsByXY[x]) {
            this.asteroidsByXY[x] = {};
          }
          this.asteroidsByXY[x][y] = asteroid;
        }
      }
    }
  }

  public findAsteroidWithBestVisibility() {
    let visibleAsteroids = Number.MIN_SAFE_INTEGER;
    let asteroid: Point;

    this.asteroids.forEach(e => {
      const visible = this.asteroidsVisibleFrom(e);

      if (visible > visibleAsteroids) {
        visibleAsteroids = visible;
        asteroid = e;
      }
    });

    return {
      asteroid,
      visibleAsteroids
    };
  }

  public partTwo() {
    const station = this.findAsteroidWithBestVisibility().asteroid;
    const asteroidsByDegrees = this.getAsteroidsByDegrees(station);

    let iteration = 0;
    let index = 0;

    while (iteration < 199) {
      if (asteroidsByDegrees[index].asteroids.length === 0) {
        continue;
      }

      asteroidsByDegrees[index].asteroids.shift();

      iteration++;
      index = (index + 1) % asteroidsByDegrees.length;
    }

    return asteroidsByDegrees[index].asteroids[0];
  }

  public getAsteroidsByDegrees(source: Point) {
    const visitedAsteroidsByXY: AsteroidByXY = {};
    const asteroidsByDegrees: { degrees: number; asteroids: Point[] }[] = [];

    this.asteroids.forEach(asteroid => {
      if (source.equals(asteroid)) {
        return;
      }

      if (
        visitedAsteroidsByXY[asteroid.x] &&
        visitedAsteroidsByXY[asteroid.x][asteroid.y]
      ) {
        return;
      }

      const asteroidLine = this.getAsteroidLine(source, asteroid);
      asteroidLine.forEach(visibleAsteroid => {
        if (!visitedAsteroidsByXY[visibleAsteroid.x]) {
          visitedAsteroidsByXY[visibleAsteroid.x] = {};
        }
        visitedAsteroidsByXY[visibleAsteroid.x][
          visibleAsteroid.y
        ] = visibleAsteroid;
      });

      const degrees = Point.degrees(source, asteroidLine[0]);
      asteroidsByDegrees.push({ degrees, asteroids: asteroidLine });
    });

    asteroidsByDegrees.sort((a, b) => a.degrees - b.degrees);

    return asteroidsByDegrees;
  }

  public asteroidsVisibleFrom(source: Point) {
    let visibleAsteroids = 0;
    const visitedAsteroidsByXY: AsteroidByXY = {};

    this.asteroids.forEach(asteroid => {
      if (source.equals(asteroid)) {
        return;
      }

      if (
        visitedAsteroidsByXY[asteroid.x] &&
        visitedAsteroidsByXY[asteroid.x][asteroid.y]
      ) {
        return;
      }

      const asteroidLine = this.getAsteroidLine(source, asteroid);
      asteroidLine.forEach(visibleAsteroid => {
        if (!visitedAsteroidsByXY[visibleAsteroid.x]) {
          visitedAsteroidsByXY[visibleAsteroid.x] = {};
        }
        visitedAsteroidsByXY[visibleAsteroid.x][
          visibleAsteroid.y
        ] = visibleAsteroid;
      });

      visibleAsteroids += 1;
    });

    return visibleAsteroids;
  }

  public getAsteroidLine(source: Point, target: Point) {
    const deltaX = target.x - source.x;
    const deltaY = target.y - source.y;

    const divisor = Math.abs(gcd(deltaX, deltaY));

    const direction = new Point(deltaX / divisor, deltaY / divisor);

    let asteroidLine = [];
    let nextPoint = source.add(direction);

    while (
      nextPoint.x >= 0 &&
      nextPoint.x < this.width &&
      nextPoint.y >= 0 &&
      nextPoint.y < this.height
    ) {
      const possibleAsteroid =
        this.asteroidsByXY[nextPoint.x] &&
        this.asteroidsByXY[nextPoint.x][nextPoint.y];

      if (possibleAsteroid) {
        asteroidLine.push(possibleAsteroid);
      }

      nextPoint = nextPoint.add(direction);
    }

    return asteroidLine;
  }

  public toString() {
    let output = "";

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.asteroidsByXY[x] && this.asteroidsByXY[x][y]) {
          output += "#";
        } else {
          output += ".";
        }
      }

      if (y < this.height - 1) {
        output += "\n";
      }
    }

    return output;
  }
}
