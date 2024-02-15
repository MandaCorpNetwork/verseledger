///<reference types="vite/client" />
import './ContractLedgerLoopButton.scss';

import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

type ContractLedgerLoopButtonProps = {
  title: string;
  videoSource: string;
  onClick: () => void;
};

export const ContractLedgerLoopButton: React.FC<ContractLedgerLoopButtonProps> = ({
  title,
  videoSource,
  onClick,
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
  //Hovering animation

  return (
    <Button
      id="contract-loop-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-testid="contract-loop-button"
      sx={{
        color: 'text.primary',
        width: '18em',
        height: '5em',
        display: 'flex',
        border: '5px ridge',
        borderColor: 'text.disabled',
        borderRadius: '.4em',
        zIndex: '3',
        marginTop: '1em',
        '&:hover': {
          border: '5px ridge #79c0f4',
          width: '20em',
        },
        '&:active': {
          color: 'text.secondary',
          borderColor: 'primary.main',
        },
      }}
    >
      <video loop muted id={videoSource} className="loop-video">
        <source src={videoSource} type="video/webm" />
      </video>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '1.2em',
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
