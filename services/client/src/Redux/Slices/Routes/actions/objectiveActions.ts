import { createAction } from '@reduxjs/toolkit';
import { IObjective } from 'vl-shared/src/schemas/RoutesSchema';

export const updateObjective = createAction<{
  objective: IObjective;
  missionId: number;
  destinationId: string;
}>('routes/updateObjective');
