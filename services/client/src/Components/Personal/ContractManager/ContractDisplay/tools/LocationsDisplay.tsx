import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { Box, Typography } from '@mui/material';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { ILocationWithContractLocation } from 'vl-shared/src/schemas/LocationSchema';

type LocationsDisplayProps = {
  locations: ILocationWithContractLocation[];
};

export const LocationsDisplay: React.FC<LocationsDisplayProps> = ({ locations = [] }) => {
  const scrollRef = useHorizontalAdvancedScroll();
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

  return (
    <DigiBox
      data-testid="SelectedContract__LocationsContainer"
      sx={{
        width: '80%',
        p: '.5em',
        mb: '1em',
      }}
    >
      <DigiDisplay data-testid="SelectedContract-Locations__TitleText">
        <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
          Locations
        </Typography>
      </DigiDisplay>
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                data-testid="ContractDisplay-Locations-OtherLocations__LocationChipDisplayWrapper"
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  overflowX: 'auto',
                  gap: '.5em',
                  maxWidth: '80%',
                  my: '.5em',
                  '&::-webkit-scrollbar': {
                    width: '5px',
                    height: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgb(0,73,130)',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '20px',
                    background: 'rgb(24,252,252)',
                  },
                }}
              >
                {otherLocationIds.map((id) => (
                  <LocationChip key={id} locationId={id} sx={{ mb: '.2em' }} />
                ))}
              </Box>
            </Box>
          </Box>
        </DigiDisplay>
      )}
    </DigiBox>
  );
};
