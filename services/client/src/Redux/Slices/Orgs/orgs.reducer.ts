import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { fetchOrgs } from './actions/post/fetchOrgs.action';
import { orgMembersAdapter, orgsAdapter } from './orgs.adapters';

const initialState = {
  orgs: orgsAdapter.getInitialState(),
  orgMembers: orgMembersAdapter.getInitialState(),
  pagination: {} as IPaginatedDataSlice,
};

const orgsReducer = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    noop() {
      return initialState;
    },
    addOrgs(state, action) {
      orgsAdapter.addMany(state.orgs, action.payload);
    },
    addMembers(state, action) {
      orgMembersAdapter.addMany(state.orgMembers, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrgs.fulfilled, (_state, action) => {
      const pagination = action.payload?.pagination;
      if (pagination) {
        _state.pagination = pagination;
      } else {
        Logger.warn('Payload pages is undefined or empty');
      }
    });
  },
});

export default orgsReducer;
export const orgActions = orgsReducer.actions;
