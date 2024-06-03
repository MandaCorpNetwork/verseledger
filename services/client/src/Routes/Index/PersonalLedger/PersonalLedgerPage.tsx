import { Box } from '@mui/material';
import React from 'react';

import { AppToolBar } from '@/Components/Personal/AppToolBar';
import { ContractManagerApp } from '@/Components/Personal/ContractManager/ContractManagerApp';
import { ExploreApp } from '@/Components/Personal/Explore/ExploreApp';
import { OverviewApp } from '@/Components/Personal/Overview/OverviewApp';

export const PersonalLedgerPage: React.FC<unknown> = () => {
  const [selectedApp, setSelectedApp] = React.useState<string>('Refining');

  const appRenderer = () => {
    switch (selectedApp) {
      case 'Overview':
        return <OverviewApp />;
      case 'Contracts':
        return <ContractManagerApp />;
      case 'Explore':
        return <ExploreApp />;
      default:
        return <ContractManagerApp />;
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
