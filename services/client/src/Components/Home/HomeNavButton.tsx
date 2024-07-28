/// <reference types="vite/client" />
import '@/Routes/Index/Home/Home.scss';

import { UnderConstruction } from '@Common/Components/App/UnderContruction';
import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import { useSound } from '@Utils/Hooks/useSound';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';

type HomeNavButtonProps = {
  title: string;
  to?: string;
  videoSource: string;
  inDev?: boolean;
};

export const HomeNavButton: React.FC<HomeNavButtonProps> = ({
  title,
  videoSource,
  to,
  inDev,
}) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  const playSound = useSound();

  //Hover Animation
  const [, setIsHovered] = useState(false);
  const [fontSize, setFontSize] = useState('1em');
  const [fontWeight, setFontWeight] = useState('600');
  //Added fontSize to ensure the fontsize changes from Button hover and not Typography hover, as well as FontWeight
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    setFontSize('1.2em');
    setFontWeight('700');
    const isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;
    if (!isPlaying) {
      video.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = document.getElementById(videoSource) as HTMLVideoElement;
    setFontSize('1em');
    setFontWeight('600');
    const isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;
    if (isPlaying) {
      video.pause();
      video.currentTime = 0;
    }
  };

  //Click Animations
  const [color, setColor] = useState(theme.palette.text.primary);
  const navigate = useNavigate();

  const handleClick = () => {
    setColor(theme.palette.text.secondary);
    if (inDev) {
      playSound('denied');
      setDialogOpen(true);
    }
    if (to) {
      playSound('navigate');
      navigate(to);
    } else {
      console.error('Navigation target undefined');
    }
    setTimeout(() => {
      setColor(theme.palette.text.primary);
    }, 300); //Resets color after 300ms
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Transition timeout={800} delay={1000}>
        <Button
          id="button"
          data-testid={`HomeNavButton__${to}`}
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
      <UnderConstruction isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </>
  );
};
