/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class Mapper<_ArtifactType, _DTOType> {
  // public static toDomain (raw: any): T;
  // public static toDTO(_t: ArtifactType): DTOType;
  // public static toPersistence (t: T): any;
  public static map(_v: any): any {
    throw new Error('Not Implemented');
  }
}
