import { formOptions } from '@tanstack/react-form';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const taskOpts = formOptions<ITask>({
  defaultValues: {
    id: '',
    type: '',
    label: '',
    location: {} as ILocation,
    status: 'PENDING',
  },
});
