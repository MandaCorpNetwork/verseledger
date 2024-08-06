import { Box } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BackdropLogo from '@/Assets/media/VerseLogos/LogoBackdrop.png?url';
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
    <Box
      data-testid="PersonalLedgerPage"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        width: '100%',
        padding: '1em',
        overflow: 'hidden',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          backgroundImage: `url(${BackdropLogo})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -5,
          opacity: 0.5,
        },
      }}
    >
      <Box
        data-testid="ToolDisplay"
        sx={{
          width: '100%',
          height: '90%',
          margin: '1%',
          padding: '.5em',
        }}
      >
        <Outlet />
      </Box>
      <Box sx={{ mt: 'auto', mb: '1%' }}>
        <AppToolBar selectedApp={currentLocation} setSelectedApp={handleAppChange} />
      </Box>
    </Box>
  );
};
