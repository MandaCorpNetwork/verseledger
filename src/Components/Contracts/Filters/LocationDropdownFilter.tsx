import CheckIcon from '@mui/icons-material/Check';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';

type LocationFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const LocationDropdownFilter: React.FC<LocationFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const handleChange = (event, newValue: string[]) => {
    const values = newValue.map((option) => option.label);
    const newParams = new URLSearchParams();
    newParams.set('location', values.join(','));
    setSearchParams(newParams);
  };

  return (
    <Autocomplete
      multiple
      limitTags={1}
      options={locationTestDB}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Locations"
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
      sx={{
        width: '20%',
      }}
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
