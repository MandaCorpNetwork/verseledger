import './Home.scss';

import { useTheme } from '@emotion/react';
import { alpha, Box, Typography } from '@mui/material';
import React from 'react';
import { Transition } from 'react-transition-group';

import FreelancerLoop from '../Assets/media/MenuPage/FreelancerLoop.webm';
import JobsLoop from '../Assets/media/MenuPage/JobsLoop.webm';
import MarketLoop from '../Assets/media/MenuPage/MarketLoop.webm';
import OrgLoop from '../Assets/media/MenuPage/OrgLoop.webm';
import { Home } from './Home';

type HomeNavButtonProps = {
  title: string;
  to: string;
};

const videoSource = (to: string) => {
  if (to === '/ledger/contract') {
    return 'JobsLoop';
  } else if (to === '/ledger/versemarket') {
    return 'MarketLoop';
  } else if (to === '/ledger/personal') {
    return 'FreelancerLoop';
  } else if (to === '/ledger/org') {
    return 'OrgLoop';
  }
  return '';
};

export const HomeNavButton: React.FC<HomeNavButtonProps> = (props) => {
  // eslint-disable-next-line
  const theme = useTheme() as any;

  return (
    <Box
      width={'15em'}
      height={'5em'}
      marginTop="1em"
      sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.5) }}
      display="flex"
    >
      <video autoPlay loop muted id="menu-video">
        <source
          src={(to => {
            if (to === '/ledger/contract') return 'JobsLoop';
            else if (to === '/ledger/versemarket') return 'MarketLoop';
            else if (to === '/ledger/personal') return 'FreelancerLoop';
            else if (to === '/ledger/org') return 'OrgLoop';
            return '';
          })(props.to)}
          type="video/webm"
        />
      </video>
      <Typography
        variant="body1"
        alignSelf="flex-end"
        marginLeft="5em"
        marginBottom="1em"
      >
        {props.title}
      </Typography>
    </Box>
  );
};
