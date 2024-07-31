///<reference types="vite/client" />
import './ContractLedgerLoopButton.scss';

import { Button, SxProps, Typography } from '@mui/material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React, { useMemo, useState } from 'react';

import type { verseOSTheme } from '@/Themes/VerseOS';

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

  const [filters, setFilters] = useURLQuery();

  const currentFilterValues = useMemo(() => {
    const archetypeFilters = filters.getAll(QueryNames.Archetype);
    return Array.isArray(archetypeFilters) ? archetypeFilters : [archetypeFilters];
  }, [filters]);

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
        border: '5px ridge',
        borderColor: currentFilterValues.includes(value)
          ? 'secondary.main'
          : 'primary.main',
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
