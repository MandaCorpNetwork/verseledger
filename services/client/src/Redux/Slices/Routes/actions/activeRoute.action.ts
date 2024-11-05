import { createAction } from '@reduxjs/toolkit';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const startRoute = createAction<{ destination: IDestination; scuLoad: number }>(
  'routes/startRoute',
);

export const nextStop = createAction<{
  updatedDestination: IDestination;
  nextDestination: IDestination;
}>('routes/nextStop');

export const updateLoad = createAction<number>('routes/updateLoad');

export const updateActiveTask = createAction<{ task: ITask; destination: IDestination }>(
  'routes/updateActiveTask',
);
