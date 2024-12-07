/// <reference types="vite/client" />
import '@Routes/Index/Home/Home.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { UnderConstruction } from '@CommonLegacy/Components/App/UnderContruction';
import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';

type HomeNavButtonProps = {
  title: string;
  to: string;
  videoSource: string;
  inDev?: boolean;
  wip?: boolean;
};

export const HomeNavButton: React.FC<HomeNavButtonProps> = ({
  title,
  videoSource,
  to,
  inDev,
  wip,
}) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  const sound = useSoundEffect();

  //Hover Animation
  const [, setIsHovered] = useState(false);
  //Added fontSize to ensure the fontsize changes from Button hover and not Typography hover, as well as FontWeight
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setColor(theme.palette.text.secondary);
    sound.playSound('hover');
    const video = document.getElementById(videoSource) as HTMLVideoElement;
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
    setColor(theme.palette.text.primary);
    const video = document.getElementById(videoSource) as HTMLVideoElement;
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
    if (wip) {
      if (inDev) {
        sound.playSound('navigate');
        navigate(to);
      } else {
        sound.playSound('denied');
        setDialogOpen(true);
      }
    } else {
      sound.playSound('navigate');
      navigate(to);
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
            borderRadius: '5px',
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
            variant="h6"
            alignSelf="flex-end"
            marginLeft="auto"
            marginTop="auto"
            sx={{
              color: color,
              transition: '250ms ease-in-out',
              textShadow: '2px 4px 10px rgb(0,0,0)',
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
