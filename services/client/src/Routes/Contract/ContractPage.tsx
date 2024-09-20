import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { ContractController } from '@Common/Components/Contracts/ContractController';
import { ContractorList } from '@Common/Components/Contracts/ContractorList';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IContract, IContractWithOwner } from 'vl-shared/src/schemas/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { useSoundEffect } from '@/AudioManager';
import { DesktopContractBody } from '@/Components/Contracts/Contract/DesktopComponents/DesktopContractBody';
import { DesktopReturn } from '@/Components/Contracts/Contract/DesktopComponents/DesktopReturn';
import { MobileLocations } from '@/Components/Contracts/Contract/MobileData/MobileLocations';
import { MobileOrTabletReturn } from '@/Components/Contracts/Contract/MobileData/MobileOrTabletReturn';
import { MobilePayBrief } from '@/Components/Contracts/Contract/MobileData/MobilePayBrief';
import { TabletDetails } from '@/Components/Contracts/Contract/MobileData/TabletData/TabletDetails';
import { TabletOrMobilePanels } from '@/Components/Contracts/Contract/MobileData/TabletOrMobilePanels';
import { TitleBox } from '@/Components/Contracts/Contract/TitleBox/TitleBox';
import {
  BiddingTimePanel,
  ContractDurationPanel,
} from '@/Components/Contracts/Ledger/Details/TimePanel';

/**
 * ### ContractPage
 * @description
 * The ContractPage displays a singular Contract and all of its details.
 * Allows the user to interact with the contract applicable to their access level.
 * Retrieves the contract from a Contract ID passed through the URL query.
 * @version 0.1.3
 * @returns {React.FC}
 * #### Functional Components
 * @component {@link TitleBox}
 * @component {@link TabletDetails}
 * @component {@link MobileLocations}
 * @component {@link TabletOrMobilePanels}
 * @component {@link MobileOrTabletController}
 * @component {@link DesktopContractBody}
 * @component {@link MobileOrTabletReturn}
 * @component {@link DesktopReturn}
 * @component {@link LoadingScreen}
 * #### Styled Components
 * @component {@link VLViewport}
 * @component {@link GlassBox}
 * @author ThreeCrown
 */
export const ContractPage: React.FC<unknown> = () => {
  // LOCAL STATES
  /** Gets the URL Query Parameter State for Readonly */
  const { selectedContractId } = useParams();
  /**
   * State defines the current archetype of the contract.
   * @type [string | null, React.Dispatch<React.SetStateAction<string | null>>]
   * @returns {string | null}
   * @default null
   */
  const [archetype, setArchetype] = React.useState<string | null>(null);
  /**
   * State defines the current time tab of the contract.
   * @type [string, React.Dispatch<React.SetStateAction<string>>]
   * @returns {string}
   * @default 'bid'
   */
  const [timeTab, setTimeTab] = React.useState<string>('bid');
  /**
   * State defines the current active data tab of the contract.
   * @type [string, React.Dispatch<React.SetStateAction<string>>]
   * @returns {string}
   * @default 'contractors'
   */
  const [activeDataTab, setActiveDataTab] = React.useState<string>('contractors');
  const [opacity, setOpacity] = React.useState(0.8);
  /**
   * State defines if the data is currently loading or not.
   */
  const [loading, setLoading] = React.useState<boolean>(true);
  /** State defines if there was an error in loading */
  const [error, setError] = React.useState<boolean>(false);

  // HOOKS
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();

  // LOGIC
  /**
   * useEffect to search the backend for the specified contract
   * @event {string} contractId - The Contract ID from the URL Query Parameter
   * @event {object} dispatch - The Redux Dispatch Function
   */
  React.useEffect(() => {
    if (selectedContractId) {
      setLoading(true);
      dispatch(fetchContracts({ limit: 1, page: 0, contractId: [selectedContractId] }))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }
  }, [selectedContractId, dispatch]);

  /** @var {IContract | null} contract - The Contract from the Redux Store */
  const contract = useAppSelector((root) =>
    selectContract(root, selectedContractId as string),
  ) as IContractWithOwner;

  /** @var {boolean} isLoading - The loading state of the contract */
  const isLoading = useAppSelector((state) => state.contracts.isLoading);

  /**
   * useEffect to navigate to the Contract Ledger if the contract is not found
   * @event {boolean} isLoading - The loading state of the contract
   * @event {IContract | null} contract - The Contract from the Redux Store
   * @event {string} navigate - The Navigate Function from React Router
   */
  React.useEffect(() => {
    if (!loading && !contract && !error) {
      navigate('/contract/ledger');
    }
  }, [contract, error, isLoading, loading, navigate]);

  /** @generator {object} archetypeOption - The archetype options for the contract */
  const archetypeOptions = contractArchetypes('secondary.main', 'inherit');

  /**
   * useEffect to set the archetype of the contract
   * @event {IContract | null} contract - The Contract from the Redux Store
   * @event {object} archetypeOptions - The archetype options for the contract
   */
  React.useEffect(() => {
    if (!contract) return;
    const selectedArchetype = archetypeOptions.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract, archetypeOptions]);

  /**
   * @function currentUser - Gets the current user from the {@link authReducer} slice
   * Calls {@link fetchCurrentUser()}
   * @returns {IUser | null} user - The current user from the `auth` slice
   */
  const currentUser = useAppSelector(selectCurrentUser);

  /**
   * @function checkIsOwner - Checks if the current user is the owner of the contract
   * @param  {IContract | null} contract - The Contract from the Contracts Slice
   * @param  {IUser | null} user - The current user from the `auth` slice
   * @returns {boolean} isOwner - Whether the current user is the owner of the contract
   */
  const checkIsOwner = React.useCallback(
    (contract: IContract | null, user: IUser | null) => {
      if (!contract || !user) return false;
      return contract.owner_id === user.id;
    },
    [],
  );
  /** Calls {@link checkIsOwner()} */
  const isOwner = checkIsOwner(contract, currentUser);

  /**
   * @function getUserBid - Gets the user's bid from the contract if it exists
   * @returns {IBid | null} bid - The user's bid from the contract if it exists
   */
  const getUserBid = React.useCallback(() => {
    Logger.info('CurrentUser', currentUser);
    if (!contract || !currentUser) return null;
    if (contract.Bids) {
      const userBid = contract.Bids.find((bid) => bid.user_id === currentUser.id);
      Logger.info('Contract Page Bid', userBid);
      return userBid ?? null;
    }
    return null;
  }, [contract, currentUser]);
  /** Calls {@link getUserBid()} */
  const userBid = getUserBid();

  /**
   * @function getStartLocationId - Gets the start location ID from the contract
   * @returns {string | null} locationId - The start location ID from the contract
   */
  const getStartLocationId = React.useCallback(() => {
    if (!contract) return null;
    if (contract.Locations) {
      const startLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'start',
      )?.id;
      return startLocationPull ?? null;
    }
    return null;
  }, [contract]);
  /** Calls {@link getStartLocationId()} */
  const startLocationId = getStartLocationId();

  /**
   * @function getEndLocationId - Gets the end location ID from the contract
   * @returns {string | null} locationId - The end location ID from the contract
   */
  const getEndLocationId = React.useCallback(() => {
    if (!contract) return null;
    if (contract.Locations) {
      const endLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'end',
      )?.id;
      return endLocationPull ?? null;
    }
    return null;
  }, [contract]);
  /** Calls {@link getEndLocationId()} */
  const endLocationId = getEndLocationId();

  /**
   * @function getOtherLocationIds - Gets the other location IDs from the contract
   * @returns {string[]} locationIds - The other location IDs from the contract
   */
  const getOtherLocationIds = React.useCallback(() => {
    if (!contract) return null;
    if (contract.Locations) {
      const otherLocationsPull = contract?.Locations?.filter(
        (location) => location.ContractLocation?.tag === 'other',
      );
      return otherLocationsPull.map((location) => location.id);
    }
    return [];
  }, [contract]);
  /** Calls {@link getOtherLocationIds()} */
  const otherLocationIds = getOtherLocationIds();

  /**
   * @function handleTimeTabChange - Handles the time tab change
   * @param {React.SyntheticEvent} _event - The event object
   * @param {string} value - The value of the time tab
   * @returns {void} - Selected time tab
   */
  const handleTimeTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setTimeTab(value);
    },
    [playSound],
  );

  /**
   * @function contractTimePanel - Switch that handles rendering the selected Time Panel
   * @param {string} panel - The panel to render
   * @returns {React.ReactNode} - The selected Time Panel
   * @default {null}
   * - Case 'bid':
   * @component {@link BiddingTimePanel}
   * - Case 'start':
   * @component {@link ContractDurationPanel}
   */
  const contractTimePanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'bid':
          return <BiddingTimePanel contract={contract} />;
        case 'start':
          return <ContractDurationPanel contract={contract} />;
        default:
          return;
      }
    },
    [contract],
  );

  /**
   * @function handleActiveTabChange - Handles the active data tab change
   * @param {React.SyntheticEvent} _event - The event object
   * @param {string} value - The value of the active data tab
   * @returns {void} - Selected active data tab
   */
  const handleActiveTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setActiveDataTab(value);
    },
    [playSound],
  );

  /**
   * @function activeDataPanel - Switch that handles rendering the selected Active Data Panel
   * @param {string} panel - The panel to render
   * @returns {React.ReactNode} - The selected Active Data Panel
   * @default {null}
   * - Case 'contractors':
   * @component {@link ContractorsList}
   * - Case 'ships':
   * TODO
   * - Case 'payroll':
   * TODO
   */
  const activeDataPanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'contractors':
          return <ContractorList contract={contract} />;
        case 'ships':
          return;
        default:
          return;
      }
    },
    [contract],
  );

  /**
   * @function throttle - Throttles a passed event
   * @param {function} func - The function to throttle
   * @param {number} limit - The limit of the throttle
   * @returns {function} - The throttled function
   * @see {@link https://stackoverflow.com/questions/27078285/simple-throttle-in-js}
   */
  const throttle = (func: (...args: unknown[]) => void, limit: number) => {
    let inThrottle: boolean;
    return (...args: unknown[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  /**
   * @function handleScroll - Handles the scroll event
   * @returns {void} - Scroll event
   */
  const handleScroll = React.useCallback(() => {
    setOpacity(1);
    setTimeout(() => setOpacity(0.5), 2000);
  }, []);

  /**
   * @function throttledScroll - Throttles the scroll event
   * @returns {void} - Scroll event
   */
  const throttledScroll = React.useMemo(
    () => throttle(handleScroll, 200),
    [handleScroll],
  );

  /**
   * useEffect to add the scroll event to the window to change the opacity state
   * @event {function} throttledScroll - Throttles the scroll event
   */
  React.useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return (
    <VLViewport
      data-testid="ContractPage__Container"
      sx={{
        p: { xs: '1em', sm: '2em', md: '3em', lg: '4em', xl: '5em' },
        '&:after': {
          backgroundImage:
            'url(https://media.robertsspaceindustries.com/p3kocb3sqz4b9/channel_item_full.png)',
        },
      }}
    >
      {isLoading && <LoadingScreen variant="wheel" controlType="indeterminate" />}
      {contract && (
        <GlassBox
          data-testid="ContractPage__Wrapper"
          sx={{
            py: { xs: '.5em', md: '1em', lg: '2em', xl: '3em' },
            px: { xs: '.5em', md: '2em', lg: '10em', xl: '15em' },
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgb(0,73,130)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '20px',
              background: 'rgb(24,252,252)',
            },
          }}
        >
          <TitleBox
            contract={contract}
            mobile={mobile}
            tablet={tablet}
            archetype={archetype ?? ''}
          />
          {mobile && <MobilePayBrief contract={contract} />}
          {!mobile && tablet && (
            <TabletDetails
              contract={contract}
              startLocation={startLocationId ?? ''}
              endLocation={endLocationId ?? ''}
              otherLocations={otherLocationIds ?? []}
            />
          )}
          {mobile && (
            <MobileLocations
              contract={contract}
              startLocation={startLocationId ?? ''}
              endLocation={endLocationId ?? ''}
              otherLocations={otherLocationIds ?? []}
            />
          )}
          {(mobile || tablet) && contract && (
            <TabletOrMobilePanels
              timeTab={timeTab}
              handleTimeTab={handleTimeTabChange}
              timePanel={contractTimePanel}
              activeDataTab={activeDataTab}
              handleActiveTab={handleActiveTabChange}
              activeDataPanel={activeDataPanel}
              isOwner={isOwner}
              userBid={userBid}
            />
          )}
          {(mobile || tablet) && contract && (
            <ContractController contract={contract} mobileView />
          )}
          {!mobile && !tablet && contract && (
            <DesktopContractBody
              contract={contract}
              timeTab={timeTab}
              handleTimeTab={handleTimeTabChange}
              timePanel={contractTimePanel}
              activeDataTab={activeDataTab}
              handleActiveTab={handleActiveTabChange}
              activeDataPanel={activeDataPanel}
              startLocation={startLocationId ?? ''}
              endLocation={endLocationId ?? ''}
              otherLocations={otherLocationIds ?? []}
              isOwned={isOwner}
              userBid={userBid}
            />
          )}
          {(mobile || tablet) && contract && <MobileOrTabletReturn opacity={opacity} />}
          {!mobile && !tablet && <DesktopReturn />}
        </GlassBox>
      )}
    </VLViewport>
  );
};
