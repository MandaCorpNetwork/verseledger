import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { isMobile } from '@Utils/isMobile';
import { isTablet } from '@Utils/isTablet';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';
import { DesktopContractBody } from '@/Components/Contracts/Contract/DesktopContractBody';
import { DesktopReturn } from '@/Components/Contracts/Contract/DesktopReturn';
import { MobileLocations } from '@/Components/Contracts/Contract/MobileLocations';
import { MobileOrTabletController } from '@/Components/Contracts/Contract/MobileOrTabletController';
import { MobileOrTabletReturn } from '@/Components/Contracts/Contract/MobileOrTabletReturn';
import { MobilePayBrief } from '@/Components/Contracts/Contract/MobilePayBrief';
import { TabletDetails } from '@/Components/Contracts/Contract/TabletDetails';
import { TabletOrMobilePanels } from '@/Components/Contracts/Contract/TabletOrMobilePanels';
import { TitleBox } from '@/Components/Contracts/Contract/TitleBox';
import { ContractorsPanel } from '@/Components/Contracts/Ledger/Details/ActiveDataPanel';
import {
  BiddingTimePanel,
  ContractDurationPanel,
} from '@/Components/Contracts/Ledger/Details/TimePanel';

export const ContractPage: React.FC<unknown> = () => {
  const [searchParam] = useURLQuery();
  const dispatch = useAppDispatch();
  const contractId = searchParam.get(QueryNames.Contract);
  const mobile = isMobile();
  const tablet = isTablet();
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();

  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [timeTab, setTimeTab] = React.useState<string>('bid');
  const [activeDataTab, setActiveDataTab] = React.useState<string>('contractors');

  const archetypeOptions = contractArchetypes('secondary.main', 'inherit');

  const contract = useAppSelector((root) => selectContract(root, contractId as string));
  const isLoading = useAppSelector((state) => state.contracts.isLoading);

  React.useEffect(() => {
    if (contractId) {
      dispatch(fetchContracts({ limit: 1, page: 0, contractId: [contractId] }));
    }
  }, [contractId, dispatch]);

  React.useEffect(() => {
    if (!isLoading && !contract) {
      navigate('/contract/ledger');
    }
  }, [contract, isLoading, navigate]);

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

  const getStartLocationId = () => {
    if (!contract) return null;
    if (contract.Locations) {
      const startLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'start',
      )?.id;
      return startLocationPull || null;
    }
    return null;
  };

  const startLocationId = getStartLocationId();

  const getEndLocationId = () => {
    if (!contract) return null;
    if (contract.Locations) {
      const endLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'end',
      )?.id;
      return endLocationPull || null;
    }
    return null;
  };

  const endLocationId = getEndLocationId();

  const getOtherLocationIds = () => {
    if (!contract) return null;
    if (contract.Locations) {
      const otherLocationsPull = contract?.Locations?.filter(
        (location) => location.ContractLocation?.tag === 'other',
      );
      return otherLocationsPull.map((location) => location.id);
    }
    return [];
  };

  const otherLocationIds = getOtherLocationIds();

  const handleTimeTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setTimeTab(value);
    },
    [timeTab],
  );

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
    [timeTab, contract],
  );

  const handleActiveTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setActiveDataTab(value);
    },
    [activeDataTab],
  );

  const activeDataPanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'contractors':
          return (
            <ContractorsPanel
              contractId={contract.id}
              contractorLimit={contract.contractorLimit}
            />
          );
        case 'ships':
          return;
        default:
          return;
      }
    },
    [activeDataTab, contract],
  );

  const handleSubmitBidPopup = () => {
    playSound('open');
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  };

  const [opacity, setOpacity] = React.useState(0.8);

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

  const handleScroll = React.useCallback(() => {
    setOpacity(1);
    setTimeout(() => setOpacity(0.5), 2000);
  }, []);

  const throttledScroll = React.useMemo(
    () => throttle(handleScroll, 200),
    [handleScroll],
  );

  React.useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return (
    <VLViewport
      data-testid="ContractPage__Container"
      sx={{ p: { xs: '1em', sm: '2em', md: '3em', lg: '4em', xl: '5em' } }}
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
            />
          )}
          {(mobile || tablet) && contract && (
            <MobileOrTabletController onSubmit={handleSubmitBidPopup} />
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
            />
          )}
          {(mobile || tablet) && contract && <MobileOrTabletReturn opacity={opacity} />}
          {!mobile && !tablet && <DesktopReturn />}
        </GlassBox>
      )}
    </VLViewport>
  );
};
