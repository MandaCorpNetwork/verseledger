import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

type LocationFilterProps = {
  value: string[];
  onChange: (value: string[]) => void;
  size: 'small' | 'medium';
};

export const LocationsFilter: React.FC<LocationFilterProps> = ({
  value,
  onChange,
  size,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: { label: string }[]) => {
    onChange(newValue.map((option) => option.label));
  };

  return (
    <Autocomplete
      multiple
      renderTags={() => null}
      value={locationTestDB.filter((option) => value.includes(option.label))}
      options={locationTestDB}
      size={size}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Locations"
          multiline={false}
          /* For Loading when pulling from DB for locations
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={25} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          */
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props} sx={{ display: 'flex' }}>
          {option.label}
          {selected && (
            <CheckIcon
              sx={{
                color: 'secondary.main',
                ml: 'auto',
                opacity: 0.6,
                fontSize: '1.2em',
              }}
            />
          )}
        </MenuItem>
      )}
    />
  );
};

//Test DB for Location Filter
const locationTestDB = [
  { star: 'Stanton', body: 'Hurston', location: 'Loreville', label: 'Loreville' },
  { star: 'Stanton', body: 'Hurston', location: 'Everus Harbor', label: 'Everus Harbor' },
  { star: 'Stanton', body: 'Aberdeen', location: 'Klecher', label: 'Klecher' },
  { star: 'Stanton', body: 'Hurston', location: `Cutter's Rig`, label: `Cutter's Rig` },
  { star: 'Stanton', body: 'Hurston', location: `Finn's Folly`, label: `Finn's Folly` },
  {
    star: 'Stanton',
    body: 'Hurston',
    location: 'HDES Calthrope',
    label: 'HDES Calthrope',
  },
];
