//ContractManagerApp.tsx
import ControlPanelBox from '@Common/Components/Boxes/ControlPanelBox';
import FirstLayerGlassBox from '@Common/Components/Boxes/FirstLayerGlassBox';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { selectBidPagination } from '@Redux/Slices/Bids/bidsSelector';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import {
  selectContractPagination,
  selectContractsArray,
} from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { fetchContractBidsOfUser } from '@Redux/Slices/Users/Actions/fetchContractBidsByUser';
import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { ContractorInfo } from './ContractDisplay/tools/ContractorInfo';
import { SelectedContractManager } from './ContractDisplay/SelectedContractManager';
import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
//import { ContractManagerContractList } from './ContractList/ContractManagerContractList';
import { ContractManagerSearchTools } from './ContractList/ContractManagerSearchTools';

export const ContractManagerApp: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilter, overwriteURLQuery] = useURLQuery();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();

  const contractPagination = React.useCallback(
    () => useAppSelector(selectContractPagination),
    [page],
  );

  const contractCount = contractPagination();

  const bidPagination = React.useCallback(
    () => useAppSelector(selectBidPagination),
    [page],
  );

  const bidCount = bidPagination();

  const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

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
      setSelectedId(null);
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

  const handleFetchBids = React.useCallback(
    async (params: IUserBidSearch) => {
      const bidParams = {
        ...params,
      };
      try {
        const fetchBids = await dispatch(fetchContractBidsOfUser(bidParams));
        if (fetchContractBidsOfUser.fulfilled.match(fetchBids)) {
          const bids = fetchBids.payload.data;
          Logger.info('Attempting to parse fetched bids...');
          if (bids && Array.isArray(bids)) {
            const contractIds = bids.map((bid: IContractBid) => bid.contract_id);
            Logger.info(`Bids fetched succesfully:`, bids);
            Logger.info(`ContractIds fetched succesfully:`, contractIds);
            return contractIds;
          } else {
            Logger.error('No valid bids found in response:', fetchBids.payload);
            return [];
          }
        } else {
          Logger.error('Fetch Bids not Fufilled:');
          return [];
        }
      } catch (error) {
        Logger.error('Error fetching bids for client', error);
        return [];
      }
    },
    [dispatch, filters],
  );

  const handleFetchContracts = React.useCallback(
    (params: IContractSearch) => {
      const contractParams = {
        ...params,
      };
      dispatch(fetchContracts(contractParams));
    },
    [dispatch, filters],
  );

  React.useEffect(() => {
    // Status Filter Initialization
    // Subtype Filter Initialization
    // Params Serializer
    switch (currentTab) {
      case 'employed':
        {
          const bidParams: IUserBidSearch = {
            page: page - 1,
            limit: 25,
            status: ['ACCEPTED'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 25,
              status: ['BIDDING', 'INPROGRESS'],
              contractId: contractIds,
            };
            handleFetchContracts(contractParams);
          });
        }
        break;
      case 'owned':
        {
          const contractParams: IContractSearch = {
            page: page - 1,
            limit: 25,
            status: ['BIDDING', 'INPROGRESS'],
            ...(userId && { ownerId: [userId] }),
          };
          handleFetchContracts(contractParams);
        }
        break;
      case 'pending':
        {
          const bidParams: IUserBidSearch = {
            page: page - 1,
            limit: 25,
            status: ['PENDING'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 25,
              status: ['BIDDING', 'INPROGRESS'],
              contractId: contractIds,
            };
            handleFetchContracts(contractParams);
          });
        }
        break;
      case 'offers':
        {
          const bidParams: IUserBidSearch = {
            page: page - 1,
            limit: 25,
            status: ['INVITED'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 25,
              status: ['BIDDING', 'INPROGRESS'],
              contractId: contractIds,
            };
            handleFetchContracts(contractParams);
          });
        }
        break;
      case 'closed':
        {
          const contractParams: IContractSearch = {
            page: page - 1,
            limit: 25,
            status: ['COMPLETED'],
            ...(userId && { ownerId: [userId] }),
          };
          dispatch(fetchContracts(contractParams));
        }
        break;
      default:
        break;
    }
  }, [filters, page]);

  const contracts = useAppSelector((state) => selectContractsArray(state));

  React.useEffect(() => {
    if (selectedId && !contracts.some((contract) => contract.id === selectedId)) {
      setSelectedId(null);
    }
  }, [contracts, selectedId]);

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
          <FirstLayerGlassBox data-testid="ContractManager__ContractListWrapper">
            <ControlPanelBox
              data-testid="ContractManager__TabContainer"
              sx={{
                my: '1em',
                px: '.8em',
                py: '.2em',
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
                <Tab data-testid="ContractManger__OwnedTab" label="Owned" value="owned" />
                <Tab
                  data-testid="ContractManager__PendingTab"
                  label="Pending"
                  value="pending"
                />
                <Tab
                  data-testid="ContractManager__OffersTab"
                  label="Invites"
                  value="offers"
                />
                <Tab
                  data-testid="ContractManager__HistoryTab"
                  label="History"
                  value="closed"
                />
              </TabList>
            </ControlPanelBox>
            <ContractManagerSearchTools />
            <ContractManagerContractList
              contracts={contracts}
              setSelectedId={handleContractSelect}
              selectedId={selectedId}
              page={page}
              setPage={handleChangePage}
              pageCount={
                currentTab === 'employed' ||
                currentTab === 'pending' ||
                currentTab === 'offers'
                  ? bidCount.pages
                  : contractCount.pages
              }
            />
          </FirstLayerGlassBox>
        </TabContext>
      </Box>
      <FirstLayerGlassBox
        data-testid="ContractManagerContainer"
        sx={{
          width: '65%',
        }}
      >
        {selectedId ? (
          <SelectedContractManager contractId={selectedId} />
        ) : (
          <ContractorInfo />
        )}
      </FirstLayerGlassBox>
    </Box>
  );
};
