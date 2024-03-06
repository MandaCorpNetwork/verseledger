import { Autocomplete, TextField } from '@mui/material';

export const LocationSelection: React.FC<unknown> = () => {
  return (
    <>
      <Autocomplete
        limitTags={2}
        options={locationTestDB}
        getOptionLabel={(option) => option.location}
        renderInput={(params) => (
          <TextField {...params} label="Locations" placeholder="Location" />
        )}
      />
    </>
  );
};

const locationTestDB = [
  { star: 'Stanton', body: 'Hurston', location: 'Loreville' },
  { star: 'Stanton', body: 'Hurston', location: 'Everus Harbor' },
  { star: 'Stanton', body: 'Aberdeen', location: 'Klecher' },
  { star: 'Stanton', body: 'Hurston', location: `Cutter's Rig` },
  { star: 'Stanton', body: 'Hurston', location: `Finn's Folly` },
  { star: 'Stanton', body: 'Hurston', location: 'HDES Calthrope' },
];
