/// <reference types="vite/client" />
import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { Discord, KoFi, Patreon } from '@Common/Definitions/CustomIcons';
import { Box, ButtonBase, IconButton } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

import FreelancerLoop from '@/Assets/media/MenuPage/FreelancerLoop.webm?url';
import JobsLoop from '@/Assets/media/MenuPage/JobsLoop.webm?url';
import MadeByCommunity from '@/Assets/media/MenuPage/MadeByTheCommunity.png';
import MarketLoop from '@/Assets/media/MenuPage/MarketLoop.webm?url';
import OrgLoop from '@/Assets/media/MenuPage/OrgLoop.webm?url';
import Pally from '@/Assets/media/MenuPage/Pally.png?url';
import VerseNews from '@/Assets/media/MenuPage/VerseNews.webm?url';
import { useSoundEffect } from '@/AudioManager';
import { HomeNavButtonMobile } from '@/Components/Home/HomeNavButtonMobile';

import { HomeNavButton } from '../../../Components/Home/HomeNavButton';

export const Home: React.FC<unknown> = () => {
  const mobile = useIsMobile();
  const { playSound } = useSoundEffect();
  return (
    <Box marginTop={{ xs: '1em', s: '3em' }}>
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo}></source>
      </video>
      {mobile ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            gap: '2em',
            mt: '4em',
            ml: '.5em',
          }}
        >
          <HomeNavButtonMobile title="Contract Ledger" to="/ledger/contracts" />
          <HomeNavButtonMobile title="Verse Market" to="/verse-market" />
          <HomeNavButtonMobile title="Personal Ledger" to="/dashboard" />
          <HomeNavButtonMobile title="Org Ledger" to="/orgs" />
          <HomeNavButtonMobile title="Verse News" to="/verse-news" />
        </Box>
      ) : (
        <>
          <HomeNavButton
            title="Contract Ledger"
            to="/ledger/contracts"
            videoSource={JobsLoop}
          />
          <HomeNavButton
            title="Verse Market"
            videoSource={MarketLoop}
            to="/verse-market"
          />
          <HomeNavButton
            title="Personal Ledger"
            to="/dashboard"
            videoSource={FreelancerLoop}
          />
          <HomeNavButton title="Org Ledger" videoSource={OrgLoop} to="/orgs" />
          <HomeNavButton title="Verse News" videoSource={VerseNews} to="/verse-news" />
        </>
      )}

      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
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
      </Box>
    </Box>
  );
};
