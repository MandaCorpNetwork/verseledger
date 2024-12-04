import { createSlice } from '@reduxjs/toolkit';

import { createUserTokens } from './Actions/createUserToken.action';
import { deleteUserToken } from './Actions/deleteUserToken.action';
import { fetchUserTokens } from './Actions/fetchUserTokens.action';

const tokensReducer = createSlice({
  name: 'tokens',

  initialState: {} as {
    [key: string]: { id: string; token_id: string; name: string; expiresAt: string };
  },
  reducers: {
    noop() {
      return {};
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserTokens.fulfilled, (_state, action) => {
      for (const token of action.payload) {
        _state[token.id] = token;
      }
    });
    builder.addCase(deleteUserToken.fulfilled, (_state, action) => {
      const tokenId = Object.values(_state).find((t) => t.token_id == action.payload)?.id;
      if (tokenId == null) return;
      delete _state[tokenId];
    });
    builder.addCase(createUserTokens.fulfilled, (_state, action) => {
      const token = { ...action.payload };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (token as any).token;
      _state[token.id] = token;
    });
  },
});

export default tokensReducer;
export const actions = tokensReducer.actions;
