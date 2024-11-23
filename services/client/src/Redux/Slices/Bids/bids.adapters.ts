import { createEntityAdapter } from '@reduxjs/toolkit';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';

export const bidsAdapter = createEntityAdapter({
  selectId: (org: IContractBid) => org.id,
});
