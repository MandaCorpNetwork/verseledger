import { actions as userActions } from '@Redux/Slices/Users/users.reducer';
import { AppDispatch } from '@Redux/store';
import { Middleware } from 'redux';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { fetchContracts } from '../Contracts/actions/fetch/fetchContracts';

export const updateUsersMiddleware: Middleware<unknown, Record<string, unknown>> =
  ({ dispatch }: { dispatch: AppDispatch }) =>
  (next) =>
  (action) => {
    const activeContractors: User[] = [];
    if (fetchContracts.fulfilled.match(action)) {
      (action.payload as IContract[]).forEach((contract) => {
        contract.Bids?.forEach((bid) => {
          if (bid.status === 'ACCEPTED' && bid.User) {
            activeContractors.push(bid.User);
          }
        });
      });
      dispatch(userActions.updateUsers(activeContractors));
    }
    return next(action);
  };
