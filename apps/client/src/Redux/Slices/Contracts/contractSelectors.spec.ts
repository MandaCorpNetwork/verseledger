import { describe, expect, it } from 'vitest';

import { pickContract } from './contractSelectors';

describe('contractSelectors.ts', () => {
  it('can pick a contract by id', () => {
    const contracts = {
      'X-1': {
        id: 'X-1',
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
      'X-2': {
        id: 'X-2',
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
    expect(pickContract({ contracts }, 'X-2')).toEqual(contracts['X-2']);
    expect(pickContract({ contracts }, 'X-1')).toEqual(contracts['X-1']);
  });
});
