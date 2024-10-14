import { useSoundEffect } from '@Audio/AudioManager';
import { useRadioController } from '@Audio/AudioProvider';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import { LocationExplorerTool } from '@Components/Personal/Overview/LocationExplorerTool';
//import { ActiveToolsOverview } from '@Components/Personal/Overview/ActiveTools';
import { RadioStationApp } from '@Components/Personal/Overview/RadioStationApp';
import { PowerSettingsNew, Sync } from '@mui/icons-material';
import { Badge, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { markAllRead } from '@Redux/Slices/Notifications/actions/markAllRead.action';
import { selectNotificationsUnreadCount } from '@Redux/Slices/Notifications/notifications.selectors';
import { closeWidget, openWidget } from '@Redux/Slices/Widgets/widgets.actions';
import { WIDGET_RADIO } from '@Widgets/Radio/Radio';
import React, { Suspense } from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

//TODO: Need to Rework the Loading Logic for the Notification Tool
const NotificationToolComponent = React.lazy(() => import('./NotificationTool'));

export const OverviewApp: React.FC<unknown> = () => {
  const { isPlaying, play, pause } = useRadioController();
  const { playSound } = useSoundEffect();
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

  const unreadCount = useAppSelector(selectNotificationsUnreadCount);

  const handleMarkAllRead = () => {
    playSound('close');
    dispatch(markAllRead());
  };

  return (
    <Box
      data-testid="OverviewToolContainer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: { xs: 'auto', md: '100%' },
      }}
    >
      <Box
        data-testid="OverviewToolWrapper"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '1em',
          width: '100%',
          height: { xs: 'auto', md: '100%' },
        }}
      >
        <Box
          data-testid="Overview-NotificationContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '35%' },
            height: { xs: 'auto', md: '100%' },
          }}
        >
          <GlassBox
            data-testid="Overview__NotificationWrapper"
            sx={{
              padding: { xs: '.5em', md: '1em' },
              mx: { xs: '0', md: '1em' },
              my: { xs: '.5em', md: '1em' },
              width: '100%',
              height: '35%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Badge
                badgeContent={unreadCount}
                color="error"
                max={99}
                overlap="rectangular"
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: { xs: '.5em', md: '1.5em' },
                    ml: '.5em',
                    alignItems: 'center',
                    display: 'flex',
                    gap: '.8em',
                  }}
                >
                  Notifications
                </Typography>
              </Badge>
              <Button
                variant="text"
                size="small"
                color="secondary"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
              >
                <Typography variant="overline">Mark All Read</Typography>
              </Button>
            </Box>
            <Suspense fallback={<LoadingWheel />}>
              <NotificationToolComponent />
            </Suspense>
          </GlassBox>
          <GlassBox
            data-testid="RadioFrequenciesToolContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: { xs: 'auto', md: '30%' },
              p: { xs: '.5em', md: '1em' },
              mx: { xs: '0', md: '1em' },
              my: { xs: '.5em', md: '1em' },
            }}
          >
            <Box
              data-testid="RadioFrequenciesToolTitle"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Typography variant="h6" sx={{ ml: '.5em' }}>
                Radio Stations
              </Typography>
              <IconButton onClick={toggleRadio} sx={{ ml: 'auto' }}>
                <PowerSettingsNew
                  color={isPlaying ? 'success' : 'error'}
                  fontSize="large"
                />
              </IconButton>
            </Box>
            <Box
              data-id="RadioFrequenciesToolContent"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: { xs: 0, md: 1 },
              }}
            >
              <RadioStationApp isDisabled={!isPlaying} />
            </Box>
          </GlassBox>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '55%' },
            height: { xs: 'auto', md: '100%' },
          }}
        >
          <GlassBox
            data-id="LocationExplorerToolContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              mx: { xs: '0', md: '1em' },
              my: { xs: '.5em', md: '1em' },
              width: '100%',
              height: { xs: 'auto', md: '45%' },
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
          </GlassBox>
          <GlassBox
            data-id="ShipStatusToolContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              mx: { xs: '0', md: '1em' },
              my: { xs: '.5em', md: '1em' },
              width: '100%',
              height: { xs: 'auto', md: '45%' },
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
          </GlassBox>
        </Box>
      </Box>
    </Box>
  );
};
