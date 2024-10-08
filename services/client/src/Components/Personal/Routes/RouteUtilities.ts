import { Float3 } from 'vl-shared/src/math';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

interface MappedLocation {
  location: ILocation;
  children: Map<string, MappedLocation>;
  parent: MappedLocation;
  get position(): Float3;
}

export function binaryLocationTree(locations: ILocation[]) {
  const entities = new Map<string, MappedLocation>();
  // Initialization of Nodes
  for (const location of locations) {
    const mPoint: MappedLocation = {
      location,
      children: new Map(),
      parent: null as unknown as MappedLocation,
      get position() {
        const myLocation = new Float3(location.x, location.y, location.z);
        const parentPosition = this.parent ? this.parent.position : new Float3();
        return myLocation.add(parentPosition);
      },
    };
    entities.set(mPoint.location.id, mPoint);
  }
  // Map Hookup
  entities.forEach((value: MappedLocation, key: string) => {
    const location = value.location;
    const entityArray = Array.from(entities);
    const parent: [string, MappedLocation] | undefined = entityArray.find(([, value]) => {
      return value.location.short_name === location.parent;
    });
    if (parent != null) {
      value.parent = parent[1];
      parent[1].children.set(key, value);
    }
  });
  return entities;
}

export function createDestID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
