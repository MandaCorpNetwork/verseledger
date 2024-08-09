import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';
import { AppToolBar } from '@/Components/Personal/AppToolBar';

const prefix = '/ledger/personal';

export const PersonalLedgerPage: React.FC<unknown> = () => {
  const { playSound } = useSoundEffect();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocation = React.useMemo(() => {
    switch (location.pathname) {
      case `${prefix}/overview`:
        return 'Overview';
      case `${prefix}/contracts`:
        return 'Contracts';
      case `${prefix}/explore`:
        return 'Explore';
      default:
        return 'Overview';
    }
  }, [location.pathname]);

  const handleAppChange = React.useCallback(
    (iconKey: string) => {
      if (currentLocation === iconKey) {
        playSound('denied');
        return;
      }
      playSound('navigate');
      switch (iconKey) {
        case 'Overview':
          navigate(`${prefix}/overview`);
          break;
        case 'Contracts':
          navigate(`${prefix}/contracts`);
          break;
        case 'Explore':
          navigate(`${prefix}/explore`);
          break;
        default:
          navigate(`${prefix}/overview`);
          break;
      }
    },
    [currentLocation, navigate],
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
