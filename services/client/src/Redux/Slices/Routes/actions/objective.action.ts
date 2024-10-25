import { createAction } from '@reduxjs/toolkit';
import {
  ILogisticTransport,
  IObjective,
  IUserTransport,
} from 'vl-shared/src/schemas/RoutesSchema';

export const updateObjective = createAction<{
  objective: IObjective;
  missionId: number;
  destinationId: string;
}>('routes/updateObjective');

export const addObjectives = createAction<{
  objectives: IUserTransport[] | ILogisticTransport[];
}>('routes/addObjectives');
