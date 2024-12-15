import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { LocationSearch } from '@CommonLegacy/Components/App/LocationSearch';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { selectLocationById } from '@Redux/Slices/Locations/locations.selectors';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import type { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { ExploreController } from './ExploreController';
import { ExploreMap } from './ExplorerMap';
import { InfoDisplay } from './InfoDisplay';

export const ExploreApp: React.FC<unknown> = () => {
  const { selectedLocationId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const currentLocation = useAppSelector(selectUserLocation);
  const selectedLocation = useAppSelector((state) => {
    if (selectedLocationId) {
      return selectLocationById(state, selectedLocationId);
    }
  });
  const handleLocationSelect = React.useCallback(
    (location: ILocation | null) => {
      if (location != null) {
        navigate(`/apps/explore/${location.id}`);
      }
    },
    [navigate],
  );
  return (
    <Box
      data-testid="ExploreApp__Container"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
        width: '100%',
        position: 'relative',
        gap: '2em',
      }}
    >
      <FeatureDisplay
        data-testid="ExploreApp__Information_Container"
        sx={{
          height: '100%',
          gap: '1em',
          p: '1em',
          minWidth: { xs: '100%', md: '600px' },
        }}
      >
        <LocationSearch onLocationSelect={handleLocationSelect} />
        {selectedLocationId ? (
          <InfoDisplay
            selectedLocation={selectedLocation ?? null}
            currentLocation={currentLocation}
          />
        ) : (
          <FeatureDisplay
            data-testid="ExploreApp-Information__NoLocation_Wrapper"
            sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography
              data-testid="ExploreApp-Information__NoLocation_Title"
              variant="h5"
              sx={{
                letterSpacing: '2px',
                color: 'grey',
                textShadow: '0 3px 6px rgb(0,0,0)',
              }}
            >
              No Selected Location
            </Typography>
          </FeatureDisplay>
        )}
      </FeatureDisplay>
      <FeatureDisplay
        data-testid="ExploreApp__Explorer_Container"
        sx={{
          flexGrow: '1',
          p: '1em',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {!isMobile && <ExploreMap />}
        <ExploreController />
      </FeatureDisplay>
    </Box>
  );
};
