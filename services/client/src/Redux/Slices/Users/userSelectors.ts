import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store';

export const selectUsers = (state: RootState) => {
  return state.users;
};
export const selectUsersArray = createSelector([selectUsers], (users) => {
  return Object.values(users);
});

export const selectUserById = createSelector(
  [selectUsers, (_, id: string) => id],
  (users, id: string) => {
    return users[id] as User | null;
  },
);
