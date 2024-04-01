// This is the LocationsForm Component for the CreateContracts Component. It adds up to 6 Locations to the Contract. It requires the input of a Starting Location. When the plus button is clicked, a Final Location Autocomplete is added at the bottom to be selected, any addition presses of the add button will map Location `${locationCount}` to the Contract.
import { AddCircleOutline, Check } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import React from 'react';

interface LocationSelection {
  label: string;
  type: 'final' | 'additional';
}

const LocationSelectForm: React.FC<{ label: string }> = ({ label }) => {
  return (
    <FormLabel>
      {label}
      {/*{label} passes the 'Final Location' or 'Location ${locationCount}' set in the Locations Form*/}
      <FormControl>
        <Autocomplete
          options={locationTestDB}
          renderInput={(params) => <TextField {...params} label="Location" />}
          renderOption={(props, option, { selected }) => (
            <MenuItem {...props} sx={{ display: 'flex' }}>
              {option.label}
              {selected && (
                <Check
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
      </FormControl>
    </FormLabel>
  );
};

export const LocationsForm: React.FC<unknown> = () => {
  const [locations, setLocations] = React.useState<LocationSelection[]>([]);

  const handleAddingLocation = () => {
    setLocations((prevLocations) => {
      if (prevLocations.length >= 6) {
        alert('You cannot add more than 6 locations to a contract.');
        return prevLocations;
      }
      return [
        ...prevLocations,
        {
          label:
            prevLocations.length === 0
              ? 'Final Location'
              : `Location ${prevLocations.length}`,
          type: prevLocations.length === 0 ? 'final' : 'additional',
        },
      ];
    });
  };

  return (
    <Box>
      <FormGroup>
        <FormLabel>
          Starting Location
          <FormControl>
            <Autocomplete
              options={locationTestDB}
              renderInput={(params) => <TextField {...params} label="Location" />}
              renderOption={(props, option, { selected }) => (
                <MenuItem {...props} sx={{ display: 'flex' }}>
                  {option.label}
                  {selected && (
                    <Check
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
          </FormControl>
        </FormLabel>
        {locations
          .filter((loc) => loc.type === 'additional')
          .map((loc, index) => (
            <LocationSelectForm key={index} label={loc.label} />
          ))}
        {locations
          .filter((loc) => loc.type === 'final')
          .map((loc, index) => (
            <LocationSelectForm key={`final-${index}`} label={loc.label} />
          ))}
        <IconButton onClick={handleAddingLocation}>
          <AddCircleOutline color="secondary" />
        </IconButton>
      </FormGroup>
    </Box>
  );
};

// TestDB for locations to be replaced by the API
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
