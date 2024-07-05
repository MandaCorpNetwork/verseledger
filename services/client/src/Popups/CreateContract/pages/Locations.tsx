import { LocationChip } from '@Common/Components/App/LocationChip';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { SmallEmergencyOverlay } from '../EmergencyOverlay';
export const Locations: React.FC<{
  formData: ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<ICreateContractBody>>;
}> = (props) => {
  const { formData, setFormData } = props;

  const handleAddStartLocation = React.useCallback(
    (selectedLocation: ILocation | null) => {
      if (selectedLocation == null) return;
      setFormData((formData) => ({
        ...formData,
        Locations: [
          ...(formData.Locations ?? []),
          { location: selectedLocation.id as string, tag: 'start' },
        ],
      }));
    },
    [setFormData],
  );

  const handleAddEndLocation = React.useCallback(
    (selectedLocation: ILocation | null) => {
      if (selectedLocation == null) return;
      setFormData((formData) => ({
        ...formData,
        Locations: [
          ...(formData.Locations ?? []),
          { location: selectedLocation.id as string, tag: 'end' },
        ],
      }));
    },
    [setFormData],
  );

  const handleAddOtherLocation = React.useCallback(
    (selectedLocation: ILocation | null) => {
      if (selectedLocation == null) return;
      setFormData((formData) => ({
        ...formData,
        Locations: [
          ...(formData.Locations ?? []),
          { location: selectedLocation.id as string, tag: 'other' },
        ],
      }));
    },
    [setFormData],
  );

  // const handleRemoveLocation = React.useCallback(
  //   (locationId: string, tag: string) => {
  //     setFormData((formData) => ({
  //       ...formData,
  //       Locations: formData.Locations?.filter(
  //         (loc) => !(loc.location === locationId && loc.tag === tag),
  //       ),
  //     }));
  //   },
  //   [setFormData],
  // );

  return (
    <Box
      data-testid="Locations__Container"
      sx={{
        mt: '1em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'inherit',
            flexGrow: 1,
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <LocationSearch
              onLocationSelect={handleAddStartLocation}
              width="320px"
              helperText="Select Start Location"
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <LocationSearch
              onLocationSelect={handleAddEndLocation}
              width="320px"
              helperText="Select End Location"
            />
          </Box>
          <Box sx={{ display: 'flex', position: 'relative' }}>
            {formData.isEmergency && <SmallEmergencyOverlay />}
            <LocationSearch
              onLocationSelect={handleAddOtherLocation}
              width="320px"
              helperText="Select Other Locations"
            />
          </Box>
        </Box>
      </Box>
      <FormControl sx={{ display: 'flex', flexDirection: 'column' }}>
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
            minWidth: '300px',
            justifyContent: 'center',
            p: '.5em',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              mt: '.5em',
            }}
          >
            <TextField
              data-testid="LocationForm__StartingLocation-Output"
              label="Start Location"
              color="secondary"
              size="small"
              InputProps={{
                readOnly: true,
                startAdornment:
                  (formData.Locations?.length ?? 0) > 0 ? (
                    <LocationChip
                      locationId={
                        formData.Locations?.find((loc) => loc.tag === 'start')
                          ?.location as string
                      }
                      //onDelete={() => handleRemoveLocation( ,'start')}
                    />
                  ) : null,
              }}
              sx={{
                display: 'flex',
                width: '150px',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              my: '.5em',
            }}
          >
            <TextField
              data-testid="LocationForm__EndingLocation-Output"
              label="End Location"
              color="secondary"
              size="small"
              InputProps={{
                readOnly: true,
                startAdornment:
                  (formData.Locations?.length ?? 0) > 1 ? (
                    <LocationChip
                      locationId={
                        formData.Locations?.find((loc) => loc.tag === 'end')
                          ?.location as string
                      }
                      //onDelete={() => handleRemoveLocation(formData.Locations?.find((loc) => loc.tag === 'end')?.id as string, 'end'}
                    />
                  ) : null,
              }}
              sx={{
                display: 'flex',
                width: '150px',
              }}
            />
          </Box>
          <Box
            data-testid="LocationForm__OtherLocation-Output"
            sx={{
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: formData.isEmergency
                ? 'action.disabledBackground'
                : 'primary.main',
              mx: '20%',
              py: '.5em',
              px: '.2em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: formData.isEmergency ? 'text.disabled' : 'text.secondary',
              }}
            >
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
              {formData.Locations?.map(
                (loc) =>
                  loc.tag === 'other' && (
                    <LocationChip
                      locationId={loc.location}
                      //onDelete={() => handleRemoveLocation()}
                      key={loc.location}
                    />
                  ),
              )}
            </Box>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
