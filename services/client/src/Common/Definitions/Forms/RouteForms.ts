import { formOptions } from '@tanstack/react-form';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IMission, ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const taskOpts = formOptions<ITask>({
  defaultValues: {
    id: '',
    type: '',
    label: '',
    location: {} as ILocation,
    status: 'PENDING',
  },
});

export const missionOpts = formOptions<IMission>({
  defaultValues: {
    id: '',
    label: '',
    objectives: [
      {
        id: '',
        label: '',
        pickup: {
          id: '',
          type: 'pickup',
          label: '',
          location: {} as ILocation,
          status: 'PENDING',
        },
        dropoff: {
          id: '',
          type: 'dropoff',
          label: '',
          location: {} as ILocation,
          status: 'PENDING',
        },
        manifest: 'Unknown',
        scu: 0,
        status: 'PENDING',
      },
    ],
  },
});
