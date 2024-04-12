// This is the LocationsForm Component for the CreateContracts Component. It requires the input of a Starting Location.
/*
  Table of Contents:
    Props:
      LocationProps
        -- Typing for the Test DB passing in location objects to the selection
      LocationFormProps
        -- Props to pass into the LocationsForm to link to the Centralized state in CreateContractStepper
    Functions:
      handleAddLocation
        -- Adds a new Location to the formData.locations array
      handleRemoveLocation
        -- Removes a Location from the formData.locations array
    Components:
      Autocomplete
        :id: LocationForm-LocationAutocomplete
        -- Adds a new Location to the formData.locations array
      Textfield
        :id: LocationForm-StartingLocation__Output
        -- Displays formData.locations[0] as a Chip and the Chip has a delete to remove that location
      Textfield
        :id: LocationForm-FinalLocation__Output
        -- Displays formData.locations[formData.locations.length - 1] as a Chip and the Chip has a delete to remove that location
      Textfield
        :id: LocationForm-OtherLocations__Output
        -- Displays all locations in formData.locations as Chips and the Chips have a delete to remove that location excluding start and end.
*/
import { Check, Clear } from '@mui/icons-material';
import { Autocomplete, Box, Chip, FormLabel, MenuItem, TextField } from '@mui/material';
import React from 'react';

type LocationProps = {
  star: string;
  body: string;
  location: string;
  label: string;
};

type LocationFormProps = {
  formData: {
    locations: LocationProps[];
    emergency: boolean;
  };
  onFormChange: (field: string, value: LocationProps[]) => void;
};

export const LocationsForm: React.FC<LocationFormProps> = ({
  formData,
  onFormChange,
}) => {
  const handleAddLocation = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: LocationProps | null,
  ) => {
    if (newValue) {
      onFormChange('locations', [...formData.locations, newValue]);
    }
  };

  const handleRemoveLocation = (locationToRemove: LocationProps) => {
    onFormChange(
      'locations',
      formData.locations.filter((location) => location !== locationToRemove),
    );
  };

  const otherDisplayLimit = 2;
  const extraChipsCount = formData.locations.slice(1, -1).length - otherDisplayLimit;

  return (
    <Box sx={{ ml: '1em', mr: '1em' }}>
      <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}>
        Location Selection
      </FormLabel>
      <Box
        sx={{
          mt: '1em',
        }}
      >
        <Autocomplete
          data-testid="LocationForm__LocationAutocomplete"
          options={locationTestDB}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location Selection"
              color="secondary"
              size="small"
            />
          )}
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
          onChange={handleAddLocation}
          sx={{
            width: '200px',
          }}
        />
      </Box>
      <Box
        data-testid="LocationForm__Locations-Container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: '.5em',
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderRadius: '6px',
          borderColor: 'secondary.main',
          mt: '1em',
          pl: '1em',
          pr: '1em',
        }}
      >
        <Box
          data-testid="LocationForm__StartandEndLocation-Container"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '1em',
            mt: '.5em',
          }}
        >
          <TextField
            data-testid="LocationForm__StartingLocation-Output"
            label="Starting Location"
            InputProps={{
              readOnly: true,
              startAdornment:
                formData.locations.length > 0 ? (
                  <Chip
                    data-testid="LocationForm__StartLocationChip"
                    label={formData.locations[0].label}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onDelete={() => handleRemoveLocation(formData.locations[0])}
                    deleteIcon={<Clear />}
                  />
                ) : null,
            }}
            sx={{
              width: '150px',
              mr: '.5em',
            }}
          />
          <TextField
            data-testid="LocationForm__EndLocation-Output"
            label="Final Location"
            InputProps={{
              readOnly: true,
              startAdornment:
                formData.locations.length > 1 ? (
                  <Chip
                    data-testid="LocationForm-EndLocationChip"
                    label={formData.locations[formData.locations.length - 1].label}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onDelete={() =>
                      handleRemoveLocation(
                        formData.locations[formData.locations.length - 1],
                      )
                    }
                    deleteIcon={<Clear />}
                  />
                ) : null,
            }}
            disabled={formData.locations.length < 2}
            sx={{
              width: '150px',
              ml: '.5em',
            }}
          />
        </Box>
        <Box
          data-testid="LocationForm__OtherLocations-Container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: '.5em',
            alignItems: 'center',
            justiifyContent: 'center',
            width: '100%',
          }}
        >
          <TextField
            data-testid="LocationForm-OtherLocations__Output"
            fullWidth
            color={formData.emergency ? 'secondary' : 'warning'}
            label="Other Locations"
            InputProps={{
              readOnly: true,
              startAdornment: (
                <>
                  {formData.locations
                    .slice(1, -1)
                    .slice(0, otherDisplayLimit)
                    .map((location, index) => (
                      <Chip
                        data-testid={`LocationForm-Location${index + 1}Chip`}
                        key={index}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        label={location.label}
                        onDelete={() => handleRemoveLocation(location)}
                        deleteIcon={<Clear />}
                        sx={{
                          mr: '.2em',
                        }}
                      />
                    ))}
                  {extraChipsCount > 0 && (
                    <Chip
                      size="small"
                      color="secondary"
                      variant="outlined"
                      label={`+${extraChipsCount}`}
                    />
                  )}
                </>
              ),
            }}
            disabled={formData.locations.length < 3}
            sx={{
              width: '300px',
            }}
          />
        </Box>
      </Box>
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
