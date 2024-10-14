import { RootState } from '@Redux/store';
import { IMission } from 'vl-shared/src/schemas/RoutesSchema';

export const selectMissions = (state: RootState) => Object.values(state.routes.missions);

export const selectDestinations = (state: RootState) =>
  Object.values(state.routes.destinations);

export const selectMissionByObjectiveId = (objectiveId: number) => {
  return (state: RootState): IMission | undefined => {
    return selectMissions(state).find((mission) =>
      mission.objectives.some((objective) => objective.packageId === objectiveId),
    );
  };
};
