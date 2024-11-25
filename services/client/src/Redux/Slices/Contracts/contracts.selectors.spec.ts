import { RootState } from '@Redux/store';
import { describe, expect, it } from 'vitest';

import { selectContract } from './contracts.selectors';

describe('contractSelectors.ts', () => {
  it('can pick a contract by id', () => {
    const contracts: RootState['contracts'] = {
      contracts: {
        ids: ['X-1', ''],
        entities: {
          'X-1': {
            id: 'X-1',
            title: '',
            owner_id: '',
            payStructure: 'POOL',
            subtype: 'Transport',
            briefing: '',
            isEmergency: false,
            contractorLimit: 1,
            defaultPay: 5,
            isBargaining: true,
            isBonusPay: true,
            status: '',
          },
          'X-2': {
            id: 'X-2',
            title: '',
            owner_id: '',
            payStructure: 'POOL',
            subtype: 'Transport',
            briefing: '',
            isEmergency: false,
            contractorLimit: 1,
            defaultPay: 5,
            isBargaining: true,
            isBonusPay: true,
            status: '',
          },
        },
      },
      isLoading: false,
      pagination: { limit: 0, page: 0, pages: 0, total: 2 },
    };
    expect(selectContract({ contracts } as RootState, 'X-2')).toEqual(
      contracts.contracts.entities['X-2'],
    );
    expect(selectContract({ contracts } as RootState, 'X-1')).toEqual(
      contracts.contracts.entities['X-1'],
    );
  });
});
