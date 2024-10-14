import { createAction } from '@reduxjs/toolkit';
import { IMission } from 'vl-shared/src/schemas/RoutesSchema';

export const createMission = createAction<IMission>('routes/createMission');

export const updateMission = createAction<IMission>('routes/updateMission');

export const abandonMission = createAction<IMission>('routes/abandonMission');
