class Layer {
  private pixels: number[];

  public constructor(pixels: number[]) {
    this.pixels = pixels;
  }

  public getPixelCount(targetPixel: number) {
    return this.pixels.filter(pixel => pixel === targetPixel).length;
  }

  public pixelAt(index: number) {
    return this.pixels[index];
  }

  public toString() {
    return `[${this.pixels.join(", ")}]`;
  }
}

export default class Image {
  public readonly layers: Layer[];
  private mergedLayer: Layer;
  private width: number;
  private height: number;

  public constructor(width: number, height: number, input: string) {
    const pixelsPerLayer = width * height;
    this.width = width;
    this.height = height;
    const inputPixels = input.split("").map(c => Number(c));

    this.layers = [];

    while (inputPixels.length > 0) {
      const pixelSlice = inputPixels.splice(0, pixelsPerLayer);
      const layer = new Layer(pixelSlice);
      this.layers.push(layer);
    }

    const mergedPixels = [];

    for (let i = 0; i < pixelsPerLayer; i++) {
      let mergedPixel = 2;
      for (const layer of this.layers) {
        mergedPixel = layer.pixelAt(i);
        if (mergedPixel !== 2) {
          break;
        }
      }
      mergedPixels.push(mergedPixel);
    }
    this.mergedLayer = new Layer(mergedPixels);
  }

  public toString() {
    return `[${this.layers.map(layer => layer.toString()).join(", ")}]`;
  }
  public decode() {
    let image = "";
    let i = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const pixel = this.mergedLayer.pixelAt(i);
        if (pixel === 2 || pixel === 0) {
          image += " ";
        } else {
          image += "x";
        }
        i++;
      }
      image += "\n";
    }

    return image;
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

export const partTwo = (input: string) => {
  const image = new Image(25, 6, input);
  return image.decode();
};
