import { LocationChip } from '@Common/Components/App/LocationChip';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { Autocomplete, Box, Chip, FormControl, MenuItem, TextField } from '@mui/material';
import React from 'react';

export const Locations: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  const { formData, setFormData } = props;

  const handleLocationSelect = React.useCallback(() => {
    setFormData({ ...formData, locations: })
  }, [])

  return (
    <Box
      data-testid="Locations__Container"
      sx={{
        mt: '1em',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Box>
          <LocationSearch />
        </Box>
        <FormControl>
          <Box
            data-testid="LocationForm__Locations-Container"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'secondary.main',
              mt: '1em',
              mb: '1em',
            }}
          >
            <Box
              data-testid="LocationForm__StartandEndLocation__Wrapper"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                my: '1em',
              }}
            >
              <TextField
                data-testid="LocationForm__StartingLocation-Output"
                label="Starting Location"
                InputProps={{
                  readOnly: true,
                  // startAdornment:
                  //   formData.locations.length > 0 ? (
                  //     <LocationChip label={formData.locations[0]} onDelete={() => {}} />
                  //   ) : null,
                }}
                sx={{
                  width: '150px',
                  mr: '.5em',
                }}
              />
              <TextField
                data-testid="LocationForm__EndingLocation-Output"
                label="Starting Location"
                InputProps={{
                  readOnly: true,
                  // startAdornment:
                  //   formData.locations.length > 0 ? (
                  //     <LocationChip label={formData.locations[0]} onDelete={() => {}} />
                  //   ) : null,
                }}
                sx={{
                  width: '150px',
                  mr: '.5em',
                }}
              />
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
