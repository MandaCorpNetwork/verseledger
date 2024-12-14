import { usersActions as userActions } from '@Redux/Slices/Users/users.reducer';
import type { AppDispatch } from '@Redux/store';
import type { Middleware } from 'redux';
import type { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { fetchContracts } from '../Contracts/actions/get/fetchContracts.action';

export const updateUsersMiddleware: Middleware<unknown, Record<string, unknown>> =
  ({ dispatch }: { dispatch: AppDispatch }) =>
  (next) =>
  (action) => {
    const activeContractors: User[] = [];
    if (fetchContracts.fulfilled.match(action)) {
      for (const contract of action.payload?.data as IContract[]) {
        for (const bid of contract.Bids as IContractBid[]) {
          if (bid.status === 'ACCEPTED' && bid.User) {
            activeContractors.push(bid.User);
          }
        }
      }
      dispatch(userActions.upsertUsers(activeContractors));
    }
    return next(action);
  };
