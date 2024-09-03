import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store';
import { IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

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

export const selectUserPageImageById = createSelector(
  [selectUsers, (_, id: string) => id],
  (users, id: string) => {
    const user = users[id] as IUserWithSettings | null;
    return user?.Settings?.userPageImage;
  },
);
