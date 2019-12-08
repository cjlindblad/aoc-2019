class Layer {
  private pixels: number[];

  public constructor(pixels: number[]) {
    this.pixels = pixels;
  }

  public getPixelCount(targetPixel: number) {
    return this.pixels.filter(pixel => pixel === targetPixel).length;
  }

  public toString() {
    return `[${this.pixels.join(", ")}]`;
  }
}

export default class Image {
  public readonly layers: Layer[];

  public constructor(width: number, height: number, input: string) {
    const pixelsPerLayer = width * height;
    const inputPixels = input.split("").map(c => Number(c));

    this.layers = [];

    while (inputPixels.length > 0) {
      const pixelSlice = inputPixels.splice(0, pixelsPerLayer);
      const layer = new Layer(pixelSlice);
      this.layers.push(layer);
    }
  }

  public toString() {
    return `[${this.layers.map(layer => layer.toString()).join(", ")}]`;
  }
}

export const partOne = (input: string) => {
  const image = new Image(25, 6, input);
  let targetLayer = image.layers[0];
  let zeroPixels = targetLayer.getPixelCount(0);

  for (let i = 1; i < image.layers.length; i++) {
    const currentLayer = image.layers[i];
    const currentZeroPixels = currentLayer.getPixelCount(0);

    if (currentZeroPixels < zeroPixels) {
      zeroPixels = currentZeroPixels;
      targetLayer = currentLayer;
    }
  }

  const ones = targetLayer.getPixelCount(1);
  const twos = targetLayer.getPixelCount(2);

  return ones * twos;
};
