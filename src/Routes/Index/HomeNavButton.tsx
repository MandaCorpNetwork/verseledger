/// <reference types="vite/client" />
import './Home.scss';

import { useTheme } from '@emotion/react';
import { alpha, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';

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

  //Might try adding a useEffect hook to try and change the width before testing the video changing. Trying to test to see if the Hover check is even working.
  /*const [boxWidth, setBoxWidth] = useState('18em');
  useEffect(() => {
    setBoxWidth(isHovered? '24em' : '18em');
  }, [isHovered]);*/

  return (
    <Transition in={isHovered} timeout={1000} onEnter={handleEnter} onExit={handleExit}>
      {(state) => {
        const width = state === 'entered' ? '24em' : '18em';
        return (
          <Box
            height="7em"
            marginTop="1em"
            marginLeft="1em"
            sx={{
              position: 'relative',
              backgroundColor: alpha(theme.palette.primary.main, 0.5),
              zIndex: -15,
              border: '5px ridge #065691',
              borderRadius: '.4em',
              width: { width },
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
          </Box>
        );
      }}
    </Transition>
  );
};
