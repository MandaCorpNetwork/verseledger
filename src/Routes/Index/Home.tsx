import { Box } from '@mui/material';
import React from 'react';

import FreelancerLoop from '../Assets/media/MenuPage/FreelancerLoop.webm';
import JobsLoop from '../Assets/media/MenuPage/JobsLoop.webm';
import MarketLoop from '../Assets/media/MenuPage/MarketLoop.webm';
import OrgLoop from '../Assets/media/MenuPage/OrgLoop.webm';
import { HomeNavButton } from './HomeNavButton';


export const Home: React.FC<unknown> = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <Box marginTop={'3em'}>
      <HomeNavButton
        title="Contract Ledger"
        to="/ledger/contract"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <HomeNavButton
        title="Verse Market"
        to="/ledger/versemarket"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <HomeNavButton
        title="Personal Ledger"
        to="/ledger/personal"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <HomeNavButton
        title="Org Ledger"
        to="/ledger/org"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Box>
  );
};
