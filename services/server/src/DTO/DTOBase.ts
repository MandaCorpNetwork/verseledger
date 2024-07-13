import { Model } from 'sequelize-typescript';

export abstract class DTOBase<T> {
  public partial = false;
  abstract __type: string;
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
              props[key].map((v: any) =>
                v != null ? new contstructorMap[key](v) : null,
              )
            : props[key] != null
              ? new contstructorMap[key](props[key])
              : null
          : props[key];
      if (value == null) continue;
      if (typeof value === 'function') continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[key] = value;
    }
  }
}
