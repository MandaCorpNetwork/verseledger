import { useSoundEffect } from '@Audio/AudioManager';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DoubleArrow } from '@mui/icons-material';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { ILocationWithContractLocation } from 'vl-shared/src/schemas/LocationSchema';

type LocationsDisplayProps = {
  locations: ILocationWithContractLocation[];
};

export const LocationsDisplay: React.FC<LocationsDisplayProps> = ({ locations = [] }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
  const sound = useSoundEffect();
  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [sound, setIsExpanded]);
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
        width: '100%',
        maxWidth: '325px',
        p: '.5em',
        mb: '1em',
      }}
    >
      <DigiDisplay data-testid="SelectedContract-Locations__TitleText">
        <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
          Locations
        </Typography>
        <IconButton
          data-testid="AppDockCollapse__Collapse_Button"
          sx={{ position: 'absolute', left: 0, top: 0, p: 0 }}
          onClick={handleExpand}
        >
          <DoubleArrow
            fontSize="small"
            sx={{
              transform: `rotate(${isExpanded ? '-90' : '90'}deg) scale(0.9)`,
              opacity: '0.4',
              filter:
                'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
              transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
              '&:hover': {
                transform: `rotate(${isExpanded ? '-90' : '90'}deg) scale(1)`,
                opacity: '1',
              },
            }}
          />
        </IconButton>
      </DigiDisplay>
      <Collapse in={isExpanded} sx={{ width: '100%' }}>
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
                    mt: '.5em',
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
      </Collapse>
    </DigiBox>
  );
};
