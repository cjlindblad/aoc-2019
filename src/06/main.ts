class SpaceObject {
  public readonly name: string;
  public innerObject?: SpaceObject;
  public readonly outerObjects: SpaceObject[];

  public constructor(name: string) {
    this.name = name;
    this.innerObject = null;
    this.outerObjects = [];
  }

  public toString() {
    return this.name;
  }
}

export default class OrbitMap {
  private objects: SpaceObject[];
  private objectsByName: { [name: string]: SpaceObject };

  constructor(instructions: string[]) {
    this.objects = [];
    this.objectsByName = {};

    this.createObjects(instructions);
  }

  private createObjects(instructions: string[]) {
    instructions.forEach(instruction => {
      const [innerObjectName, outerObjectName] = instruction.split(")");
      const innerObject = this.getOrCreateObjectByName(innerObjectName);
      const outerObject = this.getOrCreateObjectByName(outerObjectName);
      innerObject.outerObjects.push(outerObject);
      if (outerObject.innerObject) {
        throw new Error(
          `Tried to add ${innerObject.name} to ${outerObject.name}, but it already contained ${outerObject.innerObject.name}`
        );
      }
      outerObject.innerObject = innerObject;
    });
  }

  private getOrCreateObjectByName(objectName: string) {
    let object: SpaceObject = this.objectsByName[objectName];
    if (!object) {
      object = new SpaceObject(objectName);

      this.objects.push(object);
      this.objectsByName[objectName] = object;
    }

    return object;
  }

  public getPathToCenter(from: SpaceObject) {
    const names: string[] = [];
    let currentObject = from;

    while (currentObject.name !== "COM") {
      names.push(currentObject.name);
      currentObject = currentObject.innerObject;
    }

    return names;
  }

  public solvePartOne() {
    let indirectOrbits = 0;
    this.objects.forEach(object => {
      const pathToCenter = this.getPathToCenter(object);
      indirectOrbits += pathToCenter.length;
    });

    return indirectOrbits;
  }

  public solvePartTwo() {
    const fromObject = this.objectsByName["YOU"].innerObject;
    const toObject = this.objectsByName["SAN"].innerObject;

    const fromPath = this.getPathToCenter(fromObject);
    const toPath = this.getPathToCenter(toObject);

    const uniqueFromPath = fromPath.filter(name => !toPath.includes(name));
    const uniqueToPath = toPath.filter(name => !fromPath.includes(name));

    return uniqueFromPath.length + uniqueToPath.length;
  }

  public toString() {
    const objects = this.objects.map(object => object.toString()).join(",");
    return `[${objects}]`;
  }
}
