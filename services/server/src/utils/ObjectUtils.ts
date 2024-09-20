/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Update {
  oldValue: any;
  newValue: any;
}

export interface ObjectDiff {
  added: {} | ObjectDiff;
  updated: {
    [propName: string]: Update | ObjectDiff;
  };
  removed: {} | ObjectDiff;
  unchanged: {} | ObjectDiff;
}

export class ObjectUtils {
  /**
   * @return if obj is an Object, including an Array.
   */
  static isObject(obj: any) {
    return obj !== null && typeof obj === 'object';
  }

  /**
   * @param oldObj The previous Object or Array.
   * @param newObj The new Object or Array.
   * @param deep If the comparison must be performed deeper than 1st-level properties.
   * @return A difference summary between the two objects.
   */
  static diff(oldObj: any, newObj: any, deep = false): ObjectDiff {
    const added = {};
    const updated = {};
    const removed = {};
    const unchanged = {};
    for (const oldProp in oldObj) {
      if (Object.prototype.hasOwnProperty.call(oldObj, oldProp)) {
        const newPropValue = newObj[oldProp];
        const oldPropValue = oldObj[oldProp];
        if (Object.prototype.hasOwnProperty.call(newObj, oldProp)) {
          if (newPropValue === oldPropValue) {
            // @ts-expect-error Index {}
            unchanged[oldProp] = oldPropValue;
          } else {
            // @ts-expect-error Index {}
            updated[oldProp] =
              deep &&
              ObjectUtils.isObject(oldPropValue) &&
              ObjectUtils.isObject(newPropValue)
                ? ObjectUtils.diff(oldPropValue, newPropValue, deep)
                : { newValue: newPropValue };
          }
        } else {
          // @ts-expect-error Index {}
          removed[oldProp] = oldPropValue;
        }
      }
    }
    for (const newProp in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, newProp)) {
        const oldPropValue = oldObj[newProp];
        const newPropValue = newObj[newProp];
        if (Object.prototype.hasOwnProperty.call(oldObj, newProp)) {
          if (oldPropValue !== newPropValue) {
            if (!deep || !ObjectUtils.isObject(oldPropValue)) {
              // @ts-expect-error Index {}
              updated[newProp].oldValue = oldPropValue;
            }
          }
        } else {
          // @ts-expect-error Index {}
          added[newProp] = newPropValue;
        }
      }
    }
    return { added, updated, removed, unchanged };
  }
}
