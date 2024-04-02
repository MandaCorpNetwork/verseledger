import type { RootState } from '../../store';

export const selectContracts = (state: RootState) => {
  return state.contracts;
};

export const pickContract = (state: RootState, id: number | null) => {
  return state.contracts.find((contract) => contract.id === id);
};
