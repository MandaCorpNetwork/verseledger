import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';
import { AppToolBar } from '@/Components/Personal/AppToolBar';

const prefix = '/dashboard';

export const DashboardPage: React.FC<unknown> = () => {
  const { playSound } = useSoundEffect();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocation = React.useMemo(() => {
    switch (location.pathname) {
      case `${prefix}/contracts`:
        return 'Contracts';
      case `${prefix}/explore`:
        return 'Explore';
      case `${prefix}/routes`:
        return 'Routes';
      case `${prefix}/inventory`:
        return 'Inventory';
      case `${prefix}/tuning`:
        return 'Tuning';
      case `${prefix}/overview`:
      default:
        return 'Overview';
    }
  }, [location.pathname]);
  Logger.info('Selected App', currentLocation);

  const handleAppChange = React.useCallback(
    (iconKey: string) => {
      if (currentLocation === iconKey) {
        playSound('denied');
        return;
      }
      playSound('navigate');
      switch (iconKey) {
        case 'Contracts':
          navigate(`${prefix}/contracts`);
          break;
        case 'Explore':
          navigate(`${prefix}/explore`);
          break;
        case 'Routes':
          navigate(`${prefix}/routes`);
          break;
        case 'Inventory':
          navigate(`${prefix}/inventory`);
          break;
        case 'Tuning':
          navigate(`${prefix}/tuning`);
          break;
        case 'Overview':
        default:
          navigate(`${prefix}/overview`);
          break;
      }
    },
    [currentLocation, navigate, playSound],
  );
  return (
    <VLViewport
      data-testid="PersonalLedgerPage"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: '1em',
        '&:after': {
          backgroundImage: `url(https://files.otakustudy.com/wp-content/uploads/2020/07/18150855/SC-Aeroview-Hangar-01.jpg)`,
        },
      }}
    >
      <Box
        data-testid="ToolDisplay"
        sx={{
          width: '100%',
          height: '90%',
          margin: { xs: '0', md: '1%' },
          padding: { xs: '0', md: '.5em' },
          overflowY: { xs: 'auto', md: 'hidden' },
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(0,73,130)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
        }}
      >
        <Outlet />
      </Box>
      <Box sx={{ mt: 'auto', mb: '1%' }}>
        <AppToolBar selectedApp={currentLocation} setSelectedApp={handleAppChange} />
      </Box>
    </VLViewport>
  );
};
