///<reference types="vite/client" />
import './ContractLedgerLoopButton.scss';

import { Button, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';

import { verseOSTheme } from '@/Themes/VerseOS';

type ContractLedgerLoopButtonProps = {
  title: string;
  videoSource: string;
  selectedType: string[];
  setSelectedType: React.Dispatch<React.SetStateAction<string[]>>;
  sx?: SxProps<typeof verseOSTheme>;
};

export const ContractLedgerLoopButton: React.FC<ContractLedgerLoopButtonProps> = ({
  title,
  videoSource,
  selectedType,
  setSelectedType,
  sx,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const isSelected = selectedType.includes(title);

  const handleClick = () => {
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    if (isSelected) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }

    setSelectedType((prevSelected) =>
      isSelected
        ? prevSelected.filter((type) => type !== title)
        : [...prevSelected, title],
    );
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
        // width: isSelected ? '20em' : '18em',
        width: '18em',
        height: '5em',
        display: 'flex',
        border: '5px ridge',
        borderColor: isSelected ? 'primary.main' : 'primary.dark',
        borderRadius: '.4em',
        zIndex: '3',
        marginTop: '1em',
        '&:hover': {
          border: '5px ridge',
          borderColor: 'primary.light',
          //width: '20em',
        },
        '&:active': {
          color: 'text.secondary',
          borderColor: 'primary.main',
        },
        ...sx,
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
