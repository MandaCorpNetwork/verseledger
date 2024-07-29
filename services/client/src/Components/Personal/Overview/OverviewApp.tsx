import { PowerSettingsNew, Sync } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/authSelectors';
import { closeWidget, openWidget } from '@Redux/Slices/Widgets/widgets.actions';
import { useSound } from '@Utils/Hooks/useSound';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { useRadioController } from '@/AudioProvider';
import { LocationExplorerTool } from '@/Components/Personal/Overview/LocationExplorerTool';
//import { ActiveToolsOverview } from '@/Components/Personal/Overview/ActiveTools';
import { OverviewNotification } from '@/Components/Personal/Overview/NotificationTool';
import { RadioStationApp } from '@/Components/Personal/Overview/RadioStationApp';
import { WIDGET_RADIO } from '@/Widgets/Radio/Radio';

export const OverviewApp: React.FC<unknown> = () => {
  const { isPlaying, play, pause } = useRadioController();
  const playSound = useSound();
  const dispatch = useAppDispatch();

  const toggleRadio = () => {
    if (isPlaying) {
      pause();
      playSound('close');
      dispatch(closeWidget(WIDGET_RADIO));
    } else {
      play();
      playSound('open');
      dispatch(openWidget(WIDGET_RADIO));
    }
  };

  const currentLocation = useAppSelector(selectUserLocation);

  const [selectedLocation, setSelectedLocation] = React.useState<ILocation | null>(
    currentLocation,
  );

  React.useEffect(() => {
    setSelectedLocation(currentLocation);
  }, [currentLocation]);

  const handleResetLocation = () => {
    playSound('close');
    setSelectedLocation(currentLocation);
  };

  return (
    <Box
      data-testid="OverviewToolContainer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        data-testid="OverviewToolWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1em',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          data-testid="Overview-NotificationContainer"
          sx={{ display: 'flex', flexDirection: 'column', width: '35%', height: '100%' }}
        >
          <Box
            data-testid="Overview__NotificationWrapper"
            sx={{
              padding: '1em',
              margin: '1em',
              width: '100%',
              height: '35%',
              alignItems: 'center',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              background: 'rgba(0,30,100,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box
              data-id="NotificationToolTitle"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '10%',
                mb: '1.5em',
              }}
            >
              <Typography variant="h6">Notifications</Typography>
            </Box>
            <Box
              data-id="NotificationToolContent"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                padding: '1em',
                overflow: 'auto',
                height: '85%',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '20px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderRadius: '5px',
                borderColor: 'primary.main',
                borderLeft: '1px solid rgba(14,49,141,0.5)',
                borderRight: '1px solid rgba(14,49,141,0.5)',
                boxShadow: '0 5px 15px rgba(14,49,141,.8)',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  background:
                    'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                  opacity: 0.6,
                  backdropFilter: 'blur(10px)',
                  zIndex: -1,
                  backgroundImage:
                    'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                  backgroundSize: '100% 2px',
                },
              }}
            >
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
              <OverviewNotification />
            </Box>
          </Box>
          <Box
            data-testid="RadioFrequenciesToolContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '1em',
              ml: '1em',
              width: '100%',
              height: '30%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              background: 'rgba(0,30,100,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box data-testid="RadioFrequenciesToolTitle">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">Radio Stations</Typography>
                <IconButton onClick={toggleRadio} sx={{ ml: 'auto' }}>
                  <PowerSettingsNew
                    color={isPlaying ? 'success' : 'error'}
                    fontSize="large"
                  />
                </IconButton>
              </Box>
            </Box>
            <Box
              data-id="RadioFrequenciesToolContent"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <RadioStationApp isDisabled={!isPlaying} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '55%', height: '100%' }}
        >
          <Box
            data-id="LocationExplorerToolContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              margin: '1em',
              width: '100%',
              height: '45%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              background: 'rgba(0,30,100,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box data-id="LocationExplorerToolTitle" sx={{ height: '10%', p: '.5em' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">Location Explorer</Typography>
                <Tooltip title="Reset Selected Location">
                  <IconButton sx={{ ml: 'auto' }} onClick={handleResetLocation}>
                    <Sync />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box data-id="LocationExplorerToolContent" sx={{ height: '90%' }}>
              <LocationExplorerTool
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </Box>
          </Box>
          <Box
            data-id="ShipStatusToolContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '1em',
              ml: '1em',
              width: '100%',
              height: '45%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              background: 'rgba(0,30,100,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box data-id="ShipStatusToolTitle" sx={{ height: '10%' }}>
              <Typography variant="h6">Ship Status</Typography>
            </Box>
            <Box
              data-testid="ShipStatusToolContent"
              sx={{
                height: '85%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.disabled',
                  textShadow: '0px 0px 4px rgb(8,22,252)',
                }}
              >
                In Development
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
