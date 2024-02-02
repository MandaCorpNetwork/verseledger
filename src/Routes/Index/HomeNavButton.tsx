/// <reference types="vite/client" />
import './Home.scss';

import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
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

  //Hover Animation
  const [isHovered, setIsHovered] = useState(false);
  const [fontSize, setFontSize] = useState('1em');
  const [fontWeight, setFontWeight] = useState('400');
  //Added fontSize to ensure the fontsize changes from Button hover and not Typography hover, as well as FontWeight

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    video.play();
    setFontSize('1.2em');
    setFontWeight('bold');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
    setFontSize('1em');
    setFontWeight('bold');

    setTimeout(() => {
      setFontWeight('400');
    }); //Resets the fontWeight onMouseLeave
  };

  //Click Animations
  const [color, setColor] = useState(theme.palette.text.primary);

  const handleClick = () => {
    setColor(theme.palette.text.secondary);

    setTimeout(() => {
      setColor(theme.palette.text.primary);
    }, 300); //Resets color after 300ms
  };

  return (
    <Transition in={handleMouseEnter} timeout={800} out={handleMouseLeave} delay={1000}>
      <Button
        id="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        sx={{
          position: 'relative',
          borderRadius: '.4em',
          height: '8em',
          marginTop: '1em',
          marginLeft: '1em',
          display: 'flex',
        }}
      >
        <video loop muted className="menu-video" id={videoSource}>
          <source src={videoSource} type="video/webm" />
        </video>
        <Typography
          id="button-title"
          variant="body1"
          alignSelf="flex-end"
          marginLeft="auto"
          marginTop="auto"
          padding=".5em"
          sx={{
            fontWeight: fontWeight,
            color: color,
            fontSize: fontSize,
            transition: '250ms ease-in-out',
          }}
        >
          {title}
        </Typography>
      </Button>
    </Transition>
  );
};
