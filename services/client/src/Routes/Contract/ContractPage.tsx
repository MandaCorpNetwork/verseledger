import { useSoundEffect } from '@Audio/AudioManager';
// import { AppDockRenderer } from '@Common/AppDockV3/AppDockV3';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { ContractController } from '@Common/Components/Contracts/ContractController';
import { ContractorList } from '@Common/Components/Contracts/ContractorList';
import { contractArchetypes } from '@Common/Definitions/Structures/Contracts/ContractArchetypes';
import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
// import { MobileDock } from '@Common/MobileDock/MobileDock';
import { DesktopContractBody } from '@Components/Contracts/ContractPage/DesktopComponents/DesktopContractBody';
import { MobileLocations } from '@Components/Contracts/ContractPage/MobileData/MobileLocations';
import { MobilePayBrief } from '@Components/Contracts/ContractPage/MobileData/MobilePayBrief';
import { TabletDetails } from '@Components/Contracts/ContractPage/MobileData/TabletData/TabletDetails';
import { TabletOrMobilePanels } from '@Components/Contracts/ContractPage/MobileData/TabletOrMobilePanels';
import { TitleBox } from '@Components/Contracts/ContractPage/TitleBox/TitleBox';
import {
  BiddingTimePanel,
  ContractDurationPanel,
} from '@Components/Contracts/Ledger/Details/TimePanel';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/get/fetchContracts.action';
import { selectContract } from '@Redux/Slices/Contracts/contracts.selectors';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate, useParams } from 'react-router-dom';
import {
  IContract,
  IContractWithOwner,
} from 'vl-shared/src/schemas/contracts/ContractSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

/**
 * ### ContractPage
 * @description
 * The ContractPage displays a singular Contract and all of its details.
 * Allows the user to interact with the contract applicable to their access level.
 * Retrieves the contract from a Contract ID passed through the URL query.
 */
export const ContractPage: React.FC<unknown> = () => {
  // LOCAL STATES
  const { selectedContractId } = useParams();
  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [timeTab, setTimeTab] = React.useState<string>('bid');
  const [activeDataTab, setActiveDataTab] = React.useState<string>('contractors');
  const [_loading, setLoading] = React.useState<boolean>(true);
  const [_error, setError] = React.useState<boolean>(false);

  // HOOKS
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const sound = useSoundEffect();
  // const navigate = useNavigate();

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
   * useEffect to set the archetype of the contract
   * @event {IContract | null} contract - The Contract from the Redux Store
   * @event {object} archetypeOptions - The archetype options for the contract
   */
  React.useEffect(() => {
    if (!contract) return;
    const selectedArchetype = contractArchetypes.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract]);

  /**
   * Gets the current user from the {@link authReducer} slice
   * Calls {@link fetchCurrentUser()}
   */
  const currentUser = useAppSelector(selectCurrentUser);

  /**
   * Checks if the current user is the owner of the contract
   * @param  {IContract | null} contract - The Contract from the Contracts Slice
   * @param  {IUser | null} user - The current user from the `auth` slice
   */
  const checkIsOwner = React.useCallback(
    (contract: IContract | null, user: IUser | null) => {
      if (!contract || !user) return false;
      return contract.owner_id === user.id;
    },
    [],
  );
  /** Calls {@link checkIsOwner()} */
  const isOwner = checkIsOwner(contract, currentUser as unknown as IUser);

  /**
   * Gets the user's bid from the contract if it exists
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
   * Gets the start location ID from the contract
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
   * Gets the end location ID from the contract
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
   * Gets the other location IDs from the contract
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
   * Handles the time tab change
   * @param _event - The event object
   * @param value - The value of the time tab
   */
  const handleTimeTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      sound.playSound('clickMain');
      setTimeTab(value);
    },
    [sound],
  );

  /**
   * Switch that handles rendering the selected Time Panel
   * @param panel - The panel to render
   *
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
   * Handles the active data tab change
   * @param _event - The event object
   * @param value - The value of the active data tab
   */
  const handleActiveTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      sound.playSound('clickMain');
      setActiveDataTab(value);
    },
    [sound],
  );

  /**
   * Switch that handles rendering the selected Active Data Panel
   * @param panel - The panel to render
   *
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
        default:
          return;
      }
    },
    [contract],
  );

  return (
    <VLViewport
      data-testid="ContractPage__Container"
      sx={{
        px: { xs: '1em', sm: '2em', md: '3em', lg: '4em', xl: '5em' },
        pt: { xs: '1em', sm: '2em', md: '3em', lg: '4em', xl: '5em' },
        display: 'flex',
        flexDirection: 'column',
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
        </GlassBox>
      )}
      {/* <div
        style={{
          margin: '.5em 0',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {!mobile && <AppDockRenderer />}
        {mobile && <MobileDock top hCenter />}
      </div> */}
    </VLViewport>
  );
};
