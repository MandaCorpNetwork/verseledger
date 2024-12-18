// import { SortOption } from '@Common/Definitions/Search/SortOptions';

// function dynamicSort<T>(
//   data: T[],
//   sortOption: SortOption<T>,
//   isDecending: boolean = false,
// ): T[] {
//   const { key, order, secondaryKey, secondaryOrder } = sortOption;

//   return [...data].sort((a, b) => {
//     const primaryResult = compareValue;
//   });
// }

// function compareValues<T>(a: T | undefined, b: T | undefined, customOrder?: T[]): number {
//   if (customOrder) {
//     const indexA = customOrder.indexOf(a as T);
//     const indexB = customOrder.indexOf(b as T);

//     if (indexA !== -1 && indexB !== -1) return indexA - indexB;
//     if (indexA !== -1) return -1;
//     if (indexB !== -1) return 1;
//   }

//   if (a === b) return 0;
//   if (a == undefined) return 1;
//   if (b == undefined) return -1;

//   return a < b ? -1 : 1;
// }

// function resolveSecondaryKey<T>(
//   item: T,
//   primaryValue: T[keyof T],
//   secondaryKey: keyof T | Array<keyof T>,
//   conditionalResolver?: (item: T, primaryValue: T[keyof T]) => keyof T | undefined,
// ): keyof T | undefined {

// }

// function conditionalSecondaryKeyResolver<T>(
//   item: T,
//   primaryKey: keyof,
//   primaryValue: T[keyof T],
//   secondaryKeys: Array<keyof T>,
//   sortBy: string
// ): keyof T | undefined {
//   if (typeof item === IContractTimestamped) {
//     if (sortBy === 'status') {
//       return contractStatusConditionalFilter
//     }
//   }
// }
