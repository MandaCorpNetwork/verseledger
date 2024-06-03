import { createId } from '@paralleldrive/cuid2';
import { OwnerType } from './OwnerType';

export enum IdPrefix {
  System = 'X-',
  User = 'U-',
  Contract = 'C-',
  Bid = 'B-',
  Organization = 'O-',
  Membership = 'M-',
}

export class IdUtil {
  static IdPrefix = IdPrefix;

  public static IdLength = 26;

  public static getOwnerType(id: string) {
    if (id == null || id.trim().length != 26) return OwnerType.INVALID;
    if (id.startsWith(IdPrefix.System)) return OwnerType.System;
    if (id.startsWith(IdPrefix.User)) return OwnerType.User;
    if (id.startsWith(IdPrefix.Contract)) return OwnerType.Contract;
    if (id.startsWith(IdPrefix.Bid)) return OwnerType.User;
    if (id.startsWith(IdPrefix.Organization)) return OwnerType.Org;
    if (id.startsWith(IdPrefix.Membership)) return OwnerType.Org;
    return OwnerType.INVALID;
  }

  public static isValidId(id: string) {
    if (IdUtil.getOwnerType(id) === OwnerType.INVALID) return false;
    if (id.length !== 26) return false;
    //TODO: Check Characters
    return true;
  }

  public static generateId(type: IdPrefix = IdPrefix.System) {
    return `${type}${createId()}`;
  }

  public static generateUserID() {
    return IdUtil.generateId(IdPrefix.User);
  }

  public static generateSystemID() {
    return IdUtil.generateId(IdPrefix.System);
  }
  public static generateContractID() {
    return IdUtil.generateId(IdPrefix.Contract);
  }
  public static generateBidID() {
    return IdUtil.generateId(IdPrefix.Bid);
  }
  public static generateOrgID() {
    return IdUtil.generateId(IdPrefix.Organization);
  }
  public static generateMembershipID() {
    return IdUtil.generateId(IdPrefix.Membership);
  }
  public static expressRegex(type: IdPrefix = IdPrefix.System) {
    return `${type}[a-z0-9]{24}`;
  }
}
