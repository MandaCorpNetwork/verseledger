import { actions as userActions } from '@Redux/Slices/Users/users.reducer';
import { AppDispatch } from '@Redux/store';
import { Middleware } from 'redux';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

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
      dispatch(userActions.updateUsers(activeContractors));
    }
    return next(action);
  };
