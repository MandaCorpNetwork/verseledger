import '@Assets/Css/RadioStationApp.css';

import { useRadioController } from '@Audio/AudioProvider';
import {
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { closeWidget } from '@Redux/Slices/Widgets/widgets.actions';
import useScrollSlider from '@Utils/Hooks/scrollSlider';
import { VLWidget } from '@Widgets/WidgetWrapper/WidgetWrapper';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback } from 'react';

export const WIDGET_RADIO = 'radio';

export const RadioWidget: React.FC = () => {
  const {
    isPlaying,
    pause,
    currentStation,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    nextStation,
    previousStation,
  } = useRadioController();
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    pause();
    dispatch(closeWidget(WIDGET_RADIO));
  }, [dispatch, pause]);

  // Close the widget if the radio stops playing for some reason
  React.useEffect(() => {
    if (!isPlaying) {
      enqueueSnackbar('Radio Playback Error', { variant: 'error' });
      handleClose();
    }
  }, [handleClose, isPlaying]);

  const VolumeIcon = () => {
    if (isMuted) {
      return <VolumeOff fontSize="small" />;
    } else if (volume === 0) {
      return <VolumeMute fontSize="small" />;
    } else if (volume > 50) {
      return <VolumeUp fontSize="small" />;
    } else {
      return <VolumeDown fontSize="small" />;
    }
  };

  const sliderRef = React.useRef<HTMLDivElement>(null);
  useScrollSlider(sliderRef, (newValue) => setVolume(newValue), volume);

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    setVolume(newVolume);
  };

  return (
    <VLWidget
      name={WIDGET_RADIO}
      title="Radio"
      onClose={handleClose}
      data-testid="RadioWidget"
    >
      <Box
        data-testid="RadioWidget__Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '.5em',
        }}
      >
        <Box
          data-testid="RadioWidget__Source_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: '.5em',
          }}
        >
          <IconButton size="small" onClick={previousStation}>
            <SkipPrevious fontSize="small" />
          </IconButton>
          <Typography
            data-testid="RadioWidget__Source_NowPlaying"
            variant="body2"
            sx={{
              color: 'secondary.main',
              bgcolor: 'primary.main',
              borderRadius: '5px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '7em',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'rgba(33,150,243,.7)',
              boxShadow: '0 2px 10px rgba(0,0,0,.6)',
              '&:hover': {
                boxShadow: '0 2px 10px rgba(33,150,243,.7)',
              },
              transition: 'boxShadow .3s ease-in-out',
            }}
          >
            <Box
              data-testid="RadioWidget-Source-NowPlaying__TextWrapper"
              component="span"
              style={{
                display: 'inline-block',
                padding: '0 100%',
                animation: 'marquee 7s linear infinite',
              }}
            >{`[${currentStation.name}] - Unknown Track`}</Box>
          </Typography>
          <IconButton size="small" onClick={nextStation}>
            <SkipNext fontSize="small" />
          </IconButton>
        </Box>
        <Box
          data-testid="RadioWidget__VolumeControl_Wrapper"
          ref={sliderRef}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton onClick={toggleMute} size="small">
            <VolumeIcon />
          </IconButton>
          <Slider
            value={volume as number}
            disabled={isMuted}
            onChange={handleVolumeChange}
            color="secondary"
            sx={{ width: '7em' }}
            size="small"
          />
        </Box>
      </Box>
    </VLWidget>
  );
};
