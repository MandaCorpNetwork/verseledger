import { createId as createCuid } from '@paralleldrive/cuid2';

export enum IDPrefix {
  System = 'X-',
  User = 'U-',
}

export const createId = (prefix: IDPrefix = IDPrefix.System) => {
  return `${prefix}${createCuid()}`;
};
