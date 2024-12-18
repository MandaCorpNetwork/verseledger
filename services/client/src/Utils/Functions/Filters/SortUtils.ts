import { IContractStatus } from '@Common/Definitions/Contracts/ContractStatus';
import { SortOption } from '@Common/Definitions/Search/SortOptions';
import { IContractTimestamped } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { checkType } from '../Dev/TypeCheck';
import { contractStatusConditionalFilter } from './ConditionalFilters';

/**
 * ### Modular Conditional Secondary Sorting
 * @description A function that checks what object is being sorted and what it is primarly being sorted by in order to run a conditional function to determine what key it may be secondarily sorted by.
 * @param item The object that is being Sorted
 * @param primaryValue - A passable conditional Parameter
 * @param secondaryKeys - The Array of Keys used as options for the conditional functions
 * @param sortBy - A conditional value for determining which functions to run
 */
function conditionalSecondaryKeyResolver<T>(
  item: T,
  primaryValue: T[keyof T],
  secondaryKeys: Array<keyof T>,
  sortBy: string,
): keyof T | undefined {
  if (checkType('IContractTimestamped', item)) {
    if (sortBy === 'status') {
      const key = contractStatusConditionalFilter(
        primaryValue as IContractStatus,
        secondaryKeys as Array<keyof IContractTimestamped>,
      );
      return key ? (key as keyof T) : undefined;
    }
  }

  return undefined;
}

/** Function to Procees the resolution of Secondary keys within ValueCompare */
function resolveSecondaryKey<T>(
  item: T,
  primaryValue: T[keyof T],
  secondaryKey: keyof T | Array<keyof T>,
  sortBy: string,
): keyof T | undefined {
  if (!Array.isArray(secondaryKey)) return secondaryKey;
  return conditionalSecondaryKeyResolver(item, primaryValue, secondaryKey, sortBy);
}

function compareValues<T>(a: T | undefined, b: T | undefined, customOrder?: T[]): number {
  if (customOrder) {
    const indexA = customOrder.indexOf(a as T);
    const indexB = customOrder.indexOf(b as T);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
  }

  if (a === b) return 0;
  if (a == undefined) return 1;
  if (b == undefined) return -1;

  return a < b ? -1 : 1;
}

export function dynamicSort<T>(
  data: T[],
  sortOption: SortOption<T>,
  isDescending: boolean = false,
): T[] {
  const { key, order, secondaryKey, secondaryOrder, value } = sortOption;

  return [...data].sort((a, b) => {
    //Step 1. Sort by PrimaryKey
    const primaryResult = compareValues(a[key], b[key], order);
    if (primaryResult !== 0) return isDescending ? -primaryResult : primaryResult;

    //Step 2. Sort by the Seondary Key (if provided)
    if (secondaryKey) {
      const secondaryA = resolveSecondaryKey(a, a[key], secondaryKey, value);
      const secondaryB = resolveSecondaryKey(b, b[key], secondaryKey, value);

      const secondaryResult = compareValues(
        a[secondaryA as keyof T],
        b[secondaryB as keyof T],
        secondaryOrder,
      );

      if (secondaryResult !== 0) {
        return isDescending ? -secondaryResult : secondaryResult;
      }
    }

    return 0;
  });
}
