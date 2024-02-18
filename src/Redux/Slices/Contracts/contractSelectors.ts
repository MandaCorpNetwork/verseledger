import type { RootState } from '../../store';

export const selectContracts = (state: RootState) => {
  return state.contracts;
};
