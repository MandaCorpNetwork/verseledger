///<reference types="vite/client" />
import '../ContractLedgerApp.css';

import { Button, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

type ContractLedgerLoopButtonProps = {
  title: string;
  videoSource: string;
  onClick: () => void;
  selected: boolean;
};

export const ContractLedgerLoopButton: React.FC<ContractLedgerLoopButtonProps> = ({
  title,
  videoSource,
  onClick,
  selected,
}) => {
  const [_isHovered, setIsHovered] = useState(false);

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
      onClick={() => onClick}
      data-testid="contract-loop-button"
      sx={{
        color: 'text.primary',
        // width: isSelected ? '20em' : '18em',
        width: '18em',
        height: '5em',
        display: 'flex',
        border: '3px ridge',
        borderColor: selected ? 'secondary.main' : 'primary.dark',
        borderRadius: '.4em',
        zIndex: '3',
        marginTop: '1em',
        '&:hover': {
          border: '3px ridge',
          borderColor: 'primary.light',
          //width: '20em',
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
        variant="h6"
        sx={{
          color: 'text.primary',
          textShadow: '1px 4px 8px rgb(0,0,0)',
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
