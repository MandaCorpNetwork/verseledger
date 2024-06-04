import { LocationChip } from '@Common/Components/App/LocationChip';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';

export const Locations: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  const { formData, setFormData } = props;

  const handleLocationSelect = React.useCallback(
    (selectedLocation: StarMapLocation | null) => {
      if (selectedLocation == null) return;
      setFormData((formData) => ({
        ...formData,
        locations: [...formData.locations, selectedLocation.id],
      }));
    },
    [setFormData],
  );

  const handleRemoveLocation = React.useCallback(
    (locationId: string) => {
      setFormData((formData) => ({
        ...formData,
        locations: formData.locations.filter((id) => id !== locationId),
      }));
    },
    [setFormData],
  );

  return (
    <Box
      data-testid="Locations__Container"
      sx={{
        mt: '1em',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mx: 'auto' }}>
        <Box>
          <LocationSearch onLocationSelect={handleLocationSelect} width="320px" />
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
                label="Start Location"
                color="secondary"
                InputProps={{
                  readOnly: true,
                  startAdornment:
                    formData.locations.length > 0 ? (
                      <LocationChip
                        locationId={formData.locations[0]}
                        onDelete={handleRemoveLocation}
                      />
                    ) : null,
                }}
                sx={{
                  width: '150px',
                  mr: '.5em',
                }}
              />
              <TextField
                data-testid="LocationForm__EndingLocation-Output"
                label="End Location"
                color="secondary"
                InputProps={{
                  readOnly: true,
                  startAdornment:
                    formData.locations.length > 1 ? (
                      <LocationChip
                        locationId={formData.locations[formData.locations.length - 1]}
                        onDelete={handleRemoveLocation}
                      />
                    ) : null,
                }}
                sx={{
                  width: '150px',
                  mr: '.5em',
                }}
              />
            </Box>
            {formData.locations.length > 2 && (
              <Box
                data-testid="LocationForm__OtherLocation-Output"
                sx={{
                  borderTop: '2px solid',
                  borderBottom: '2px solid',
                  borderRadius: '5px',
                  borderColor: 'primary.main',
                  my: '.5em',
                  mx: '20%',
                  py: '.5em',
                  px: '.2em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Other Locations
                </Typography>
                <Box
                  data-testid="LocationForm__OtherLocation-List"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    p: '.5em',
                    '&::-webkit-scrollbar': {
                      width: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgb(8, 29, 68)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '20px',
                      background: 'rgb(121, 192, 244, .5)',
                    },
                  }}
                >
                  {formData.locations.slice(1, -1).map((locationId) => (
                    <LocationChip
                      locationId={locationId}
                      onDelete={handleRemoveLocation}
                      key={locationId}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
