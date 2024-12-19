import { IContractTimestamped } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { contractStatus } from '../Contracts/ContractStatus';
import { contractSubtypes } from '../Contracts/ContractTypes';

export type SortByKey =
  | 'pay'
  | 'title'
  | 'type'
  | 'status'
  | 'location'
  | 'created'
  | 'timeRemaining';

export type SortOption<T, K extends keyof T = keyof T> = {
  key: K;
  value: string;
  label: string;
  order?: Array<T[K]>;
  secondaryKey?: keyof T | Array<keyof T>;
  secondaryOrder?: Array<T[K]>;
};

export const contractSortGroup: SortOption<IContractTimestamped>[] = [
  { key: 'title', value: 'title', label: 'Title' },
  {
    key: 'subtype',
    value: 'type',
    label: 'Type',

    order: contractSubtypes,
  },
  {
    key: 'status',
    value: 'status',
    label: 'Status',

    order: contractStatus,
    secondaryKey: ['bidDate', 'startDate', 'endDate'],
  },
  {
    key: 'defaultPay',
    value: 'pay',
    label: 'Pay',
    secondaryKey: 'isBonusPay',
    secondaryOrder: [true, false],
  },
  { key: 'createdAt', value: 'created', label: 'Created' },
];

export const sortGroupMap: Record<string, SortOption<IContractTimestamped>[]> = {
  contracts: contractSortGroup,
};
