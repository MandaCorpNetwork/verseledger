import { createAction } from '@reduxjs/toolkit';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

export const startRoute = createAction<{ destination: IDestination; scuLoad: number }>(
  'routes/startRoute',
);

export const nextStop = createAction<IDestination>('routes/nextStop');
