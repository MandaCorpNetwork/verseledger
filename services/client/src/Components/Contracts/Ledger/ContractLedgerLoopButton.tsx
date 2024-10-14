///<reference types="vite/client" />
import './ContractLedgerLoopButton.css';

import { Button, SxProps, Typography } from '@mui/material';
import type { verseOSTheme } from '@Themes/VerseOS';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React, { useMemo, useState } from 'react';

type ContractLedgerLoopButtonProps = {
  title: string;
  videoSource: string;
  value: string;
  sx?: SxProps<typeof verseOSTheme>;
};

export const ContractLedgerLoopButton: React.FC<ContractLedgerLoopButtonProps> = ({
  title,
  videoSource,
  value,
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

  const { searchParams, setFilters } = useURLQuery();

  const currentFilterValues = useMemo(() => {
    const archetypeFilters = searchParams.getAll(QueryNames.Archetype);
    return Array.isArray(archetypeFilters) ? archetypeFilters : [archetypeFilters];
  }, [searchParams]);

  const handleArchetypeChange = (value: string) => {
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    if (currentFilterValues.includes(value)) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
    setFilters(
      QueryNames.Archetype,
      currentFilterValues.includes(value)
        ? currentFilterValues.filter((archetype) => archetype !== value)
        : [...currentFilterValues, value],
    );
  };

  return (
    <Button
      id="contract-loop-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleArchetypeChange(value)}
      data-testid="contract-loop-button"
      sx={{
        color: 'text.primary',
        // width: isSelected ? '20em' : '18em',
        width: '18em',
        height: '5em',
        display: 'flex',
        border: '3px ridge',
        borderColor: currentFilterValues.includes(value)
          ? 'secondary.main'
          : 'primary.dark',
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
        ...sx,
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
