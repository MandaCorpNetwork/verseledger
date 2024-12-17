import { contractStatus } from '../Contracts/ContractStatus';
import { contractSubtypes } from '../Contracts/ContractTypes';

export type SortByKey =
  | 'pay'
  | 'title'
  | 'status'
  | 'location'
  | 'created'
  | 'timeRemaining';

export const sortOptions = {
  contract: [
    { key: 'title', value: 'title', label: 'Title', type: 'string' },
    {
      key: 'subtype',
      value: 'type',
      label: 'Type',
      type: 'string',
      order: contractSubtypes,
    },
    {
      key: 'defaultPay',
      value: 'pay',
      label: 'Pay',
      type: 'number',
      secondaryKey: 'isBonusPay',
      secondaryType: 'boolean',
    },
    {
      key: 'status',
      value: 'status',
      label: 'Status',
      type: 'string',
      order: contractStatus,
      secondaryKey: ['bidDate', 'startDate', 'endDate'],
      secondaryType: 'date',
    },
    { key: 'createdAt', value: 'created', label: 'Created', type: 'date' },
  ],
};
