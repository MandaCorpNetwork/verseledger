import './RadioFrequencies.css';

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
import React, { useState } from 'react';

type RadioFrequenciesProps = {
  isDisabled: boolean;
};

export const RadioFrequenciesTool: React.FC<RadioFrequenciesProps> = ({ isDisabled }) => {
  const [volume, setVolume] = useState<number>(30);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 30 : 0);
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
    <Box
      data-id="RadioFrequenciesToolFunctionContainer"
      sx={{
        bgcolor: 'rgb(6, 86, 145, .15)',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '.5em',
        opacity: isDisabled ? '0.5' : '1',
        borderTop: '2px solid',
        borderBottom: '2px solid',
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
          backgroundImage: 'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
          backgroundSize: '100% 2px',
        },
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
        <IconButton disabled={isDisabled}>
          <SkipPrevious fontSize="large" />
        </IconButton>
        <Typography>Current Station</Typography>
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
        <IconButton disabled={isDisabled}>
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
    </Box>
  );
};
