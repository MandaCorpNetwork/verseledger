import { formOptions } from '@tanstack/react-form';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const taskOpts = formOptions({
  defaultValues: {
    id: '',
    type: '',
    label: '',
    location: {} as ILocation,
    status: 'PENDING',
  },
});
