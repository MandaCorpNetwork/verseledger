import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';

import { ContractTableTools } from '@/Components/Contracts/Ledger/Filters/ContractTableTools';
import { ContractsViewer } from '@/Components/Contracts/Ledger/List/ContractsViewer';

import { ContractManager } from './ContractManager';

export const ContractsApp: React.FC<unknown> = () => {
  const [browserView, setBrowserView] = React.useState<string>('employed');

  const handleBrowserChange = (event: React.SyntheticEvent, newValue: string) => {
    setBrowserView(newValue);
  };

  return (
    <Box
      data-id="ContractsApp"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        padding: '1em',
      }}
    >
      <Box
        data-id="ContractBrowserContainer"
        sx={{
          display: 'flex',
          height: '100%',
          width: '50%',
          border: '3px solid',
          borderColor: 'primary.dark',
        }}
      >
        <TabContext value={browserView}>
          <Box data-id="ContractBrowserTabs">
            <TabList orientation="vertical" onChange={handleBrowserChange}>
              <Tab label="Employed Contracts" value="employed" />
              <Tab label="Owned Contracts" value="owned" />
              <Tab label="Contract History" value="closed" />
            </TabList>
          </Box>
          <Box data-id="ContractBrowserContent">
            <ContractTableTools title="Contract Browser" titleSize="h6" />
            <ContractsViewer />
          </Box>
        </TabContext>
      </Box>
      <Box
        data-id="ContractManagerContainer"
        sx={{
          display: 'flex',
          height: '100%',
          width: '50%',
          border: '3px solid',
          borderColor: 'primary.dark',
          padding: '.5em',
        }}
      >
        <ContractManager />
      </Box>
    </Box>
  );
};
