import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { fetchSearchUsers } from './Actions/fetchSearchUsers';

const searchUsersReducer = createSlice({
  name: 'usersSearch',
  initialState: {} as Record<User['id'], User>,
  reducers: {
    clearSearchedUsers: () => ({}),
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(fetchSearchUsers.fulfilled),
      (_state, action: PayloadAction<User[]>) => {
        const searchResults = action.payload;
        return Object.fromEntries(searchResults.map((user) => [user.id, user]));
      },
    );
  },
});

export const { clearSearchedUsers } = searchUsersReducer.actions;
export default searchUsersReducer;
