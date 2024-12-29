import { DashLocationExplorer } from '@Apps/User/Dashboard/Tools/LocationsExplorer';
import { useSoundEffect } from '@Audio/AudioManager';
import { useRadioController } from '@Audio/AudioProvider';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import { PowerSettingsNew } from '@mui/icons-material';
import { Badge, Box, Button, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { markAllRead } from '@Redux/Slices/Notifications/actions/markAllRead.action';
import { selectNotificationsUnreadCount } from '@Redux/Slices/Notifications/notifications.selectors';
import { closeWidget, openWidget } from '@Redux/Slices/Widgets/widgets.actions';
import { WIDGET_RADIO } from '@Widgets/Radio/Radio';
import React, { Suspense } from 'react';

import { RadioStationApp } from './RadioStationApp';

//TODO: Need to Rework the Loading Logic for the Notification Tool
const NotificationToolComponent = React.lazy(() => import('./NotificationTool'));

export const DashboardApp: React.FC<unknown> = () => {
  const { isPlaying, play, pause } = useRadioController();
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();

  const toggleRadio = () => {
    if (isPlaying) {
      pause();
      sound.playSound('close');
      dispatch(closeWidget(WIDGET_RADIO));
    } else {
      play();
      sound.playSound('open');
      dispatch(openWidget(WIDGET_RADIO));
    }
  };

  const unreadCount = useAppSelector(selectNotificationsUnreadCount);

  const handleMarkAllRead = () => {
    sound.playSound('close');
    dispatch(markAllRead());
  };

  return (
    <Box
      data-testid="OverviewToolWrapper"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '1em',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        data-testid="Overview-NotificationContainer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', md: '35%' },
          height: 'fit-content',
        }}
      >
        <FeatureContainer
          data-testid="Overview__NotificationWrapper"
          sx={{
            display: 'flex',
            padding: { xs: '.5em', md: '1em' },
            mx: { xs: '0', md: '1em' },
            my: { xs: '.5em', md: '1em' },
            width: '100%',
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
        </FeatureContainer>
        <FeatureContainer
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
        </FeatureContainer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', md: '55%' },
          height: { xs: 'auto', md: '100%' },
        }}
      >
        <DashLocationExplorer />
        <FeatureContainer
          data-id="ShipStatusToolContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '.5em',
            mx: { xs: '0', md: '1em' },
            my: { xs: '.5em', md: '1em' },
            width: '100%',
            height: { xs: 'auto', md: '45%' },
            position: 'relative',
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
        </FeatureContainer>
      </Box>
    </Box>
  );
};
