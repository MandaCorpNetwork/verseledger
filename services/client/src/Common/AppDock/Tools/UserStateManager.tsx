import { useSoundEffect } from '@Audio/AudioManager';
import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { setUserLocation } from '@Redux/Slices/Auth/Actions/setUserLocation.action';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const UserStateManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const userLocation = useAppSelector(selectUserLocation);
  const handleLocationSelect = React.useCallback(
    (location: ILocation | null) => {
      if (location) {
        sound.playSound('loading');
        dispatch(setUserLocation(location));
      }
    },
    [sound, dispatch],
  );
  return (
    <GlassDisplay
      data-testid="UserStateManager__Container"
      sx={{
        px: '1em',
        py: '0.5em',
        gap: '1em',
        background: 'linear-gradient(135deg, rgba(14,35,141,0.5), rgba(0,30,100,0.5))',
      }}
    >
      <DigiBox
        data-testid="UserStateManager__Location_Wrapper"
        sx={{ p: '0.5em', gap: '1em' }}
      >
        <DigiDisplay
          data-testid="UserStateManager-Location__Title_Wrapper"
          sx={{
            flexDirection: 'row',
            px: '0.5em',
            py: '0.2em',
            gap: '0.5em',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography data-testid="UserStateManager-Location__Title">
            Current Location:
          </Typography>
          {userLocation.id ? (
            <LocationChip locationId={userLocation.id} size="small" />
          ) : (
            <Typography variant="body2" color="info">
              No Location
            </Typography>
          )}
        </DigiDisplay>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </DigiBox>
      <DigiBox
        data-testid="UserStateManager__Ship_Wrapper"
        sx={{ p: '0.5em', gap: '1em', position: 'relative' }}
      >
        <InDevOverlay />
        <DigiDisplay
          data-testid="UserStateManager-Ship__Title_Wrapper"
          sx={{
            flexDirection: 'row',
            px: '0.5em',
            py: '0.2em',
            gap: '0.5em',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography data-testid="UserStateManager-Ship__Title">Current Ship</Typography>
          <Typography variant="body2" color="info">
            No Ship
          </Typography>
        </DigiDisplay>
        <Box sx={{ height: '20px' }} />
      </DigiBox>
    </GlassDisplay>
  );
};
