import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { fetchOrgs } from './actions/post/fetchOrgs.action';
import {
  orgMembersAdapter,
  orgRolesAdapter as orgRanksAdapter,
  orgsAdapter,
  userOrgMemberAdapter,
} from './orgs.adapters';

const initialState = {
  userMemberships: userOrgMemberAdapter.getInitialState(),
  orgs: orgsAdapter.getInitialState(),
  orgRanks: orgRanksAdapter.getInitialState(),
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
    addUserMemberships(state, action) {
      userOrgMemberAdapter.addMany(state.userMemberships, action.payload);
    },
    addOrgs(state, action) {
      orgsAdapter.addMany(state.orgs, action.payload);
    },
    addMembers(state, action) {
      orgMembersAdapter.addMany(state.orgMembers, action.payload);
    },
    upsertMembers(state, action) {
      orgMembersAdapter.upsertMany(state.orgMembers, action.payload);
    },
    addOrg(state, action) {
      orgsAdapter.addOne(state.orgs, action.payload);
    },
    setOrgs(state, action) {
      orgsAdapter.setMany(state.orgs, action.payload);
    },
    upsertOrg(state, action) {
      orgsAdapter.upsertOne(state.orgs, action.payload);
    },
    upsertRank(state, action) {
      orgRanksAdapter.upsertOne(state.orgRanks, action.payload);
    },
    upsertRanks(state, action) {
      orgRanksAdapter.upsertMany(state.orgRanks, action.payload);
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
