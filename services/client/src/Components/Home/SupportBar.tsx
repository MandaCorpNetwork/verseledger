import MadeByCommunity from '@Assets/media/MenuPage/MadeByTheCommunity.png';
import Pally from '@Assets/media/MenuPage/Pally.png?url';
import { useSoundEffect } from '@Audio/AudioManager';
import { Discord, KoFi, Patreon } from '@Common/Definitions/CustomIcons';
import { Box, ButtonBase, IconButton } from '@mui/material';
import React from 'react';

export const SupportBar: React.FC = () => {
  const { playSound } = useSoundEffect();
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'primary.dark',
        borderRadius: '20px',
        px: '.5em',
      }}
    >
      <IconButton
        component="a"
        href="https://ko-fi.com/verseledger"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playSound('navigate')}
      >
        <KoFi fontSize="large" />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.patreon.com/otterlodgestudios"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playSound('navigate')}
      >
        <Patreon fontSize="large" />
      </IconButton>
      <ButtonBase
        component="a"
        href="https://pally.gg/p/verseledger"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundImage: `url(${Pally})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100px',
          height: '50px',
          my: 'auto',
          borderRadius: '10px',
          backgroundColor: 'primary.main',
          boxShadow: '0 4px 8px rgba(0,0,0,.3)',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            backgroundColor: 'primary.dark',
            boxShadow: '0 6px 12px rgba(0,0,0,.4)',
            transform: 'scale(1.05)',
          },
          '&:active': {
            backgroundColor: 'primary.dark',
            boxShadow: '0 2px 4px rgba(0,0,0,.3)',
            transform: 'translateY(4px)',
          },
        }}
        onClick={() => playSound('navigate')}
      />
      <IconButton
        component="a"
        href="https://www.discord.gg/pVEK5rZ9WW"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playSound('navigate')}
      >
        <Discord fontSize="large" />
      </IconButton>
      <IconButton
        component="a"
        href="https://robertsspaceindustries.com/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playSound('navigate')}
      >
        <img
          src={MadeByCommunity}
          alt="Made by the Community"
          width="40px"
          height="40px"
        />
      </IconButton>
    </Box>
  );
};
