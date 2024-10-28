import { createAction } from '@reduxjs/toolkit';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const updateObjectives = createAction<ITask[]>('routes/updateObjectives');

export const addObjectives = createAction<{
  objectives: ITask[];
}>('routes/addObjectives');
