// Imports
import { useSoundEffect } from '@Audio/AudioManager';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { QueryNames } from '@Common/Definitions/Search/QueryNames';
import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import { Box, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/get/fetchContracts.action';
import { fetchContractBidsOfUser } from '@Redux/Slices/Users/Actions/fetchContractBidsByUser.action';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { useIsMobile } from '@Utils/isMobile';
import { enqueueSnackbar } from 'notistack';
import React, { Suspense } from 'react';
import { useParams } from 'react-router';
import type { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import type { IContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import type {
  IContractSearch,
  IUserBidSearch,
} from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import type { IContractSubType } from 'vl-shared/src/schemas/contracts/ContractSubTypeSchema';

import { ContractManagerBrowser } from './Browser/ContractManagerBrowser';
import { ContractorInfo } from './ContractDisplay/tools/ContractorInfo';
const SelectedContract = React.lazy(async () => {
  const module = await import('./ContractDisplay/SelectedContract');
  return { default: module.SelectedContract };
});

/**
 * ### Contract Manager App
 * @description
 * The Contract Manager App for managing Contracts owned or connected to.
 */
export const ContractManagerApp: React.FC<unknown> = () => {
  /** Currently Selected ID of a Contract */
  const { selectedContractId } = useParams();
  const { searchParams, setFilters } = useURLQuery();
  /** State Determines which page of contracts to fetch from the backend */
  const [page] = React.useState(1);

  // HOOKS
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const sound = useSoundEffect();

  // LOGIC
  /**
   * Creates Custom Breakpoint @ `1400px` to Stop Rendering of the Selected Contract Display.
   * If 1400px or less, only the Contractor Info will render
   */
  const hideContracts = useMediaQuery('(max-width: 1400px)');

  /** Memo for the currently set `Contract Browser List` */
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

  /** Fetches the Bids from the backend */
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
            sound.playSound('warning');
            return [];
          }
        } else {
          enqueueSnackbar('Error fetching bids', { variant: 'error' });
          sound.playSound('error');
          return [];
        }
      } catch (_e) {
        enqueueSnackbar('Unknown Error Occurred', { variant: 'error' });
        sound.playSound('error');
        return [];
      }
    },
    [dispatch, sound],
  );

  /**
   * Handles the Fetching of Contracts from the backend based on Params set by the {@link SearchTools}
   */
  const handleFetchContracts = React.useCallback(
    (params: IContractSearch) => {
      const subtypes = searchParams.getAll(
        QueryNames.ContractSubtype,
      ) as IContractSubType[];
      const bidBefore = new Date(searchParams.get(QueryNames.BidBefore) as string);
      const bidAfter = new Date(searchParams.get(QueryNames.BidAfter) as string);
      const startBefore = new Date(searchParams.get(QueryNames.StartBefore) as string);
      const startAfter = new Date(searchParams.get(QueryNames.StartAfter) as string);
      const endBefore = new Date(searchParams.get(QueryNames.EndBefore) as string);
      const endAfter = new Date(searchParams.get(QueryNames.EndAfter) as string);
      const duration = Number.parseInt(
        searchParams.get(QueryNames.Duration) as string,
        10,
      );
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
  }, [page, dispatch, handleFetchBids, handleFetchContracts, currentTab, userId]);
  return (
    <Box
      component="section"
      aria-label="Contracts Manager Application"
      id="ContractsManager__AppContainer"
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
        <FeatureContainer
          data-testid="ContractManagerContainer"
          sx={{
            width: '65%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {!hideContracts && selectedContractId ? (
            <Suspense fallback={<LoadingWheel />}>
              <SelectedContract />
            </Suspense>
          ) : (
            <ContractorInfo willChange={hideContracts} />
          )}
        </FeatureContainer>
      )}
    </Box>
  );
};
