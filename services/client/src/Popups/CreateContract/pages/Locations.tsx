import { LocationChip } from '@Common/Components/App/LocationChip';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
export const Locations: React.FC<{
  formData: ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<ICreateContractBody>>;
}> = (props) => {
  const { formData, setFormData } = props;

  const handleLocationSelect = React.useCallback(
    (selectedLocation: ILocation | null) => {
      if (selectedLocation == null) return;
      setFormData((formData) => ({
        ...formData,
        Locations: [...(formData.Locations ?? []), selectedLocation.id as string],
      }));
    },
    [setFormData],
  );

  const handleRemoveLocation = React.useCallback(
    (locationId: string) => {
      setFormData((formData) => ({
        ...formData,
        Locations: formData.Locations?.filter(({ id }) => id !== locationId),
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
                    (formData.Locations?.length ?? 0) > 0 ? (
                      <LocationChip
                        locationId={formData.Locations?.[0] as string}
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
                    (formData.Locations?.length ?? 0) > 1 ? (
                      <LocationChip
                        locationId={
                          formData.Locations?.[
                            (formData.Locations?.length ?? 0) - 1
                          ] as string
                        }
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
            {(formData.Locations?.length ?? 0) > 2 && (
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
                  {formData.Locations?.slice(1, -1).map(({ id }) => (
                    <LocationChip
                      locationId={id}
                      onDelete={handleRemoveLocation}
                      key={id}
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
