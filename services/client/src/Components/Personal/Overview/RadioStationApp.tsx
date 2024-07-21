import './RadioStationApp.css';

import DigiBox from '@Common/Components/Boxes/DigiBox';
import {
  Language,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import { Box, Button, IconButton, Slider, Typography } from '@mui/material';
import React from 'react';

import { useRadioController } from '@/AudioProvider';

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
    <DigiBox
      data-id="RadioFrequenciesToolFunctionContainer"
      sx={{
        mt: '.5em',
        opacity: isDisabled ? '0.5' : '1',
      }}
    >
      <Box
        data-id="RadioPlaybackNowPlaying"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <IconButton disabled={isDisabled} onClick={previousStation}>
          <SkipPrevious fontSize="large" />
        </IconButton>
        <Typography>{currentStation.name}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          disabled={isDisabled}
          startIcon={<Language />}
        >
          Source
        </Button>
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
        <IconButton component="a" href={currentStation.url} disabled={isDisabled} onClick={nextStation}>
          <SkipNext fontSize="large" />
        </IconButton>
      </Box>
      <Box
        data-id="RadioFrequenciesVolumeControl"
        sx={{ display: 'flex', alignItems: 'center', gap: '.5em' }}
      >
        <IconButton onClick={toggleMute} disabled={isDisabled}>
          <VolumeIcon />
        </IconButton>
        <Slider
          value={volume as number}
          disabled={isMuted || isDisabled}
          onChange={handleVolumeChange}
          color="secondary"
          sx={{ width: '10em' }}
        />
      </Box>
    </DigiBox>
  );
};
