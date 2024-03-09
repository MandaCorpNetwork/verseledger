import { Box } from '@mui/material';
import React from 'react';

import { AppToolBar } from '@/Components/Personal/AppToolBar';
import { ContractsApp } from '@/Components/Personal/Contracts/ContractsApp';
import { OverviewApp } from '@/Components/Personal/Overview/OverviewApp';

export const PersonalLedgerPage: React.FC<unknown> = () => {
  const [selectedApp, setSelectedApp] = React.useState<string>('Contracts');

  const appRenderer = () => {
    switch (selectedApp) {
      case 'Overview':
        return <OverviewApp />;
      case 'Contracts':
        return <ContractsApp />;
      default:
        return <ContractsApp />;
    }
  };
  return (
    <Box
      data-id="PersonalLedgerPage"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        width: '100%',
        padding: '1em',
      }}
    >
      <Box
        data-id="ToolDisplay"
        sx={{
          width: '100%',
          height: '90%',
          margin: '1%',
          padding: '.5em',
          border: '3px solid',
          borderColor: 'primary.main',
        }}
      >
        {appRenderer()}
      </Box>
      <Box sx={{ mt: 'auto', mb: '1%' }}>
        <AppToolBar selectedApp={selectedApp} setSelectedApp={setSelectedApp} />
      </Box>
    </Box>
  );
};

/* Needed
  AppBar
  Overview Page
  Contracts Manager
  Fleet Manager
  Ship Manager
*/
