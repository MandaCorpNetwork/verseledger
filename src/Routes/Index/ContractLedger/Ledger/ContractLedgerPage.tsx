import { Box, Collapse, Drawer, IconButton, Portal, Tooltip } from '@mui/material';
import { POPUP_CREATE_CONTRACT } from '@Popups/CreateContract/CreateContract';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React, { useCallback, useEffect, useState } from 'react';

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
import {
  AddCircle,
  Build,
  Explore,
  Factory,
  KeyboardDoubleArrowRight,
  LocalHospital,
  VisibilityOff,
} from '@mui/icons-material';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/CustomIcons';
import { QueryNames } from '@Common/Definitions/QueryNames';

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

  const [, setFilters] = useURLQuery();

  const archetypeIcon = [
    { title: 'Logistics', icon: <LogisticsIcon /> },
    { title: 'Medical', icon: <LocalHospital /> },
    { title: 'Security', icon: <SecurityIcon /> },
    { title: 'Salvage', icon: <SalvageIcon /> },
    { title: 'Industry', icon: <Factory /> },
    { title: 'Rearm Refuel Repair', icon: <RRRIcon /> },
    { title: 'Fleet', icon: <FleetIcon /> },
    { title: 'Exploration', icon: <Explore /> },
    { title: 'Proxy', icon: <VisibilityOff /> },
  ];

  const handleArchetypeIconClick = React.useCallback(
    (filter: typeof QueryNames, title: string) => {
      setFilters(filter, title);
      setSelectedType(title);
    },
    [setFilters, setSelectedType],
  );

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
          collapsedSize="40px"
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
          <IconButton onClick={openCreateContract} sx={{ display: isExpanded ? 'none' : 'flex' }}>
            <AddCircle fontSize="large" />
          </IconButton>
          <Box
            data-testid="ContractLedger-ColumnOne__QuickNavWrapper"
            sx={{
              width: '100%',
              justifyContent: 'center',
              display: isExpanded ? 'flex' : 'none',
            }}
          >
            <ContractLedgerQuickNav
              title="Manage"
              onClick={() => {}}
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
            }}
          >
            {archetypeIcon.map((icon) => {
              return (
                <Tooltip key={icon.title} title={icon.title}>
                  <IconButton
                    onClick={() => {}}
                    sx={{ display: isExpanded ? 'none' : 'flex' }}
                  >
                    {icon.icon}
                  </IconButton>
                </Tooltip>
              );
            })}
            {archetypeButton.map((button) => (
              <ContractLedgerLoopButton
                key={button.title}
                title={button.title}
                videoSource={button.videoSource}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                sx={{
                  display: isExpanded ? 'flex' : 'none',
                  mb: '1',
                }}
              />
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
