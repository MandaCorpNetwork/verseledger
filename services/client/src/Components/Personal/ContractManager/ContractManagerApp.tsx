//ContractManagerApp.tsx
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectFilteredContracts } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { SelectedContractManager } from './ContractDisplay/SelectedContractManager';
import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
//import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
import { ContractManagerSearchTools } from './ContractList/ContractManagerSearchTools';

export const ContractManagerApp: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilter, overwriteURLQuery] = useURLQuery();

  const filteredContracts = useAppSelector((state) =>
    selectFilteredContracts(state, filters),
  );

  const currentTab = React.useMemo(() => {
    const tab = filters.get(QueryNames.ContractManagerTab);
    if (!tab) {
      setFilter(QueryNames.ContractManagerTab, 'employed');
      return 'employed';
    }
    return tab;
  }, [filters, setFilter]);

  const handleBrowserChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      overwriteURLQuery({ [QueryNames.ContractManagerTab]: newValue });
    },
    [overwriteURLQuery],
  );

  // React.useEffect(() => {
  //   // Contract Manager Tab Initialization
  //   // Status Filter Initialization
  //   if (!currentTab) {
  //     return null;
  //   }
  //   if (currentTab === 'owned' | 'closed') {
  //     if (currentTab === 'owned') {
  //       //Check Open Owned
  //     }
  //     if (currentTab === 'closed') {
  //       //Check History
  //     }
  //   }
  //   if (currentTab === 'employed') {
  //     // filteredContracts = filteredContracts.concat(
  //     //   contractsArray.filter((contract) => contract.ContractOwner == null),
  //     // );
  //   }
  // }, [filters]);

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
        <TabContext value={currentTab}>
          <Box
            data-testid="ContractManager__ContractListWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              borderColor: 'secondary.main',
              height: '100%',
              background: 'rgba(0,30,100,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box
              data-testid="ContractManager__TabContainer"
              sx={{
                my: '1em',
                px: '.8em',
                py: '.2em',
                borderLeft: '2px solid',
                borderRight: '2px solid',
                borderRadius: '10px',
                borderColor: 'secondary.main',
                alignSelf: 'center',
                boxShadow: '0 0px 10px 5px rgba(24,252,252,0.25)',
                backgroundImage:
                  'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                  backgroundSize: '5px 5px',
                  opacity: 0.5,
                },
                '&:hover': {
                  backgroundImage:
                    'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
                  borderColor: 'secondary.light',
                  boxShadow: '0 0 10px 5px rgba(14,49,252,.4)',
                },
                transition: 'all 0.3s',
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
                <Tab data-testid="ContractManger__OwnedTab" label="Owned" value="owned" />
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
                <Tab
                  data-testid="ContractManager__HistoryTab"
                  label="History"
                  value="closed"
                />
              </TabList>
            </Box>
            <ContractManagerSearchTools />
            <ContractManagerContractList contracts={filteredContracts} />
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
          background: 'rgba(0,30,100,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <SelectedContractManager />
      </Box>
    </Box>
  );
};
