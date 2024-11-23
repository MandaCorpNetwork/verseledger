import { createEntityAdapter } from '@reduxjs/toolkit';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const destinationsAdapter = createEntityAdapter({
  selectId: (destination: IDestination) => destination.id,
});

export const tasksAdapter = createEntityAdapter({
  selectId: (task: ITask) => task.id,
});
