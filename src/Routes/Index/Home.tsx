/// <reference types="vite/client" />
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

import FreelancerLoop from '../../Assets/media/MenuPage/FreelancerLoop.webm?url';
import JobsLoop from '../../Assets/media/MenuPage/JobsLoop.webm?url';
import MarketLoop from '../../Assets/media/MenuPage/MarketLoop.webm?url';
import OrgLoop from '../../Assets/media/MenuPage/OrgLoop.webm?url';
import { HomeNavButton } from './HomeNavButton';

export const Home: React.FC<unknown> = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    console.log('Hover Start');
    setIsHovered(true);
    console.log(setIsHovered);
    console.log(isHovered);
  };

  const handleMouseExit = () => {
    console.log('Hover End');
    setIsHovered(false);
    console.log(setIsHovered);
    console.log(isHovered);
  };
  return (
    <Transition
      in={isHovered}
      timeout={1000}
      onEnter={handleMouseEnter}
      onExit={handleMouseExit}
    >
      <Box marginTop={'3em'}>
        <HomeNavButton
          title="Contract Ledger"
          to="/ledger/contract"
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          videoSource={JobsLoop}
        />
        <HomeNavButton
          title="Verse Market"
          to="/ledger/versemarket"
          videoSource={MarketLoop}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <HomeNavButton
          title="Personal Ledger"
          to="/ledger/personal"
          videoSource={FreelancerLoop}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <HomeNavButton
          title="Org Ledger"
          to="/ledger/org"
          videoSource={OrgLoop}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Box>
    </Transition>
  );
};
