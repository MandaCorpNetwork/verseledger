//ContractManagerApp.tsx
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';

import { QueryNames } from '@/Common/Definitions/QueryNames';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { SelectedContractManager } from './ContractDisplay/SelectedContractManager';
import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
import { ContractManagerSearchTools } from './ContractList/ContractManagerSearchTools';

export const ContractManagerApp: React.FC<unknown> = () => {
  const [filters, , overwriteURLQuery] = useURLQuery();

  const handleBrowserChange = (_event: React.SyntheticEvent, newValue: string) => {
    overwriteURLQuery({ [QueryNames.ContractManagerTab]: newValue });
  };

  return (
    <Box
      data-testid="ContractsManager__AppContainer"
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
        data-testid="ContractManager__ContractBrowserContainer"
        sx={{
          display: 'flex',
          height: '100%',
          width: '30%',
          flexDirection: 'column',
        }}
      >
        <TabContext value={filters.get(QueryNames.ContractManagerTab) ?? 'employed'}>
          <Box
            data-testid="ContractManager__TabContainer"
            sx={{
              mb: '1em',
              pt: '.2em',
              pl: '.8em',
              pr: '.8em',
              pb: '.2em',
              borderLeft: '2px solid',
              borderRight: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              alignSelf: 'center',
              height: '10%',
            }}
          >
            <TabList
              data-testid="ContractManager__TabList"
              orientation="horizontal"
              onChange={handleBrowserChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab
                data-testid="ContractManager__AcceptedTab"
                label="Accepted"
                value="employed"
              />
              <Tab
                data-testid="ContractManager__PendingTab"
                label="Pending"
                value="pending"
              />
              <Tab
                data-testid="ContractManager__OffersTab"
                label="Offers"
                value="offers"
              />
              <Tab data-testid="ContractManger__OwnedTab" label="Owned" value="owned" />
              <Tab
                data-testid="ContractManager__HistoryTab"
                label="History"
                value="closed"
              />
            </TabList>
          </Box>
          <Box
            data-testid="ContractManager__ContractListWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              height: '90%',
            }}
          >
            <ContractManagerSearchTools />
            <ContractManagerContractList />
          </Box>
        </TabContext>
      </Box>
      <Box
        data-testid="ContractManagerContainer"
        sx={{
          display: 'flex',
          height: '100%',
          width: '65%',
          borderTop: '3px solid',
          borderBottom: '3px solid',
          borderColor: 'secondary.main',
          borderRadius: '10px',
          padding: '.5em',
        }}
      >
        <SelectedContractManager />
      </Box>
    </Box>
  );
};
