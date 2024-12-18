import { IContractTimestamped } from 'vl-shared/src/schemas/contracts/ContractSchema';

/**
 * ### Contract Status Secondary Sorting
 * @description Function that determins what date field to sort by based on the Value of the Status Key being sorted.
 * @param primaryValue - The Value of the Contract.status acting as the condition to determine which secondary Key to use.
 * @param secondaryKeys  - 'bidDate' | 'startDate' | 'endDate' Keys to determine how to sort
 * @returns 'bidDate' | 'startDate' | 'endDate' | undefined
 */
export function contractStatusConditionalFilter(
  primaryValue: string,
  secondaryKeys: Array<keyof IContractTimestamped>,
): keyof IContractTimestamped | undefined {
  switch (primaryValue) {
    case 'BIDDING':
      return secondaryKeys.includes('bidDate') ? 'bidDate' : undefined;
    case 'PENDING':
      return secondaryKeys.includes('startDate') ? 'startDate' : undefined;
    case 'INPROGRESS':
    case 'COMPLETED':
    case 'CANCELED':
      return secondaryKeys.includes('endDate') ? 'endDate' : undefined;
    default:
      return;
  }
}
