import { createEntityAdapter } from '@reduxjs/toolkit';
import type { IUser } from 'vl-shared/src/schemas/UserSchema';

export const usersAdapter = createEntityAdapter({
  selectId: (user: IUser) => user.id,
});
