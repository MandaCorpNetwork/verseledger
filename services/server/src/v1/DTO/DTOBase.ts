/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mapper } from '@Infrastructure/Mapper';
import { Model } from 'sequelize-typescript';

export abstract class DTOBase<T> {
  abstract __partial: boolean;
  abstract __type: string;
  protected mapProperties(
    propsRaw: T,

    contstructorMap: {
      [key: string]:
        | (new (input: any) => any)
        | typeof Mapper<any, any>
        | { mapper: typeof Mapper<any, any>; keepArray: boolean };
    } = {},
  ) {
    const props = propsRaw instanceof Model ? propsRaw.toJSON() : propsRaw;

    for (const key of Object.keys(props as Record<string, any>)) {
      let value;
      if (contstructorMap[key] == null) {
        value = props[key];
      } else {
        let mapper: any;
        if (contstructorMap[key] instanceof Mapper) {
          mapper = (contstructorMap[key] as any).map;
        } else if ((contstructorMap[key] as any).mapper) {
          mapper = contstructorMap[key] as any;
        } else {
          mapper = (input: any) => new (contstructorMap[key] as any)(input);
        }
        if (Array.isArray(props[key]) && mapper.keepArray != true) {
          value = props[key].map((v: any) => (v != null ? mapper(v) : null));
        } else {
          if (mapper.keepArray) mapper = mapper.mapper.map;
          value = props[key] != null ? mapper(props[key]) : null;
        }
      }
      if (value == null) continue;
      if (typeof value === 'function') continue;
      (this as any)[key] = value;
    }
  }
}
