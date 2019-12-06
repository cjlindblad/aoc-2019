class SpaceObject {
  public readonly name: string;
  public readonly innerObjects: SpaceObject[];
  public readonly outerObjects: SpaceObject[];

  public constructor(name: string) {
    this.name = name;
    this.innerObjects = [];
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

    instructions.forEach(instruction => {
      const [innerObjectName, outerObjectName] = instruction.split(")");
      const innerObject = this.getOrCreateObjectByName(innerObjectName);
      const outerObject = this.getOrCreateObjectByName(outerObjectName);
      outerObject.innerObjects.push(innerObject);
      innerObject.outerObjects.push(outerObject);
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

  public hasObjectsWithMultipleChildren() {
    for (const object of this.objects) {
      if (object.innerObjects.length > 1) {
        return true;
      }
    }
    return false;
  }

  public hasObjectsWithMultipleParents() {
    for (const object of this.objects) {
      if (object.outerObjects.length > 1) {
        return true;
      }
    }
    return false;
  }

  public solvePartOne() {
    let indirectOrbits = 0;
    this.objects.forEach(object => {
      let currentObject = object;
      while (currentObject.name !== "COM") {
        indirectOrbits++;
        if (currentObject.innerObjects.length > 1) {
          throw new Error(
            `Unexpected number of inner objects for object ${currentObject.name} - ${currentObject.innerObjects.length}`
          );
        }
        currentObject = currentObject.innerObjects[0];
      }
    });

    return indirectOrbits;
  }

  public toString() {
    const objects = this.objects.map(object => object.toString()).join(",");
    return `[${objects}]`;
  }
}
