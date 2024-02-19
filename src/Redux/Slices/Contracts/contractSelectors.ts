import { IContract } from '@/../../verseledger-backend/src/interfaces/IContract';

import type { RootState } from '../../store';

export const selectContracts = (state: RootState) => {
  return state.contracts;
};

export const pickContract = (state: RootState, id: number) => {
  return state.contracts.find((contract) => contract.id === id);
};
