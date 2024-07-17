import { LocationSearch } from '@Common/Components/App/LocationSearch';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import PopupFormSelection from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

// import { SmallEmergencyOverlay } from '../EmergencyOverlay';
export const Locations: React.FC<{
  formData: ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<ICreateContractBody>>;
}> = (props) => {
  const { formData, setFormData } = props;

  const handleAddStartLocation = React.useCallback(
    (selectedLocation: ILocation | null) => {
      setFormData((formData) => {
        if (selectedLocation == null) {
          return {
            ...formData,
            Locations: formData.Locations?.filter((loc) => loc.tag !== 'start'),
          };
        }
        const updatedLocations = [
          ...(formData.Locations?.filter((loc) => loc.tag !== 'start') ?? []),
          { location: selectedLocation.id as string, tag: 'start' },
        ];

        return {
          ...formData,
          Locations: updatedLocations,
        };
      });
    },
    [setFormData],
  );

  const handleAddEndLocation = React.useCallback(
    (selectedLocation: ILocation | null) => {
      setFormData((formData) => {
        if (selectedLocation == null) {
          return {
            ...formData,
            Locations: formData.Locations?.filter((loc) => loc.tag !== 'end'),
          };
        }
        const updatedLocations = [
          ...(formData.Locations?.filter((loc) => loc.tag !== 'end') ?? []),
          { location: selectedLocation.id as string, tag: 'end' },
        ];

        return {
          ...formData,
          Locations: updatedLocations,
        };
      });
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

  const handleRemoveLocation = React.useCallback(
    (locationId: string, tag: string) => {
      setFormData((formData) => ({
        ...formData,
        Locations: formData.Locations?.filter(
          (loc) => !(loc.location === locationId && loc.tag === tag),
        ),
      }));
    },
    [setFormData],
  );

  return (
    <Box
      data-testid="Locations__Container"
      sx={{
        mt: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '1em',
        }}
      >
        <PopupFormSelection sx={{ px: '1em', py: '.5em', flexDirection: 'column' }}>
          <div>
            <Typography
              variant="tip"
              sx={{ mb: '.5em', fontSize: '.8em', ml: '.3em', px: '.5em' }}
            >
              Select Start Location
            </Typography>
            <LocationSearch onLocationSelect={handleAddStartLocation} width="320px" />
          </div>
          <div>
            <Typography
              variant="tip"
              sx={{ mb: '.5em', fontSize: '.8em', ml: '.3em', px: '.5em', mt: '.5em' }}
            >
              Select End Location
            </Typography>
            <LocationSearch
              onLocationSelect={handleAddEndLocation}
              width="320px"
              menuSize="s"
            />
          </div>
          <div style={{ marginBottom: '1em', position: 'relative' }}>
            {formData.isEmergency && <SmallEmergencyOverlay />}
            <Typography
              variant="tip"
              sx={{ mb: '.5em', fontSize: '.8em', ml: '.3em', px: '.5em', mt: '.5em' }}
            >
              Select Other Locations
            </Typography>
            <LocationSearch
              onLocationSelect={handleAddOtherLocation}
              width="320px"
              menuSize="s"
            />
          </div>
        </PopupFormSelection>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <PopupFormDisplay
            sx={{
              p: '1em',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              data-testid="LocationForm__StartingLocation-Output"
              label="Start Location"
              color="secondary"
              size="small"
              inputProps={{
                sx: {
                  cursor: 'default',
                },
              }}
              InputProps={{
                readOnly: true,
                startAdornment: formData.Locations?.some((loc) => loc.tag === 'start') ? (
                  <LocationChip
                    locationId={
                      formData.Locations?.find((loc) => loc.tag === 'start')
                        ?.location as string
                    }
                    onDelete={() =>
                      handleRemoveLocation(
                        formData.Locations?.find((loc) => loc.tag === 'start')
                          ?.location as string,
                        'start',
                      )
                    }
                  />
                ) : null,
                sx: {
                  cursor: 'default',
                },
              }}
              sx={{
                display: 'flex',
                width: '150px',
                cursor: 'default',
                my: '5%',
              }}
            />
            <TextField
              data-testid="LocationForm__EndingLocation-Output"
              label="End Location"
              color="secondary"
              size="small"
              inputProps={{
                sx: {
                  cursor: 'default',
                },
              }}
              InputProps={{
                readOnly: true,
                startAdornment: formData.Locations?.some((loc) => loc.tag === 'end') ? (
                  <LocationChip
                    locationId={
                      formData.Locations?.find((loc) => loc.tag === 'end')
                        ?.location as string
                    }
                    onDelete={() =>
                      handleRemoveLocation(
                        formData.Locations?.find((loc) => loc.tag === 'end')
                          ?.location as string,
                        'end',
                      )
                    }
                  />
                ) : null,
                sx: {
                  cursor: 'default',
                },
              }}
              sx={{
                display: 'flex',
                width: '150px',
                cursor: 'default',
                my: '5%',
              }}
            />
            <Box
              data-testid="LocationForm__OtherLocation-Output"
              sx={{
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderRadius: '5px',
                borderColor: formData.isEmergency
                  ? 'action.disabledBackground'
                  : 'primary.main',
                py: '.5em',
                px: '.2em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                mt: '5%',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: formData.isEmergency ? 'text.disabled' : 'text.secondary',
                  wrap: 'nowrap',
                  cursor: 'default',
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
                  maxHeight: '100px',
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
                        onDelete={() => handleRemoveLocation(loc.location, 'other')}
                        key={loc.location}
                      />
                    ),
                )}
              </Box>
            </Box>
          </PopupFormDisplay>
        </Box>
      </FormControl>
    </Box>
  );
};
