import { createAction } from '@reduxjs/toolkit';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

export const addDestinations = createAction<IDestination[]>('routes/addDestinations');

export const updateDestinations = createAction<IDestination[]>(
  'routes/updateDestinations',
);
