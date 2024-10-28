import { createAction } from '@reduxjs/toolkit';
import { IObjective } from 'vl-shared/src/schemas/RoutesSchema';

export const updateObjectives = createAction<IObjective[]>('routes/updateObjectives');

export const addObjectives = createAction<{
  objectives: IObjective[];
}>('routes/addObjectives');
