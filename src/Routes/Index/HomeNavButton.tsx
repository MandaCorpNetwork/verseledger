/// <reference types="vite/client" />
import './Home.scss';

import { useTheme } from '@emotion/react';
import { alpha, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

type HomeNavButtonProps = {
  title: string;
  to: string;
  videoSource: string;
};

export const HomeNavButton: React.FC<HomeNavButtonProps> = ({ title, videoSource }) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  const [isHovered, setIsHovered] = useState(false);
  //const [isClicked, setIsClicked] = React.useState(false);
  // useEffect(() => {
  //const videoElement = document.getElementById('menu-video') as HTMLVideoElement;

  const handleEnter = () => {
    setIsHovered(true);
  };

  const handleExit = () => {
    setIsHovered(false);
  };

  return (
    <Transition in={isHovered} timeout={1000} onEnter={handleEnter} onExit={handleExit}>
      {(state) => {
        <Box
          width={state === 'entered' ? '24em' : '18em'}
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
        </Box>;
      }}
    </Transition>
  );
};
