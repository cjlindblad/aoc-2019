import Points from "./points";
import Point from "./point";

describe("points", () => {
  it("finds a given point", () => {
    const points = new Points();
    points.add(new Point(1, 2));
    points.add(new Point(2, 3));
    points.add(new Point(3, 4));

    const result = points.contains(new Point(2, 3));

    expect(result).toBe(true);
  });

  it("can't find non existing point", () => {
    const points = new Points();
    points.add(new Point(1, 2));
    points.add(new Point(2, 3));

    const result = points.contains(new Point(3, 4));

    expect(result).toBe(false);
  });
});
