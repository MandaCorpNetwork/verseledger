// Imports
import { useSoundEffect } from '@Audio/AudioManager';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/get/fetchContracts.action';
import { selectContractsArray } from '@Redux/Slices/Contracts/contracts.selectors';
import { fetchContractBidsOfUser } from '@Redux/Slices/Users/Actions/fetchContractBidsByUser.action';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { useIsMobile } from '@Utils/isMobile';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';
import { IContractSearch, IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';

import { ContractManagerBrowser } from './Browser/ContractManagerBrowser';
import { SelectedContract } from './ContractDisplay/SelectedContract';
import { ContractorInfo } from './ContractDisplay/tools/ContractorInfo';

/**
 * ### Contract Manager App
 * @description
 * The Contract Manager App for managing Contracts owned or connected to.
 */
export const ContractManagerApp: React.FC<unknown> = () => {
  const { selectedContractId } = useParams();

  /** State uses {@link useURLQuery} hook to view & set filters */
  const { searchParams, setFilters } = useURLQuery();

  /**
   * State Determins the Selected Contract Id
   *
   * @todo - Replace with using URLQuery for contractId
   */
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  /**
   * State Determines which page of contracts to fetch from the backend
   */
  const [page] = React.useState(1);

  //TODO: Need to implement useParams for the selected contract instead of useState
  // const { selectedContractId } = useParams();
  // HOOKS
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  // const location = useLocation();
  const { playSound } = useSoundEffect();

  // LOGIC

  /**
   * Creates Custom Breakpoint @ `1400px` to Stop Rendering of the Selected Contract Display.
   * If 1400px or less, only the Contractor Info will render
   */
  const hideContracts = useMediaQuery('(max-width: 1400px)');

  /**
   * Memo for the currently set `Contract Browser List`
   */
  const currentTab = React.useMemo(() => {
    const tab = searchParams.get(QueryNames.ContractManagerTab);
    if (!tab) {
      setFilters(QueryNames.ContractManagerTab, 'employed');
      return 'employed';
    }
    return tab;
  }, [searchParams, setFilters]);

  /** Fetchs the Current User from `Auth` slice */
  const currentUser = useAppSelector(selectCurrentUser);

  /** Determines the id of the Current User if found */
  const userId = currentUser?.id;

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
   * @param currentTab - The Currently selected Tab
   * @param page - The current page set by {@link handlePageChange}
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
      <ContractManagerBrowser />
      {!mobile && (
        <GlassBox
          data-testid="ContractManagerContainer"
          sx={{
            width: '65%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {!hideContracts && selectedContractId ? (
            <SelectedContract />
          ) : (
            <ContractorInfo willChange={hideContracts} />
          )}
        </GlassBox>
      )}
    </Box>
  );
};
