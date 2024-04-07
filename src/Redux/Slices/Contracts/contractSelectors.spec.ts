import type { IContract } from '@Backend/interfaces/IContract';
import { describe, expect, it } from 'vitest';

import { pickContract } from './contractSelectors';

describe('contractSelectors.ts', () => {
  it('can pick a contract by id', () => {
    const contracts: Array<IContract> = [
      {
        id: 1,
        title: '',
        owner_id: 0,
        location: '',
        bidEnd: null,
        pay: 0,
        payStructure: 'POOL',
        bonus: false,
        type: 'Logistics',
        subtype: 'Transport',
      } as IContract,
      {
        id: 2,
        title: '',
        owner_id: 0,
        location: '',
        bidEnd: null,
        pay: 0,
        payStructure: 'POOL',
        bonus: false,
        type: 'Logistics',
        subtype: 'Transport',
      } as IContract,
    ];
    expect(pickContract({ contracts }, 2)).toEqual(contracts[1]);
  });
});
