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
      }}
    >
      {!dev && <InDevOverlay supportButton={true} />}
      <GlassBox
        data-testid="ExploreApp__Information_Container"
        sx={{
          height: '100%',
          width: '35%',
          gap: '1em',
          p: '1em',
        }}
      >
        <LocationSearch onLocationSelect={handleLocationSelect} />
        <InfoDisplay />
      </GlassBox>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '65%' }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '80%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              position: 'relative',
              zIndex: 1,
              fontSize: '14px',
            }}
          >
            Map In Construction
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '20%' }}>
          <Box>
            <Button>Set Location</Button>
            <Button>View Logistics</Button>
            <Button>View Market</Button>
            <Button>Report Crime</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
