import { Box } from '@mui/material';
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

export const ContractLedgerPage: React.FC<unknown> = () => {
  const [selectedId, setSelectedId] = useState<IContract['id'] | null>(null);
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

  return (
    <Box
      data-testid="ContractLedger__PageContainer"
      sx={{
        width: '100%',
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
        }}
      >
        <Box
          data-testid="ContractLedger__ColumnOneContainer"
          sx={{ marginLeft: '1em', width: '18%', overflow: 'hidden' }}
        >
          <Box data-testid="ContractLedger-ColumnOne__QuickNavWrapper">
            {/*QuickNav Buttons (Top Left) */}
            <ContractLedgerQuickNav
              title="Contract Manager"
              onClick={() => {}}
              testid="ContractManager"
            />
            <ContractLedgerQuickNav
              title="Create Contract"
              onClick={openCreateContract}
              testid="CreateContract"
            />
          </Box>
          <Box data-testid="ContractLedger-ColumnOne__ArchetypeButtonWrapper">
            <ContractLedgerLoopButton
              title="Logistics"
              videoSource={LogisticsLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Medical"
              videoSource={MedicalLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Security"
              videoSource={SecurityLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Salvage"
              videoSource={SalvageLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Industry"
              videoSource={IndustryLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Rearm Refuel Repair"
              videoSource={RRRLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Fleet"
              videoSource={FleetLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Exploration"
              videoSource={RRRLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <ContractLedgerLoopButton
              title="Proxy"
              videoSource={ProxyLoop}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </Box>
        </Box>
        <Box
          data-testid="ContractLedger__ColumnTwo"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
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
