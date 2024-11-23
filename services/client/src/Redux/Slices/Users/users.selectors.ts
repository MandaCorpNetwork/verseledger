import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store';
import { IUser, IUserWithSettings } from 'vl-shared/src/schemas/UserSchema';

import { usersAdapter } from './users.adapters';

const usersSelectors = usersAdapter.getSelectors((state: RootState) => state.users);

export const selectUsers = usersSelectors.selectAll;

export const selectUserById = usersSelectors.selectById;

export const selectUserPageImageById = createSelector(
  [selectUsers, (_, id: string) => id],
  (users, id: string) => {
    const user = users.find((user) => user.id === id) as IUserWithSettings | undefined;
    return user?.Settings?.userPageImage ?? null;
  },
);
