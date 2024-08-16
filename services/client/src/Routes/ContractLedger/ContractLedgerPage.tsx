//Timeing on animations needs work
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
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
  VisibilityOff,
} from '@mui/icons-material';
import { Box, Collapse, Grow, IconButton, Slide, Tooltip } from '@mui/material';
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

export const ContractLedgerPage: React.FC<unknown> = () => {
  const [selectedId, setSelectedId] = useState<IContract['id'] | null>(null);
  const [isExpanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  const mobile = isMobile();
  const tablet = isTablet();

  const handleContractPick = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (mobile || tablet) {
        playSound('navigate');
        navigate(`/contract?contractID=${id}`);
      }
    },
    [setSelectedId],
  );
  //Contract Selection for selecting a certain Contract
  const handleContractClose = () => {
    setSelectedId(null);
    playSound('close');
  };

  const openCreateContract = useCallback(() => {
    playSound('open');
    dispatch(openPopup(POPUP_CREATE_CONTRACT));
  }, [dispatch]);

  const handleDrawerOpen = () => {
    if (isExpanded) {
      playSound('toggleOff');
    } else {
      playSound('toggleOn');
    }
    setExpanded(!isExpanded);
  };

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

  // const handleArchetypeIconClick = React.useCallback(
  //   (title: string) => {
  //     setSelectedType((prev) => {
  //       const newSelectedTypes = prev.includes(title)
  //         ? prev.filter((t) => t !== title)
  //         : [...prev, title];
  //       setFilters('archetype', newSelectedTypes.join(','));
  //     });
  //   },
  //   [setFilters],
  // );

  const navigate = useNavigate();

  const [filters, setFilters] = useURLQuery();

  const currentFilterValues = useMemo(() => {
    const archetypeFilters = filters.getAll(QueryNames.Archetype);
    return Array.isArray(archetypeFilters) ? archetypeFilters : [archetypeFilters];
  }, [filters]);

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
        <Collapse
          collapsedSize="50px"
          in={isExpanded}
          orientation="horizontal"
          sx={{
            height: '100%',
            position: 'relative',
            width: isExpanded ? '600px' : '30px',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderColor: 'secondary.main',
            mr: '1em',
            boxShadow: '0 2px 10px 4px rgba(24,252,252,0.25)',
            backgroundImage:
              'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
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
            },
            transition: 'all 0.5s',
          }}
        >
          {!mobile && !tablet && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: `rotate(${isExpanded ? '180deg' : '0'})`,
                transition: 'transform 0.3s',
              }}
              onClick={handleDrawerOpen}
            >
              <KeyboardDoubleArrowRight fontSize="large" />
            </IconButton>
          )}
          <Box marginTop={{ xs: '.5em', sm: '.5em', md: '2em', lg: '3em' }}>
            <Slide
              direction="right"
              in={!isExpanded}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 800, exit: 300 }}
            >
              <Box>
                <Tooltip title="Create Contract" placement="right">
                  <IconButton onClick={openCreateContract} size="small">
                    <AddCircle fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Manage Contracts" placement="right">
                  <IconButton
                    onClick={() => {
                      navigate('/ledger/personal/contracts');
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
              data-testid="ContractLedger-ColumnOne__QuickNavSlide"
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
                    navigate('/ledger/personal');
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
                    key={icon.title}
                    in={!isExpanded}
                    mountOnEnter
                    unmountOnExit
                    direction="right"
                    timeout={{ enter: 800, exit: 300 }}
                  >
                    <Tooltip title={icon.title} placement="right">
                      <IconButton
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
        </Collapse>
        <Box
          data-testid="ContractLedger__ColumnTwo"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '50%',
            height: '100%',
            borderTop: '3px solid',
            borderBottom: '3px solid',
            borderRadius: '10px',
            borderColor: 'secondary.main',
            flex: '1',
            background: 'rgba(0,30,100,0.2)',
            backdropFilter: 'blur(20px)',
            p: '1em',
            gap: '1em',
          }}
        >
          {!mobile && !tablet && <ContractTableTools />}
          <ContractsBrowser
            selectedId={selectedId}
            selectedIdSetter={handleContractPick}
            contractOnClose={handleContractClose}
          />
        </Box>
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
