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
          width: '30%',
          flexDirection: 'column',
        }}
      >
        <TabContext value={browserView}>
          <Box
            data-id="ContractBrowserTabs"
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
              orientation="horizontal"
              onChange={handleBrowserChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab label="Accepted" value="employed" />
              <Tab label="Pending" value="pending" />
              <Tab label="Offers" value="offers" />
              <Tab label="Owned" value="owned" />
              <Tab label="History" value="closed" />
            </TabList>
          </Box>
          <Box
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
              sx={{ width: '100%', display: 'flex', flexDirection: 'row', mt: '.5em' }}
            >
              <Collapse
                in={searchToolsOpen}
                timeout={200}
                sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1em',
                    flexGrow: 1,
                  }}
                >
                  <IconButton sx={{ mr: 'auto' }}>
                    <FilterAlt />
                  </IconButton>
                  <Select size="small" />
                  <TextField size="small" />
                </Box>
              </Collapse>
              <Box sx={{ display: 'flex', ml: 'auto' }}>
                <IconButton
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
