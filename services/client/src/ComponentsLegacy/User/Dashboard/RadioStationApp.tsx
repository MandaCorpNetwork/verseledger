import '@Assets/Css/RadioStationApp.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { useRadioController } from '@Audio/AudioProvider';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import {
  Language,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { Box, Button, IconButton, Slider, Typography, useTheme } from '@mui/material';
import useScrollSlider from '@Utils/Hooks/scrollSlider';
import { useIsMobile } from '@Utils/isMobile';
import React, { useRef } from 'react';

type RadioStationAppProps = {
  isDisabled: boolean;
};

export const RadioStationApp: React.FC<RadioStationAppProps> = ({ isDisabled }) => {
  const {
    nextStation,
    previousStation,
    currentStation,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = useRadioController();
  const sliderRef = useRef<HTMLDivElement>(null);
  useScrollSlider(sliderRef, (newValue) => setVolume(newValue), volume);
  const sound = useSoundEffect();
  const theme = useTheme();
  const mobile = useIsMobile();

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    setVolume(newVolume);
  };

  const VolumeIcon = () => {
    if (isMuted) {
      return <VolumeOff />;
    } else if (volume === 0) {
      return <VolumeMute />;
    } else if (volume > 50) {
      return <VolumeUp />;
    } else {
      return <VolumeDown />;
    }
  };

  return (
    <ComponentContainer
      data-id="RadioFrequenciesToolFunctionContainer"
      sx={{
        my: '.5em',
        opacity: isDisabled ? '0.5' : '1',
      }}
    >
      <Box
        data-id="RadioPlaybackNowPlaying"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '.2em', md: '1em' },
        }}
      >
        <IconButton
          disabled={isDisabled}
          onClick={previousStation}
          size={theme.breakpoints.down('md') ? 'small' : 'medium'}
        >
          <SkipPrevious fontSize={theme.breakpoints.down('md') ? 'medium' : 'large'} />
        </IconButton>
        <Typography
          variant={theme.breakpoints.down('md') ? 'body2' : 'body1'}
          align="center"
        >
          {currentStation.name}
        </Typography>
        {mobile ? (
          <IconButton
            size="small"
            component="a"
            href={currentStation.link}
            target="_blank"
            rel="noopener noreferrer"
            disabled={isDisabled}
            onClick={() => sound.playSound('navigate')}
          >
            <Language />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            component="a"
            href={currentStation.link}
            target="_blank"
            rel="noopener noreferrer"
            disabled={isDisabled}
            startIcon={<Language />}
            onClick={() => sound.playSound('navigate')}
          >
            Source
          </Button>
        )}

        <Typography
          sx={{
            bgcolor: 'primary.main',
            borderRadius: '5px',
            width: '6em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Box
            component="span"
            style={{
              display: 'inline-block',
              padding: '0 100%',
              animation: isDisabled ? '' : 'marquee 7s linear infinite',
            }}
          >
            Now Playing Track
          </Box>
        </Typography>
        <IconButton
          disabled={isDisabled}
          onClick={nextStation}
          size={theme.breakpoints.down('md') ? 'small' : 'medium'}
        >
          <SkipNext fontSize={theme.breakpoints.down('md') ? 'medium' : 'large'} />
        </IconButton>
      </Box>
      <Box
        data-id="RadioFrequenciesVolumeControl"
        ref={sliderRef}
        sx={{ display: 'flex', alignItems: 'center', gap: '.5em' }}
      >
        <IconButton onClick={toggleMute} disabled={isDisabled}>
          <VolumeIcon />
        </IconButton>
        <Slider
          size={mobile ? 'small' : 'medium'}
          value={volume as number}
          disabled={isMuted || isDisabled}
          onChange={handleVolumeChange}
          color="secondary"
          sx={{ width: '10em' }}
        />
      </Box>
    </ComponentContainer>
  );
};
