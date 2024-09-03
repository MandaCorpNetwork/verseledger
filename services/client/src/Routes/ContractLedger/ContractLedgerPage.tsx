import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { SideControlPanel } from '@Common/Components/Collapse/SideControlPanel';
import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/Definitions/CustomIcons';
import {
  AddCircle,
  EditNote,
  Explore,
  Factory,
  KeyboardDoubleArrowRight,
  LocalHospital,
  Search,
  VisibilityOff,
} from '@mui/icons-material';
import { Box, Grow, IconButton, Slide, Tooltip } from '@mui/material';
import { POPUP_CREATE_CONTRACT } from '@Popups/Contracts/CreateContract/CreateContract';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { isMobile } from '@Utils/isMobile';
import { isTablet } from '@Utils/isTablet';
import { QueryNames } from '@Utils/QueryNames';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import FleetLoop from '@/Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '@/Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '@/Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '@/Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '@/Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '@/Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '@/Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '@/Assets/media/ContractLedger/SecLoop.webm?url';
import { useSoundEffect } from '@/AudioManager';
import { ContractLedgerLoopButton } from '@/Components/Contracts/Ledger/ContractLedgerLoopButton';
import { ContractLedgerQuickNav } from '@/Components/Contracts/Ledger/ContractLedgerQuickNav';
import { ContractDisplayContainer } from '@/Components/Contracts/Ledger/Details/ContractDisplayContainer';
import { ContractsBrowser } from '@/Components/Contracts/Ledger/List/ContractBrowser';
import { ContractTableTools } from '@/Components/Contracts/Ledger/List/ContractTableTools';
import { SmallSearchTools } from '@/Components/Contracts/Ledger/List/SmallSearchTools';

/**
 * ### ContractLedgerPage
 * @summary
 * The main page for the Contract Ledger.
 * It displays a list of contracts to display and search tools to find contracts.
 * It also contains navigation buttons to open the Contract Manager or create a new contract.
 * - In Desktop, it displays a selected contract in a side panel.
 * - In Mobile, when a contract is selected, the user is navigated to a corresponding {@link ContractPage}.
 * @version 0.1.3
 * @returns {JSX.Element}
 * #### Functional Components
 * @component {@link ContractBrowser}
 * @component {@link ContractDisplayContainer}
 * @component {@link ContractLedgerLoopButton}
 * @component {@link ContractLedgerQuickNav}
 * @component {@link SmallSearchTools}
 * #### Styled Components
 * @component {@link VLViewport}
 * @component {@link GlassBox}
 * @component {@link SideControlPanel}
 * @author ThreeCrown
 */
export const ContractLedgerPage: React.FC<unknown> = () => {
  // LOCAL STATES
  /**
   * State determines the selected contract ID
   * @type [IContract['id'] | null, React.Dispatch<React.SetStateAction<IContract['id'] | null>>]
   * @default {null}
   * @returns {IContract['id'] | null}
   * TODO: Utilize the useURLQuery to store the selected contract ID
   */
  const [selectedId, setSelectedId] = useState<IContract['id'] | null>(null);
  /**
   * State determins if the Side Panel is expanded
   * @type [boolean, React.Dispatch<React.SetStateAction<boolean>>]
   * @default {false}
   * @returns {boolean}
   * TODO: Move the Side Panel into it's own component
   */
  const [isExpanded, setExpanded] = useState(false);
  /**
   * State determines if the MobileSearchTools are expanded
   * @type [boolean, React.Dispatch<React.SetStateAction<boolean>>]
   * @default {false}
   * @returns {boolean}
   */
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  /**
   * State using the useURLQuery hook to store & read the URL query parameters
   */
  const [filters, setFilters] = useURLQuery();
  // HOOKS
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();
  const mobile = isMobile();
  const tablet = isTablet();
  // LOGIC
  /**
   * @function handleMobileSearchOpen() - Handles the clickEvent that sets the {@link mobileSearchOpen} state
   * @returns {void} Toggles the {@link mobileSearchOpen} state between `true` and `false`
   */
  const handleMobileSearchOpen = React.useCallback(() => {
    setMobileSearchOpen((prev) => !prev);
  }, [setMobileSearchOpen]);
  /**
   * @function handleContractPick() - Handles the clickEvent that sets the {@link selectedId} state
   * @param {string} id - The ID of the contract being selected
   * @returns {void} - Sets the {@link selectedId} state to the provided `id`
   * #### If Mobile:
   * @fires navigate() - `/contract?contractID=${id}`
   * TODO: Utilize the useURLQuery to store the selected contract ID
   */
  const handleContractPick = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (mobile || tablet) {
        playSound('navigate');
        navigate(`/ledger/contracts/${id}`);
      }
    },
    [setSelectedId],
  );
  /**
   * @function handleContractClose() - Handles the clickEvent that sets the {@link selectedId} state to `null` */
  const handleContractClose = () => {
    setSelectedId(null);
    playSound('close');
  };
  /** @function openCreateContract() - Handles the clickEvent that opens the {@link CreateContractPopup} */
  const openCreateContract = useCallback(() => {
    playSound('open');
    dispatch(openPopup(POPUP_CREATE_CONTRACT));
  }, [dispatch]);
  /** @function handleDrawerOpen - Handles the clickEvent that toggles the {@link isExpanded} state */
  const handleDrawerOpen = () => {
    if (isExpanded) {
      playSound('toggleOff');
    } else {
      playSound('toggleOn');
    }
    setExpanded(!isExpanded);
  };
  /**
   * @name ArchetypeButton
   * Defines the Contract Archetype Video Buttons and their corresponding Data
   * *Displayed only on Desktop when Side Panel is expanded*
   * @prop {string} title - The title of the archetype
   * @prop {string} videoSource - The source of the video
   * @prop {string} value - The value of the archetype
   */
  const archetypeButton = [
    { title: 'Logistics', videoSource: LogisticsLoop, value: 'Logistics' },
    { title: 'Medical', videoSource: MedicalLoop, value: 'Medical' },
    { title: 'Security', videoSource: SecurityLoop, value: 'Security' },
    { title: 'Salvage', videoSource: SalvageLoop, value: 'Salvage' },
    { title: 'Industry', videoSource: IndustryLoop, value: 'Industry' },
    { title: 'Rearm Refuel Repair', videoSource: RRRLoop, value: 'RRR' },
    { title: 'Fleet', videoSource: FleetLoop, value: 'Fleet' },
    { title: 'Exploration', videoSource: RRRLoop, value: 'Exploration' },
    { title: 'Proxy', videoSource: ProxyLoop, value: 'Proxy' },
  ];
  /**
   * @name ArchetypeIcon
   * Defines the Contract Archetype Icons and their corresponding Data
   * *Displayed when Side Panel is collapsed or on Mobile & Tablet*
   * @prop {string} title - The title of the archetype
   * @prop {JSX.Element} icon - The icon of the archetype
   * @prop {string} value - The value of the archetype
   */
  const archetypeIcon = [
    { title: 'Logistics', icon: <LogisticsIcon fontSize="large" />, value: 'Logistics' },
    { title: 'Medical', icon: <LocalHospital fontSize="large" />, value: 'Medical' },
    { title: 'Security', icon: <SecurityIcon fontSize="large" />, value: 'Security' },
    { title: 'Salvage', icon: <SalvageIcon fontSize="large" />, value: 'Salvage' },
    { title: 'Industry', icon: <Factory fontSize="large" />, value: 'Industry' },
    { title: 'Rearm Refuel Repair', icon: <RRRIcon fontSize="large" />, value: 'RRR' },
    { title: 'Fleet', icon: <FleetIcon fontSize="large" />, value: 'Fleet' },
    { title: 'Exploration', icon: <Explore fontSize="large" />, value: 'Exploration' },
    { title: 'Proxy', icon: <VisibilityOff fontSize="large" />, value: 'Proxy' },
  ];
  /**
   * @function currentFilterValues() - Defines the current filter values from the URL query parameters for the Subtypes to properly check which Archetypes are selected
   * @returns {string[]} - An array of strings representing the current filter values
   */
  const currentFilterValues = useMemo(() => {
    const archetypeFilters = filters.getAll(QueryNames.Archetype);
    return Array.isArray(archetypeFilters) ? archetypeFilters : [archetypeFilters];
  }, [filters]);
  /**
   * @function handleArchetypeChange() - Handles the clickEvent that sets the {@link filters} state for a list of Subtypes connected to a specific Archetype
   * @param value - The value of the archetype
   */
  const handleArchetypeChange = (value: string) => {
    playSound('clickMain');
    setFilters(
      QueryNames.Archetype,
      currentFilterValues.includes(value)
        ? currentFilterValues.filter((archetype) => archetype !== value)
        : [...currentFilterValues, value],
    );
  };

  return (
    <VLViewport data-testid="ContractLedger__PageContainer">
      <Box
        data-testid="ContractLedger__LedgerWrapper"
        sx={{
          py: '1em',
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <SideControlPanel
          data-testid="ContractLedger__SidePanel"
          collapsedSize="50px"
          in={isExpanded}
          orientation="horizontal"
          sx={{
            height: '100%',
            width: isExpanded ? '600px' : '30px',
            mr: '1em',
          }}
        >
          {!mobile && !tablet && (
            <IconButton
              data-testid="ContractLedger-SidePanel__Expand_ToggleButton"
              onClick={handleDrawerOpen}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: `rotate(${isExpanded ? '180deg' : '0'})`,
                transition: 'transform 0.3s',
              }}
            >
              <KeyboardDoubleArrowRight fontSize="large" />
            </IconButton>
          )}
          <Box
            data-testid="ContractLedger-SidePanel__Buttons_Wrapper"
            marginTop={{ xs: '.5em', sm: '.5em', md: '2em', lg: '3em' }}
          >
            <Slide
              data-testid="ContractLedger-SidePanel__CollapsedButtons_Slide"
              direction="right"
              in={!isExpanded}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 800, exit: 300 }}
            >
              <Box>
                {mobile ||
                  (tablet && (
                    <>
                      <IconButton
                        data-testid="ContractLedger-SidePanel-CollapsedButtons__MobileSearchToggle_Button"
                        size="small"
                        onClick={handleMobileSearchOpen}
                      >
                        <Search fontSize="large" />
                      </IconButton>
                    </>
                  ))}
                <Tooltip
                  title="Create Contract"
                  placement="right"
                  disableInteractive
                  enterDelay={500}
                  enterNextDelay={2000}
                  leaveDelay={300}
                >
                  <IconButton
                    data-testid="ContractLedger-SidePanel-CollapsedButtons__CreateContract_Button"
                    onClick={openCreateContract}
                    size="small"
                  >
                    <AddCircle fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Manage Contracts"
                  placement="right"
                  disableInteractive
                  enterDelay={500}
                  enterNextDelay={2000}
                  leaveDelay={300}
                >
                  <IconButton
                    data-testid="ContractLedger-SidePanel-CollapsedButtons__ManageContracts_Button"
                    onClick={() => {
                      navigate('/dashboard/contracts');
                      playSound('navigate');
                    }}
                    size="small"
                    sx={{ ml: '.2em' }}
                  >
                    <EditNote fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Slide>
            <Grow
              data-testid="ContractLedger-ColumnOne__QuickNav_Grow"
              in={isExpanded}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 3500, exit: 300 }}
            >
              <Box
                data-testid="ContractLedger-ColumnOne__QuickNavWrapper"
                sx={{
                  ml: '20%',
                }}
              >
                <ContractLedgerQuickNav
                  title="Manage"
                  onClick={() => {
                    navigate('/dashboard/contracts');
                    playSound('navigate');
                  }}
                  testid="ContractManager"
                />
                <ContractLedgerQuickNav
                  title="Create"
                  onClick={openCreateContract}
                  testid="CreateContract"
                />
              </Box>
            </Grow>
            <Box
              data-testid="ContractLedger-ColumnOne__ArchetypeButtonWrapper"
              sx={{
                width: '100%',
                mr: isExpanded ? '.5em' : '',
                ml: isExpanded ? '.5em' : '',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {archetypeIcon.map((icon) => {
                return (
                  <Slide
                    data-testid="ContractLedger-ColumnOne__ArchetypeButton_Slide"
                    key={icon.title}
                    in={!isExpanded}
                    mountOnEnter
                    unmountOnExit
                    direction="right"
                    timeout={{ enter: 800, exit: 300 }}
                  >
                    <Tooltip
                      title={icon.title}
                      placement="right"
                      disableInteractive
                      enterDelay={300}
                    >
                      <IconButton
                        data-testid={`ContractLedger-ColumnOne-ArchetypeButton__${icon.title}_Button`}
                        onClick={() => handleArchetypeChange(icon.value)}
                        sx={{
                          color: currentFilterValues.includes(icon.value)
                            ? 'secondary.main'
                            : 'primary.main',
                        }}
                      >
                        {icon.icon}
                      </IconButton>
                    </Tooltip>
                  </Slide>
                );
              })}
              {archetypeButton.map((button) => (
                <Grow
                  data-testid="ContractLedger-ColumnOne__ArchetypeButton_Grow"
                  key={button.title}
                  in={isExpanded}
                  mountOnEnter
                  unmountOnExit
                  timeout={{ enter: 3500, exit: 300 }}
                >
                  <Box
                    sx={{
                      mb: '1',
                      mr: '1em',
                    }}
                  >
                    <ContractLedgerLoopButton
                      title={button.title}
                      videoSource={button.videoSource}
                      value={button.value}
                    />
                  </Box>
                </Grow>
              ))}
            </Box>
          </Box>
        </SideControlPanel>
        <GlassBox
          data-testid="ContractLedger__ColumnTwo"
          sx={{
            minWidth: '50%',
            height: '100%',
            flex: '1',
            p: '1em',
            gap: '1em',
            position: 'relative',
          }}
        >
          <SmallSearchTools isOpen={mobileSearchOpen} />
          {!mobile && !tablet && <ContractTableTools />}
          <ContractsBrowser
            selectedId={selectedId}
            selectedIdSetter={handleContractPick}
            contractOnClose={handleContractClose}
          />
        </GlassBox>
        {!mobile && !tablet && (
          <Box
            data-testid="ContractLedger__ColumnThree"
            sx={{
              ml: '1em',
              width: '30%',
              height: '100%',
              background: 'rgba(0,30,100,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <ContractDisplayContainer selectedId={selectedId} />
          </Box>
        )}
      </Box>
    </VLViewport>
  );
};
