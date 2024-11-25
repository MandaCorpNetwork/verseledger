import type { RootState } from '@Redux/store';

import { contractsAdapter } from './contracts.adapters';

const contractSelectors = contractsAdapter.getSelectors(
  (state: RootState) => state.contracts.contracts,
);

export const selectContracts = contractSelectors.selectAll;

export const selectContract = contractSelectors.selectById;

export const selectContractPagination = (state: RootState) => ({
  total: state.contracts.pagination.total,
  pages: state.contracts.pagination.pages,
});
