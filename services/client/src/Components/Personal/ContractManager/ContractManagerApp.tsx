// Imports
import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab, useMediaQuery, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { selectBidPagination } from '@Redux/Slices/Bids/bidsSelector';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import {
  selectContractPagination,
  selectContractsArray,
} from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { fetchContractBidsOfUser } from '@Redux/Slices/Users/Actions/fetchContractBidsByUser';
import { useIsMobile } from '@Utils/isMobile';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';

import { useSoundEffect } from '@/AudioManager';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { SelectedContractManager } from './ContractDisplay/SelectedContractManager';
import { ContractorInfo } from './ContractDisplay/tools/ContractorInfo';
import { ContractList } from './ContractList/ContractList';
import { SearchTools } from './ContractList/SearchTools';

/**
 * ### Contract Manager App
 * @description
 * The Contract Manager App for managing Contracts owned or connected to.
 * @version 0.1.5 - Sept 2024
 * @memberof {@link PersonalLedgerPage}
 * Components Used:
 * - {@link SearchTools}
 * - {@link ContractList}
 * - {@link ContractorInfo}
 * - {@link SelectedContractManager}
 * @author ThreeCrown - May 2024
 */
export const ContractManagerApp: React.FC<unknown> = () => {
  // LOCAL STATES

  /** State uses {@link useURLQuery} hook to view & set filters */
  const { searchParams, setFilters, overwriteURLQuery } = useURLQuery();

  /**
   * State Determins the Selected Contract Id
   * @default {null}
   * @returns {string}
   * @todo - Replace with using URLQuery for contractId
   */
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  /**
   * State Determines which page of contracts to fetch from the backend
   * @default (1)
   * @returns {number}
   */
  const [page, setPage] = React.useState(1);

  /**
   * State Determins which DropDown list is currently expanded
   * @default inProgress
   * @returns {string}
   */
  const [expandedList, setExpandedList] = React.useState<string | null>(null);

  //TODO: Need to implement useParams for the selected contract instead of useState
  // const { selectedContractId } = useParams();
  // HOOKS
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const theme = useTheme();
  const navigate = useNavigate();
  // const location = useLocation();
  const { playSound } = useSoundEffect();

  // LOGIC

  /**
   * Creates Custom Breakpoint @ `1400px` to Stop Rendering of the Selected Contract Display.
   * If 1400px or less, only the Contractor Info will render
   */
  const hideContracts = useMediaQuery('(max-width: 1400px)');

  /** Finds the total Contract Count from the DTO for the Pagination */
  const contractCount = useAppSelector(selectContractPagination);

  /** Finds the total Bid Count from the DTO for the Pagination */
  const bidCount = useAppSelector(selectBidPagination);

  /**
   * Handles the clickEvent from the pagination buttons to change the Page Fetched from the Contract Search Endpoint.
   * @param {React.ChangeEvent} Event
   * @param {number} newPage
   * - {@link setPage}
   */
  const handleChangePage = React.useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      playSound('clickMain');
      setPage(newPage);
    },
    [playSound, setPage],
  );

  /**
   * Memo for the currently set `Contract Browser List`
   * @default `employed`
   * @returns {string} Filter value of `QueryNames.ContractManagerTab`
   */
  const currentTab = React.useMemo(() => {
    const tab = searchParams.get(QueryNames.ContractManagerTab);
    if (!tab) {
      setFilters(QueryNames.ContractManagerTab, 'employed');
      return 'employed';
    }
    return tab;
  }, [searchParams, setFilters]);

  /**
   * Handles the ChangeEvent from the ContractList Tab to change the rendered Contract List
   * @param {React.SynteticEvent} _Event
   * @param {string} newValue - The Tab Value to change to.
   * @fires
   * - setSelectedId(null) - Ensures that when you change a tab, the Selected Contract is cleared.
   * - playSound('clickMain')
   * - overwriteURLQuery(newValue) - Ensures that all Filters a cleared other than the ContractManagerTab and set the new value to this filter.
   */
  const handleBrowserChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setSelectedId(null);
      playSound('clickMain');
      overwriteURLQuery({ [QueryNames.ContractManagerTab]: newValue });
    },
    [overwriteURLQuery, playSound, setSelectedId],
  );

  /** Fetchs the Current User from `Auth` slice */
  const currentUser = useAppSelector(selectCurrentUser);

  /** Determines the id of the Current User if found */
  const userId = currentUser?.id;

  /**
   * Handles Expanding a DropDown Section of the Contract List to view the contracts by Subtype.
   * @param {string}value - The Archetype string to pass to determine which collapse to expand.
   * @see ContractListDropdown
   */
  const handleExpandList = React.useCallback(
    (value: string) => {
      if (!value) return;
      setExpandedList(value);
    },
    [setExpandedList],
  );

  /**
   * Handles the clickEvent on a {@link ContractManagerCard} in the {@link ContractList} to render the Contract in {@link SelectedContractManager}, or navigate to the {@link ContractPage} if a Breakpoint is reached.
   * @param {string} Id - The Id of a Contract.
   * If Mobile:
   * @fires navigate() - `/contract?contractID=${id}`
   */
  const handleContractSelect = React.useCallback(
    (id: string | null) => {
      if (mobile) {
        playSound('navigate');
        navigate(`/contract?contractID=${id}`);
        return;
      }
      setSelectedId(id);
      playSound('open');
    },
    [mobile, playSound, navigate],
  );

  /**
   * Handles Deselecting a Contract from the {@link SelectedContractManager}
   * @fires setSelectedId()
   * @returns null
   */
  const handleContractDeselect = () => {
    setSelectedId(null);
  };

  /**
   * @async
   * Fetches the Bids from the backend
   */
  const handleFetchBids = React.useCallback(
    async (params: IUserBidSearch) => {
      const bidParams = {
        ...params,
      };
      try {
        const fetchBids = await dispatch(fetchContractBidsOfUser(bidParams));
        if (fetchContractBidsOfUser.fulfilled.match(fetchBids)) {
          const bids = fetchBids.payload.data;
          if (bids && Array.isArray(bids)) {
            const contractIds = bids.map((bid: IContractBid) => bid.contract_id);
            return contractIds;
          } else {
            enqueueSnackbar('No Bids found', { variant: 'warning' });
            playSound('warning');
            return [];
          }
        } else {
          enqueueSnackbar('Error fetching bids', { variant: 'error' });
          playSound('error');
          return [];
        }
      } catch (_e) {
        enqueueSnackbar('Unknown Error Occurred', { variant: 'error' });
        playSound('error');
        return [];
      }
    },
    [dispatch, playSound],
  );

  /**
   * Handles the Fetching of Contracts from the backend based on Params set by the {@link SearchTools}
   */
  const handleFetchContracts = React.useCallback(
    (params: IContractSearch) => {
      const subtypes = searchParams.getAll(QueryNames.Subtype) as IContractSubType[];
      const bidBefore = new Date(searchParams.get(QueryNames.BidBefore) as string);
      const bidAfter = new Date(searchParams.get(QueryNames.BidAfter) as string);
      const startBefore = new Date(searchParams.get(QueryNames.StartBefore) as string);
      const startAfter = new Date(searchParams.get(QueryNames.StartAfter) as string);
      const endBefore = new Date(searchParams.get(QueryNames.EndBefore) as string);
      const endAfter = new Date(searchParams.get(QueryNames.EndAfter) as string);
      const duration = parseInt(searchParams.get(QueryNames.Duration) as string, 10);
      const payStructure = searchParams.get(
        QueryNames.PayStructure,
      ) as IContractPayStructure;
      const minPay = Number(searchParams.get(QueryNames.UECRangeMin) as string);
      const maxPay = Number(searchParams.get(QueryNames.UECRangeMax) as string);
      const contractParams = {
        ...(subtypes.length > 0 && {
          subtype: subtypes,
        }),
        ...((bidBefore || bidAfter) && {
          bidDate: {
            before: bidBefore,
            after: bidAfter,
          },
        }),
        ...((startBefore || startAfter) && {
          startDate: {
            before: startBefore,
            after: startAfter,
          },
        }),
        ...((endBefore || endAfter) && {
          endDate: {
            before: endBefore,
            after: endAfter,
          },
        }),
        ...(duration && {
          duration: Number(duration),
        }),
        ...(payStructure && {
          payStructure: payStructure,
        }),
        ...(minPay && {
          minPay: minPay,
        }),
        ...(maxPay && {
          maxPay: maxPay,
        }),
        ...params,
      };
      dispatch(fetchContracts(contractParams));
    },
    [dispatch, searchParams],
  );

  /**
   * The useEffect that runs {@link handleFetchContracts} & {@link handleFetchBids} depending on the current `ContractManagerTab`.
   * @param {string} currentTab - The Currently selected Tab
   * @param {number} page - The current page set by {@link handlePageChange}
   * @returns {IContract[]}
   */
  React.useEffect(() => {
    switch (currentTab) {
      case 'employed':
        {
          const bidParams: IUserBidSearch = {
            page: page - 1,
            limit: 50,
            status: ['ACCEPTED'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 25,
              status: ['BIDDING', 'PENDING', 'INPROGRESS'],
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
            limit: 50,
            status: ['BIDDING', 'PENDING', 'INPROGRESS'],
            ...(userId && { ownerId: [userId] }),
          };
          handleFetchContracts(contractParams);
        }
        break;
      case 'pending':
        {
          const bidParams: IUserBidSearch = {
            page: page - 1,
            limit: 50,
            status: ['PENDING', 'EXPIRED'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 50,
              status: ['BIDDING', 'PENDING', 'INPROGRESS'],
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
            limit: 50,
            status: ['INVITED'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 50,
              status: ['BIDDING', 'PENDING', 'INPROGRESS'],
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
            limit: 50,
            status: ['COMPLETED', 'CANCELED'],
            ...(userId && { ownerId: [userId] }),
          };
          dispatch(fetchContracts(contractParams));
        }
        break;
      case 'completed':
        {
          const bidParams: IUserBidSearch = {
            page: page - 1,
            limit: 50,
            status: ['ACCEPTED', 'EXPIRED'],
          };
          handleFetchBids(bidParams).then((contractIds) => {
            const contractParams: IContractSearch = {
              page: 0,
              limit: 50,
              status: ['CANCELED', 'COMPLETED'],
              contractId: contractIds,
            };
            handleFetchContracts(contractParams);
          });
        }
        break;
      default:
        break;
    }
  }, [
    searchParams,
    page,
    dispatch,
    handleFetchBids,
    handleFetchContracts,
    currentTab,
    userId,
  ]);

  /** Selects the Contracts currently stored in the `Contracts` Slice */
  const contracts = useAppSelector((state) => selectContractsArray(state));

  /** A useEffect to ensure that the Selected Contract is Available in the `Contracts` Slice, otherwise cleares the SelectedId */
  React.useEffect(() => {
    if (selectedId && !contracts.some((contract) => contract.id === selectedId)) {
      setSelectedId(null);
    }
  }, [contracts, selectedId, setSelectedId]);

  /** Decides whether or not to display ScrollButtons for the Tabs Component */
  const displayScrollButtons = !!theme.breakpoints.down('lg');

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
          width: { xs: '100%', md: '30%' },
          flexDirection: 'column',
        }}
      >
        <TabContext value={currentTab}>
          <GlassBox data-testid="ContractManager__ContractListWrapper">
            <ControlPanelBox
              data-testid="ContractManager__TabContainer"
              sx={{
                display: 'block',
                my: '1em',
                px: { xs: '.5em', md: '.8em' },
                py: '.2em',
                mx: { xs: '0', md: '1em' },
                alignSelf: 'center',
                width: `100%`,
              }}
            >
              <TabList
                data-testid="ContractManager__TabList"
                orientation="horizontal"
                onChange={handleBrowserChange}
                indicatorColor="secondary"
                textColor="secondary"
                scrollButtons={displayScrollButtons}
                allowScrollButtonsMobile
                variant={theme.breakpoints.down('lg') ? 'scrollable' : 'fullWidth'}
              >
                <Tab
                  data-testid="ContractManager__AcceptedTab"
                  label="Employed"
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
                  data-testid="ContractManager__CompletedTab"
                  label="Completed"
                  value="completed"
                />
                <Tab
                  data-testid="ContractManager__HistoryTab"
                  label="History"
                  value="closed"
                />
              </TabList>
            </ControlPanelBox>
            <Box
              data-testid="ContractManager-ContractList__SearchTools_Wrapper"
              sx={{ height: '75px' }}
            >
              <SearchTools />
            </Box>
            <ContractList
              expandedList={expandedList}
              setExpandedList={handleExpandList}
              contracts={contracts}
              setSelectedId={handleContractSelect}
              selectedId={selectedId}
              page={page}
              setPage={handleChangePage}
              pageCount={
                currentTab === 'employed' ||
                currentTab === 'pending' ||
                currentTab === 'offers' ||
                currentTab === 'completed'
                  ? bidCount.pages
                  : contractCount.pages
              }
            />
          </GlassBox>
        </TabContext>
      </Box>
      {!mobile && (
        <GlassBox
          data-testid="ContractManagerContainer"
          sx={{
            width: '65%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {!hideContracts && selectedId ? (
            <SelectedContractManager
              contractId={selectedId}
              deselectContract={handleContractDeselect}
            />
          ) : (
            <ContractorInfo />
          )}
        </GlassBox>
      )}
    </Box>
  );
};
