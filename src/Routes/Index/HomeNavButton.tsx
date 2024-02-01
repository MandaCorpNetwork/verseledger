/// <reference types="vite/client" />
import './Home.scss';

import { useTheme } from '@emotion/react';
import { alpha, Box, Typography } from '@mui/material';
import React from 'react';

type HomeNavButtonProps = {
  title: string;
  to: string;
  videoSource: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const HomeNavButton: React.FC<HomeNavButtonProps> = ({
  title,
  videoSource,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  const width = {
    width: isHovered ? '24em' : '18em',
  };

  return (
    <Box
      width={width}
      height="7em"
      marginTop="1em"
      marginLeft="1em"
      sx={{
        position: 'relative',
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        zIndex: -15,
        border: '5px ridge #065691',
        borderRadius: '.4em',
      }}
      display="flex"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video loop muted id="menu-video">
        <source src={videoSource} type="video/webm" />
      </video>
      <Typography
        variant="body1"
        alignSelf="flex-end"
        marginLeft="auto"
        marginTop="auto"
        padding=".5em"
        fontSize="1.1em"
        sx={{ color: theme.palette.text.primary }}
      >
        {title}
      </Typography>
    </Box>
  );
};
