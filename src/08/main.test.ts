import input from "./input";
import Image, { partOne, partTwo } from "./main";

describe("image", () => {
  it("creates two layers from example input", () => {
    const image = new Image(3, 2, "123456789012");
    expect(image.toString()).toEqual(
      "[[1, 2, 3, 4, 5, 6], [7, 8, 9, 0, 1, 2]]"
    );
  });
});

describe("solution", () => {
  it("solves part one", () => {
    expect(partOne(input)).toBe(1596);
  });

  it("solves part two", () => {
    expect(partTwo(input)).toBe(`x    xxx  xxx   xx  xxxx 
x    x  x x  x x  x x    
x    xxx  x  x x    xxx  
x    x  x xxx  x    x    
x    x  x x x  x  x x    
xxxx xxx  x  x  xx  xxxx 
`);
  });
});
