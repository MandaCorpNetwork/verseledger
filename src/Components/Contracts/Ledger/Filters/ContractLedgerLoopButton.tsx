///<reference types="vite/client" />
import './ContractLedgerLoopButton.scss';

import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useFilters } from '@/Utils/Hooks/useFilters';

type ContractLedgerLoopButtonProps = {
  title: string;
  videoSource: string;
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export const ContractLedgerLoopButton: React.FC<ContractLedgerLoopButtonProps> = ({
  title,
  videoSource,
  selectedType,
  setSelectedType,
}) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useFilters();
  const isSelected = selectedType === title;

  const handleClick = () => {
    // @ts-expect-error TS2322: Type 'string' is not assignable to type 'string | undefined',
    setFilters('contractType', title);
    setSelectedType(title);

    const video = document.getElementById(videoSource) as HTMLVideoElement;
    if (isSelected) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
    // Currently not working
  };

  return (
    <Button
      id="contract-loop-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-testid="contract-loop-button"
      sx={{
        color: 'text.primary',
        width: isSelected ? '20em' : '18em',
        height: '5em',
        display: 'flex',
        border: '5px ridge',
        borderColor: isSelected ? 'primary.main' : 'text.disabled',
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
