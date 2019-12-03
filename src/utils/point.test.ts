import Point from "./point";

describe("point", () => {
  it("can add x values", () => {
    const point = new Point(1, 2);

    const nextPoint = point.add(new Point(1, 0));

    expect(nextPoint.toString()).toEqual("(2, 2)");
  });

  it("can add y values", () => {
    const point = new Point(1, 2);

    const nextPoint = point.add(new Point(0, 1));

    expect(nextPoint.toString()).toEqual("(1, 3)");
  });

  it("can add negative values", () => {
    const point = new Point(1, 2);

    const nextPoint = point.add(new Point(-1, -1));

    expect(nextPoint.toString()).toEqual("(0, 1)");
  });
});
