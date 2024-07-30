import { Box } from '@mui/material';
import { useSound } from '@Utils/howlerController';
import React from 'react';

import BackdropLogo from '@/Assets/media/VerseLogos/LogoBackdrop.png?url';
import { AppToolBar } from '@/Components/Personal/AppToolBar';
import { ContractManagerApp } from '@/Components/Personal/ContractManager/ContractManagerApp';
import { ExploreApp } from '@/Components/Personal/Explore/ExploreApp';
import { OverviewApp } from '@/Components/Personal/Overview/OverviewApp';

export const PersonalLedgerPage: React.FC<unknown> = () => {
  const { playSound } = useSound();
  const [selectedApp, setSelectedApp] = React.useState<string>('Overview');

  const appRenderer = React.useCallback(() => {
    switch (selectedApp) {
      case 'Overview':
        return <OverviewApp />;
      case 'Contracts':
        return <ContractManagerApp />;
      case 'Explore':
        return <ExploreApp />;
      default:
        return <OverviewApp />;
    }
  }, [selectedApp]);

  const handleAppChange = React.useCallback(
    (iconKey: string) => {
      if (selectedApp === iconKey) {
        playSound('denied');
        return;
      }
      playSound('navigate');
      setSelectedApp(iconKey);
    },
    [selectedApp, setSelectedApp],
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
        {appRenderer()}
      </Box>
      <Box sx={{ mt: 'auto', mb: '1%' }}>
        <AppToolBar selectedApp={selectedApp} setSelectedApp={handleAppChange} />
      </Box>
    </Box>
  );
};
