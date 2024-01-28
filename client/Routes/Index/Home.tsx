import React from 'react';
import { Box } from '@mui/material';
import { HomeNavButton } from './HomeNavButton';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

export const Home: React.FC<unknown> = () => {

  /*const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(true);
  const [showThird, setShowThird] = useState(true);
  const [showFourth, setShowFourth] = useState(true);

  const toggle = () => {
    setShowFirst(prev => !prev);
    setTimeout(() => {
      setShowSecond(prev => !prev);
      setShowThird(prev => !prev);
      setShowFourth(prev => !prev);
    }, 500); //wait 500ms
  };*/

  const [isTransitioning, setIsTransitioning] = useState(false);
  const toggle = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 5000);
  };

  return (
    <Box marginTop={'5em'} onMouseEnter={toggle} onMouseLeave={toggle}>
      <TransitionGroup>
        <HomeNavButton title="Contract Ledger" to="/ledger/contract" />
        <HomeNavButton title="Verse Market" to="/ledger/versemarket" />
        <HomeNavButton title="Personal Ledger" to="/ledger/personal" />
        <HomeNavButton title="Org Ledger" to="/ledger/org" />
      </TransitionGroup>
    </Box>
  );
};
