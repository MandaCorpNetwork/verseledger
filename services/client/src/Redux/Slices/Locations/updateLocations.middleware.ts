import { AppDispatch } from '@Redux/store';
import { Middleware } from 'redux';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { fetchContracts } from '../Contracts/actions/get/fetchContracts.action';
import { actions as locationsActions } from './locations.reducer';

export const updateLocationsMiddleware: Middleware<unknown, Record<string, unknown>> =
  ({ dispatch }: { dispatch: AppDispatch }) =>
  (next) =>
  (action) => {
    if (fetchContracts.fulfilled.match(action)) {
      (action.payload?.data as IContract[]).forEach((contract) => {
        if (contract.Locations && contract.Locations.length > 0) {
          contract.Locations.forEach((location) => {
            dispatch(locationsActions.insert(location));
          });
        }
      });
    }
    return next(action);
  };
