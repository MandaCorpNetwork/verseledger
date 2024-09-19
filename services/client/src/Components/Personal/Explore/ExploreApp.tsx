import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Gauge, SparkLineChart } from '@mui/x-charts';
import { useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locationSelectors';
import { isDev } from '@Utils/isDev';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { InfoDisplay } from './InfoDisplay';
import { ExploreMap } from './ExplorerMap';
import { ExploreController } from './ExploreController';

export const ExploreApp: React.FC<unknown> = () => {
  const { selectedLocationId } = useParams();
  const selectedLocation = useAppSelector((state) => {
    if (selectedLocationId) {
      return selectLocationById(state, selectedLocationId);
    }
  });
  const dev = isDev();
  const navigate = useNavigate();
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
      {!dev && <InDevOverlay supportButton={true} />}
      <GlassBox
        data-testid="ExploreApp__Information_Container"
        sx={{
          height: '100%',
          maxWidth: '35%',
          gap: '1em',
          p: '1em',
        }}
      >
        <LocationSearch onLocationSelect={handleLocationSelect} />
        <InfoDisplay />
      </GlassBox>
      <GlassBox
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
      </GlassBox>
    </Box>
  );
};
