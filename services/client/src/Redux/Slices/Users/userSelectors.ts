import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store';

export const selectUsers = (state: RootState) => {
  return state.users;
};
export const selectContractsArray = createSelector([selectUsers], (users) => {
  return Object.values(users);
});

export const selectUserById = createSelector(
  [selectUsers, (_, id: string) => id],
  (users, id: string) => {
    return users[id] as User | null;
  },
);

export const searchUsers = createSelector(
  [selectUsers, (_, searchTerm: string) => searchTerm],
  (users, searchTerm: string) => {
    return Object.values(users).filter(
      (user) =>
        user.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  },
);
