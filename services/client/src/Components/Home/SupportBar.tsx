import MadeByCommunity from '@Assets/media/MenuPage/MadeByTheCommunity.png';
import Pally from '@Assets/media/MenuPage/Pally.png?url';
import { useSoundEffect } from '@Audio/AudioManager';
import { Discord, KoFi, Patreon } from '@CommonLegacy/Definitions/CustomIcons';
import { ButtonBase, IconButton } from '@mui/material';
import React from 'react';

export const SupportBar: React.FC = () => {
  const sound = useSoundEffect();
  return (
    <div className="Support-Bar">
      <IconButton
        component="a"
        href="https://ko-fi.com/verseledger"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playSound('navigate')}
        className="Icon-Button"
      >
        <KoFi fontSize="large" className="Support-Icon" />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.patreon.com/otterlodgestudios"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playSound('navigate')}
        className="Icon-Button"
      >
        <Patreon fontSize="large" className="Support-Icon" />
      </IconButton>
      <ButtonBase
        component="a"
        href="https://pally.gg/p/verseledger"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundImage: `url(${Pally})`,
          borderRadius: '10px',
        }}
        className="Pally-Button"
        onClick={() => sound.playSound('navigate')}
      />
      <IconButton
        component="a"
        href="https://www.discord.gg/pVEK5rZ9WW"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playSound('navigate')}
        className="Icon-Button"
      >
        <Discord fontSize="large" className="Support-Icon" />
      </IconButton>
      <IconButton
        component="a"
        href="https://robertsspaceindustries.com/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playSound('navigate')}
        className="Icon-Button"
      >
        <img
          src={MadeByCommunity}
          alt="Made by the Community"
          width="40px"
          height="40px"
          className="Support-Icon"
        />
      </IconButton>
    </div>
  );
};
