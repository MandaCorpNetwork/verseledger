import { describe, expect, it } from 'vitest';

import { pickContract } from './contractSelectors';

describe('contractSelectors.ts', () => {
  it('can pick a contract by id', () => {
    const contracts = {
      1: {
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
      },
      2: {
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
      },
    };
    expect(pickContract({ contracts }, 2)).toEqual(contracts[2]);
    expect(pickContract({ contracts }, 1)).toEqual(contracts[1]);
  });
});
