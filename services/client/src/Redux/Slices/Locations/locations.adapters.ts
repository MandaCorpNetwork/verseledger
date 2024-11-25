import { createEntityAdapter } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const locationsAdapter = createEntityAdapter({
  selectId: (location: ILocation) => location.id,
});
