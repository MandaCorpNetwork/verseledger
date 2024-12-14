import { createAction } from '@reduxjs/toolkit';
import type { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

export const addDestinations = createAction<IDestination[]>('routes/addDestinations');

export const updateDestinations = createAction<IDestination[]>(
  'routes/updateDestinations',
);

export const replaceDestinations = createAction<IDestination[]>(
  'routes/replaceDestinations',
);

export const deleteDestination = createAction<string>('routes/deleteDestination');
