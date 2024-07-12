//ContractManagerApp.tsx
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { selectContractsArray } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { fetchContractBidsOfUser } from '@Redux/Slices/Users/Actions/fetchContractBidsByUser';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { ContractorInfo } from './ContractDisplay/ContractorInfo';
import { SelectedContractManager } from './ContractDisplay/SelectedContractManager';
import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
//import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
import { ContractManagerSearchTools } from './ContractList/ContractManagerSearchTools';

export const ContractManagerApp: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilter, overwriteURLQuery] = useURLQuery();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();

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

  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.id;

  const handleContractSelect = React.useCallback(
    (id: string | null) => {
      setSelectedId(id);
    },
    [setSelectedId],
  );

  React.useEffect(() => {
    // Status Filter Initialization
    // Subtype Filter Initialization
    // Params Serializer
    let contractParams: IContractSearch = {
      page: 0,
      limit: 25,
    };
    let bidParams: IUserBidSearch = {
      page: 0,
      limit: 25,
    };
    switch (currentTab) {
      case 'employed':
        bidParams = {
          ...bidParams,
          status: ['ACCEPTED'],
        };
        dispatch(fetchContractBidsOfUser(bidParams)).then((action) => {
          const bids = action.payload?.data;
          if (bids) {
            const contractIds = bids.map((bid: IContractBid) => bid.contract_id);
            console.log('contractIds', contractIds);
            contractParams = {
              ...contractParams,
              status: ['BIDDING', 'INPROGRESS'],
              contractId: contractIds,
            };
            dispatch(fetchContracts(contractParams));
          }
        });
        break;
      case 'owned':
        contractParams = {
          ...contractParams,
          status: ['BIDDING', 'INPROGRESS'],
          ...(userId && { ownerId: [userId] }),
        };
        dispatch(fetchContracts(contractParams));
        break;
      case 'pending':
        bidParams = {
          ...bidParams,
          status: ['PENDING'],
        };
        dispatch(fetchContractBidsOfUser(bidParams)).then((action) => {
          const bids = action.payload?.data;
          if (bids) {
            const contractIds = bids.map((bid: IContractBid) => bid.contract_id);
            contractParams = {
              ...contractParams,
              status: ['BIDDING', 'INPROGRESS'],
              contractId: contractIds,
            };
            dispatch(fetchContracts(contractParams));
          }
        });
        break;
      case 'offers':
        bidParams = {
          ...bidParams,
          status: ['INVITED'],
        };
        dispatch(fetchContractBidsOfUser(bidParams)).then((action) => {
          const bids = action.payload?.data;
          if (bids) {
            const contractIds = bids.map((bid: IContractBid) => bid.contract_id);
            contractParams = {
              ...contractParams,
              status: ['BIDDING', 'INPROGRESS'],
              contractId: contractIds,
            };
            dispatch(fetchContracts(contractParams));
          }
        });
        break;
      case 'closed':
        contractParams = {
          ...contractParams,
          status: ['COMPLETED'],
          ...(userId && { ownerId: [userId] }),
        };
        dispatch(fetchContracts(contractParams));
        break;
      default:
        break;
    }
  }, [filters]);

  const contracts = useAppSelector((state) => selectContractsArray(state));

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
            <ContractManagerContractList
              contracts={contracts}
              setSelectedId={handleContractSelect}
              selectedId={selectedId}
            />
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
        {selectedId ? <SelectedContractManager /> : <ContractorInfo />}
      </Box>
    </Box>
  );
};
