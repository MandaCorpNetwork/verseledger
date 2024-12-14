import { createEntityAdapter } from '@reduxjs/toolkit';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

export const contractsAdapter = createEntityAdapter({
  selectId: (contract: IContract) => contract.id,
});
