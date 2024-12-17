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

export type SortOption<
  T,
  KeyType = T[keyof T],
  SecondaryKey extends keyof T = keyof T,
  SecondaryType = T[SecondaryKey],
> = {
  key: keyof T;
  value: SortByKey;
  label: string;
  type: KeyType;
  order?: Array<KeyType>;
  secondaryKey?: SecondaryKey | Array<SecondaryKey>;
  secondaryType?: SecondaryType;
  secondaryOrder?: Array<SecondaryType>;
};

export const contractSortGroup: SortOption<IContractTimestamped>[] = [
  { key: 'title', value: 'title', label: 'Title', type: 'string' },
  {
    key: 'subtype',
    value: 'type',
    label: 'Type',
    type: 'string',
    order: contractSubtypes,
  },
  {
    key: 'status',
    value: 'status',
    label: 'Status',
    type: 'string',
    order: contractStatus,
    secondaryKey: ['bidDate', 'startDate', 'endDate'],
    secondaryType: InstanceType<typeof Date>,
  },
  {
    key: 'defaultPay',
    value: 'pay',
    label: 'Pay',
    type: 'number',
    secondaryKey: 'isBonusPay',
    secondaryType: false,
    secondaryOrder: [true, false],
  },
  { key: 'createdAt', value: 'created', label: 'Created', type: Date },
];
