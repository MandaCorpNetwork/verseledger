import { ArrowBackIosNew, FilterAlt } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Box, Collapse, IconButton, Select, Tab, TextField } from '@mui/material';
import React from 'react';

import { ContractManager } from './ContractManager';

export const ContractsApp: React.FC<unknown> = () => {
  const [browserView, setBrowserView] = React.useState<string>('employed');
  const [searchToolsOpen, setSearchToolsOpen] = React.useState<boolean>(false);

  const handleBrowserChange = (_event: React.SyntheticEvent, newValue: string) => {
    setBrowserView(newValue);
  };

  const toggleSearchTools = () => {
    setSearchToolsOpen(!searchToolsOpen);
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
        data-testid="ContractManager__ContractListContainer"
        sx={{
          display: 'flex',
          height: '100%',
          width: '30%',
          flexDirection: 'column',
        }}
      >
        <TabContext value={browserView}>
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
            data-testid="ContractManager__ContractListContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              flexGrow: 1,
            }}
          >
            <Box
              data-testid="ContractManager-ContractList__SearchToolsContainer"
              sx={{ width: '100%', display: 'flex', flexDirection: 'row', mt: '.5em' }}
            >
              <Collapse
                data-testid="ContractManager-ContractList-SearchTools__TransformationWrapper"
                in={searchToolsOpen}
                timeout={200}
                sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  data-testid="ContractManager-ContractList-SearchTools__SearchToolsWrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1em',
                    flexGrow: 1,
                  }}
                >
                  <IconButton
                    data-testid="ContractManager-ContractList-SearchTools__FiltersButton"
                    sx={{ mr: 'auto' }}
                  >
                    <FilterAlt />
                  </IconButton>
                  <Select
                    data-testid="ContractManager-ContractList-SearchTools__SortBySelect"
                    size="small"
                  />
                  <TextField
                    data-testid="ContractManager-ContractList-SearchTools__SearchContractsField"
                    size="small"
                  />
                </Box>
              </Collapse>
              <Box
                data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionWrapper"
                sx={{ display: 'flex', ml: 'auto' }}
              >
                <IconButton
                  data-testid="ContractManager-ContractList-SearchTools__SearchToolsExpansionButton"
                  onClick={toggleSearchTools}
                  sx={{
                    transform: !searchToolsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms',
                  }}
                >
                  <ArrowBackIosNew fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </TabContext>
      </Box>
      <Box
        data-testid="ContractManagerContainer"
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

// Placeholder Hardcoded Contract Data for styling search

const tempContractData = [
  {
    id: 1,
    title: 'Contract Title',
    pay: 10000,
  },
  {
    id: 2,
    title: 'Contract Title',
    pay: 10000,
  },
  {
    id: 3,
    title: 'Contract Title',
    pay: 10000,
  },
  {
    id: 4,
    title: 'Contract Title',
    pay: 10000,
  },
];
