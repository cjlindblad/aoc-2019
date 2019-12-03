import Wire, { partOne } from "./main";
import input from "./input";

describe("wire", () => {
  it("returns empty list with no input", () => {
    const wire = new Wire();

    expect(wire.toString()).toEqual("[]");
  });

  it("returns empty list with empty array input", () => {
    const wire = new Wire([]);

    expect(wire.toString()).toEqual("[]");
  });

  it("returns simple coordinates", () => {
    const instructions = ["U2", "R2", "D2", "L2"];

    const wire = new Wire(instructions);

    expect(wire.toString()).toEqual(
      "[(0, -1), (0, -2), (1, -2), (2, -2), (2, -1), (2, 0), (1, 0), (0, 0)]"
    );
  });

  it("finds intersections of two wires", () => {
    const wireA = new Wire(["U2", "R3", "U2"]);
    const wireB = new Wire(["R1", "U3", "R3"]);

    const intersections = wireA.getIntersectionsWith(wireB);

    expect(intersections.sort().toString()).toEqual("[(1, -2), (3, -3)]");
  });
});

describe("solutions", () => {
  it("solves part 1", () => {
    expect(partOne(input)).toEqual(399);
  });
});
