//Timeing on animations needs work
import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/Definitions/CustomIcons';
import {
  AddCircle,
  Explore,
  Factory,
  KeyboardDoubleArrowRight,
  LocalHospital,
  VisibilityOff,
} from '@mui/icons-material';
import { Box, Collapse, Grow, IconButton, Slide, Tooltip } from '@mui/material';
import { POPUP_CREATE_CONTRACT } from '@Popups/CreateContract/CreateContract';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import React, { useCallback, useEffect, useState } from 'react';
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
import BackdropLogo from '@/Assets/media/VerseLogos/LogoBackdrop.png?url';
import { ContractLedgerLoopButton } from '@/Components/Contracts/Ledger/ContractLedgerLoopButton';
import { ContractLedgerQuickNav } from '@/Components/Contracts/Ledger/ContractLedgerQuickNav';
import { ContractDisplayContainer } from '@/Components/Contracts/Ledger/Details/ContractDisplayContainer';
import { ContractsBrowser } from '@/Components/Contracts/Ledger/List/ContractBrowser';
import { ContractTableTools } from '@/Components/Contracts/Ledger/List/ContractTableTools';

export const ContractLedgerPage: React.FC<unknown> = () => {
  const [selectedId, setSelectedId] = useState<IContract['id'] | null>(null);
  const [isExpanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const handleContractPick = useCallback(
    (id: string | null) => {
      setSelectedId(id);
    },
    [setSelectedId],
  );
  useEffect(() => {
    console.log(`SelectedId: ${selectedId}`);
  }, [selectedId]);
  //Contract Selection for selecting a certain Contract
  const handleContractClose = () => {
    setSelectedId(null);
  };

  const [selectedType, setSelectedType] = useState<string[]>([]);

  const openCreateContract = useCallback(() => {
    dispatch(openPopup(POPUP_CREATE_CONTRACT));
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setExpanded(!isExpanded);
  };

  const archetypeButton = [
    { title: 'Logistics', videoSource: LogisticsLoop },
    { title: 'Medical', videoSource: MedicalLoop },
    { title: 'Security', videoSource: SecurityLoop },
    { title: 'Salvage', videoSource: SalvageLoop },
    { title: 'Industry', videoSource: IndustryLoop },
    { title: 'Rearm Refuel Repair', videoSource: RRRLoop },
    { title: 'Fleet', videoSource: FleetLoop },
    { title: 'Exploration', videoSource: RRRLoop },
    { title: 'Proxy', videoSource: ProxyLoop },
  ];

  const [,] = useURLQuery();

  const archetypeIcon = [
    { title: 'Logistics', icon: <LogisticsIcon fontSize="large" /> },
    { title: 'Medical', icon: <LocalHospital fontSize="large" /> },
    { title: 'Security', icon: <SecurityIcon fontSize="large" /> },
    { title: 'Salvage', icon: <SalvageIcon fontSize="large" /> },
    { title: 'Industry', icon: <Factory fontSize="large" /> },
    { title: 'Rearm Refuel Repair', icon: <RRRIcon fontSize="large" /> },
    { title: 'Fleet', icon: <FleetIcon fontSize="large" /> },
    { title: 'Exploration', icon: <Explore fontSize="large" /> },
    { title: 'Proxy', icon: <VisibilityOff fontSize="large" /> },
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

  return (
    <Box
      data-testid="ContractLedger__PageContainer"
      sx={{
        width: '100vw',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          backgroundImage: `url(${BackdropLogo})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          opacity: 0.5,
        },
      }}
    >
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
          <Box
            sx={{
              mt: '3em',
            }}
          >
            <Tooltip title="Create Contract" placement="right">
              <Slide
                direction="right"
                in={!isExpanded}
                mountOnEnter
                unmountOnExit
                timeout={{ enter: 800, exit: 300 }}
              >
                <IconButton onClick={openCreateContract}>
                  <AddCircle fontSize="large" />
                </IconButton>
              </Slide>
            </Tooltip>
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
                  onClick={() => navigate('/ledger/personal')}
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
                        onClick={() => {}}
                        sx={{
                          color: 'primary.main',
                          // color:
                          //   selectedType == icon.title
                          //     ? 'secondary.main'
                          //     : 'primary.main',
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
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
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
          }}
        >
          <ContractTableTools />
          <ContractsBrowser
            selectedId={selectedId}
            selectedIdSetter={handleContractPick}
            contractOnClose={handleContractClose}
          />
        </Box>
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
      </Box>
    </Box>
  );
};
