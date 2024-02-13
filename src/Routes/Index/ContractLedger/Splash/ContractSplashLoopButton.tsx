/// <reference types="vite/client" />
import './ContractSplashLoop.scss';

import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

type SplashLoopButtonProps = {
  title: string;
  videoSource: string;
  to: string;
};

export const ContractSplashLoopButton: React.FC<SplashLoopButtonProps> = ({
  title,
  videoSource,
}) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    video.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <Button
      id="splash-loop-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        color: 'text.primary',
        width: '22em',
        height: '11em',
        display: 'flex',
        border: '5px ridge #065691',
        borderRadius: '.4em',
        zIndex: '3',
        '&:hover': {
          border: '5px ridge #79c0f4',
        },
        '&:active': {
          border: '5px ridge #18fcfc',
          color: 'text.secondary',
        },
      }}
    >
      <video loop muted id={videoSource} className="splash-video">
        <source src={videoSource} type="video/webm" />
      </video>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '1.4em',
          letterSpacing: '0.04em',
          zindex: '4',
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
