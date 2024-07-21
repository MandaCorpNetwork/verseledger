/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op, type WhereOptions } from 'sequelize';

export const queryIn = <T>(values: T | T[]): WhereOptions | undefined => {
  if (values != null) {
    if (Array.isArray(values)) {
      switch ((values as Array<T>).length) {
        case 0:
          return undefined;
        case 1:
          return { [Op.eq as symbol]: values[0] };
        default:
          return { [Op.in as symbol]: values };
      }
    }
    return values;
  }
  return undefined;
};

export const optionalSet = <T extends Record<any, any>>(
  obj: T,
  key: string,
  value: any,
) => {
  if (value == null) return false;
  (obj as any)[key] = value;
  return true;
};
