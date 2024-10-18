import { WorkZoneBar } from '@Common/Components/App/InDevelopment';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { selectLocationById } from '@Redux/Slices/Locations/locations.selectors';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { ExploreController } from './ExploreController';
import { ExploreMap } from './ExplorerMap';
import { InfoDisplay } from './InfoDisplay';

export const ExploreApp: React.FC<unknown> = () => {
  const { selectedLocationId } = useParams();
  const navigate = useNavigate();
  const currentLocation = useAppSelector(selectUserLocation);
  const selectedLocation = useAppSelector((state) => {
    if (selectedLocationId) {
      return selectLocationById(state, selectedLocationId);
    }
  });
  const handleLocationSelect = React.useCallback(
    (location: ILocation | null) => {
      if (location != null) {
        navigate(`/dashboard/explore/${location.id}`);
      }
    },
    [navigate],
  );
  return (
    <Box
      data-testid="ExploreApp__Container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        position: 'relative',
        gap: '1em',
      }}
    >
      <WorkZoneBar side="bottom" severity="pending" speed="slow" />
      <WorkZoneBar side="top" severity="pending" speed="slow" />
      <WorkZoneBar side="left" severity="pending" speed="slow" />
      <WorkZoneBar side="right" severity="pending" speed="slow" />
      <GlassDisplay
        data-testid="ExploreApp__Information_Container"
        sx={{
          height: '100%',
          width: '35%',
          gap: '1em',
          p: '1em',
        }}
      >
        <LocationSearch onLocationSelect={handleLocationSelect} />
        {selectedLocationId ? (
          <InfoDisplay
            selectedLocation={selectedLocation ?? null}
            currentLocation={currentLocation}
          />
        ) : (
          <GlassDisplay
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
          </GlassDisplay>
        )}
      </GlassDisplay>
      <GlassDisplay
        data-testid="ExploreApp__Explorer_Container"
        sx={{
          height: '100%',
          flexGrow: '1',
          p: '1em',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ExploreMap />
        <ExploreController />
      </GlassDisplay>
    </Box>
  );
};
