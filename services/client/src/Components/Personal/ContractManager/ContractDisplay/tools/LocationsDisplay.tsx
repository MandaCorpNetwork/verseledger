import DigiBox from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import DigiTitle from '@Common/Components/Typography/DigiTitle';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { ILocationWithContractLocation } from 'vl-shared/src/schemas/LocationSchema';

type LocationsDisplayProps = {
  locations: ILocationWithContractLocation[];
};

export const LocationsDisplay: React.FC<LocationsDisplayProps> = ({ locations = [] }) => {
  const [otherLocationIndex, setOtherLocationIndex] = React.useState(0);

  const getStartLocationId = React.useCallback(() => {
    if (locations) {
      const startLocationPull = locations?.find(
        (location) => location.ContractLocation?.tag === 'start',
      )?.id;
      return startLocationPull || null;
    }
    return null;
  }, [locations]);

  const getEndLocationId = React.useCallback(() => {
    if (locations) {
      const endLocationPull = locations?.find(
        (location) => location.ContractLocation?.tag === 'end',
      )?.id;
      Logger.info(`EndLocation: ${endLocationPull}`);
      return endLocationPull || null;
    }
    return null;
  }, [locations]);

  const getOtherLocationIds = React.useCallback(() => {
    if (locations) {
      const otherLocationsPull = locations?.filter(
        (location) => location.ContractLocation?.tag === 'other',
      );
      return otherLocationsPull.map((location) => location.id);
    }
    return [];
  }, [locations]);

  const startLocationId = getStartLocationId();
  const endLocationId = getEndLocationId();
  const otherLocationIds = getOtherLocationIds();

  const handleOtherLocationIndexChange = React.useCallback(
    (direction: string) => {
      if (otherLocationIds.length > 1) {
        setOtherLocationIndex((prevIndex) => {
          const newIndex =
            direction === 'back'
              ? prevIndex - 1
              : direction === 'forward'
                ? prevIndex + 1
                : prevIndex;
          return Math.max(0, Math.min(newIndex, otherLocationIds.length - 1));
        });
      }
      Logger.info(otherLocationIndex);
    },
    [setOtherLocationIndex],
  );

  return (
    <DigiBox
      data-testid="SelectedContract__LocationsContainer"
      sx={{
        width: '80%',
        p: '.5em',
        mb: '1em',
      }}
    >
      <DigiTitle data-testid="SelectedContract-Locations__TitleText" variant="body2">
        Locations
      </DigiTitle>
      <Box
        data-testid="SelectedContract-Locations__StartandEndWrapper"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '.5em',
          my: '.5em',
        }}
      >
        <DigiDisplay
          data-testid="SelectedContract-Locations__StartLocationWrapper"
          sx={{
            width: '40%',
            mx: 'auto',
            pb: '.3em',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
            Start Location
          </Typography>
          <LocationChip locationId={startLocationId ?? ''} />
        </DigiDisplay>
        {endLocationId && (
          <DigiDisplay
            data-testid="SelectedContract-Locations__EndLocationWrapper"
            sx={{
              width: '40%',
              mr: 'auto',
              pb: '.3em',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
              End Location
            </Typography>
            <LocationChip locationId={endLocationId ?? ''} />
          </DigiDisplay>
        )}
      </Box>
      {otherLocationIds.length > 0 && (
        <DigiDisplay
          data-testid="SelectedContract-Locations_OtherLocationsContainer"
          sx={{
            width: '82%',
            pb: '.3em',
            mx: 'auto',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
            Other Locations
          </Typography>
          <Box
            data-testid="SelectedContract-Locations__OtherLocationsWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              data-testid="ContractDisplay-Locations-OtherLocations__LocationPagnationWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleOtherLocationIndexChange('back')}
                disabled={otherLocationIndex === 0}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
              <Box
                data-testid="ContractDisplay-Locations-OtherLocations__LocationChipDisplayWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  data-testid="ContractDisplay-Locations-OtherLocations__LocationChip"
                  variant="body2"
                  align="center"
                >
                  {otherLocationIndex + 1}.{' '}
                  <LocationChip
                    locationId={
                      otherLocationIds ? otherLocationIds[otherLocationIndex] : 'Error'
                    }
                  />
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => handleOtherLocationIndexChange('forward')}
                disabled={
                  otherLocationIds
                    ? otherLocationIds.length < 1 ||
                      otherLocationIndex === otherLocationIds.length - 1
                    : false
                }
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </DigiDisplay>
      )}
    </DigiBox>
  );
};
