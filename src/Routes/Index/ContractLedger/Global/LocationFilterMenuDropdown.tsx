import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export const LocationFilterMenuDropdown: React.FC<unknown> = () => {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={locationTestDB}
      getOptionLabel={(option) => option.location}
      renderInput={(params) => (
        <TextField {...params} label="Locations" placeholder="Location" />
      )}
    />
  );
};

//Test DB for Location Filter
const locationTestDB = [
  { star: 'Stanton', body: 'Hurston', location: 'Loreville' },
  { star: 'Stanton', body: 'Hurston', location: 'Everus Harbor' },
  { star: 'Stanton', body: 'Aberdeen', location: 'Klecher' },
  { star: 'Stanton', body: 'Hurston', location: `Cutter's Rig` },
  { star: 'Stanton', body: 'Hurston', location: `Finn's Folly` },
  { star: 'Stanton', body: 'Hurston', location: 'HDES Calthrope' },
];
