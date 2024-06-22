import { Model } from 'sequelize-typescript';

export class DTOBase<T> {
  public partial = false;
  protected mapProperties(
    propsRaw: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contstructorMap: { [key: string]: new (input: any) => any } = {},
  ) {
    const props = propsRaw instanceof Model ? propsRaw.toJSON() : propsRaw;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const key of Object.keys(props as Record<string, any>)) {
      const value =
        contstructorMap[key] != null
          ? Array.isArray(props[key])
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              props[key].map((v: any) => new contstructorMap[key](v))
            : new contstructorMap[key](props[key])
          : props[key];
      if (typeof value === 'function') continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[key] = value;
    }
  }
}
