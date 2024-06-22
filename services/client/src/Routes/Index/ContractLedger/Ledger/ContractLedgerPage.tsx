//Will work with MuiTransitions for the dock - https://mui.com/material-ui/transitions/
import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/Definitions/CustomIcons';
//import { QueryNames } from '@Common/Definitions/QueryNames';
import {
  AddCircle,
  Explore,
  Factory,
  KeyboardDoubleArrowRight,
  LocalHospital,
  VisibilityOff,
} from '@mui/icons-material';
import { Box, Collapse, IconButton, Tooltip } from '@mui/material';
import { POPUP_CREATE_CONTRACT } from '@Popups/CreateContract/CreateContract';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
//import { useURLQuery } from '@Utils/Hooks/useURLQuery';
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

  const [selectedType, setSelectedType] = useState<string>('');

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

  //const [, setFilters] = useURLQuery();

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
  //   (filter: typeof QueryNames, title: string) => {
  //     setFilters(filter, title);
  //     setSelectedType(title);
  //   },
  //   [setFilters, setSelectedType],
  // );

  const navigate = useNavigate();

  return (
    <Box
      data-testid="ContractLedger__PageContainer"
      sx={{
        width: '100vw',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
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
            width: isExpanded ? '600px' : '30px',
            backgroundColor: 'primary.dark',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            mr: '1em',
          }}
        >
          <IconButton onClick={handleDrawerOpen}>
            <KeyboardDoubleArrowRight fontSize="large" />
          </IconButton>
          <Tooltip title="Create Contract" placement="right">
            <IconButton
              onClick={openCreateContract}
              sx={{ display: isExpanded ? 'none' : 'flex' }}
            >
              <AddCircle fontSize="large" />
            </IconButton>
          </Tooltip>
          <Box
            data-testid="ContractLedger-ColumnOne__QuickNavWrapper"
            sx={{
              width: '100%',
              justifyContent: 'center',
              display: isExpanded ? 'flex' : 'none',
              opacity: isExpanded ? 1 : 0,
              transition: 'opacity 2s ease-in-out 1s',
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
                <Box
                  key={icon.title}
                  sx={{
                    display: isExpanded ? 'none' : 'flex',
                    transform: isExpanded ? 'translateX(-100%)' : 'translateX(0)',
                    opacity: isExpanded ? 0 : 1,
                    transition:
                      'transform 0.8s ease-in-out, opacity 0.5s ease-in-out 1s, display 1s ease-in-out',
                  }}
                >
                  <Tooltip title={icon.title} placement="right">
                    <IconButton
                      onClick={() => {}}
                      sx={{
                        color:
                          selectedType == icon.title ? 'secondary.main' : 'primary.main',
                      }}
                    >
                      {icon.icon}
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            })}
            {archetypeButton.map((button) => (
              <Box
                key={button.title}
                sx={{
                  display: isExpanded ? 'flex' : 'none',
                  mb: '1',
                  mr: '1em',
                  transform: isExpanded ? 'translateX(0)' : 'translateX(-100%)',
                  transition:
                    'transform 0.3s ease-in-out 2s, opacity 0.5s ease-in-out 0.3s, display 1s ease-in-out',
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <ContractLedgerLoopButton
                  title={button.title}
                  videoSource={button.videoSource}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              </Box>
            ))}
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
          }}
        >
          <ContractDisplayContainer selectedId={selectedId} />
        </Box>
      </Box>
    </Box>
  );
};
