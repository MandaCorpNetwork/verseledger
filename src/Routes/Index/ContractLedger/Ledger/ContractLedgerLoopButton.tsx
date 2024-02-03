///<reference types="vite/client" />
import './ContractLedgerLoopButton.scss';
import { Button, Typography } from '@mui/material';
import  React, { useState } from 'react';
import { useTheme } from '@emotion/react';

type ContractLedgerLoopButtonProps = {
  title: string;
  videoSource: string;
};

export const ContractLedgerLoopButton: React.FC<ContractLedgerLoopButtonProps> = ({ title, videoSource }) => {
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
      id="contract-loop-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          height: '8em',
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
