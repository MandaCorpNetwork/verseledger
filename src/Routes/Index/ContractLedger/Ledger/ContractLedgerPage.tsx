import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CreateContract } from '@/Components/Contracts/Create/CreateContract';
import { ContractLedgerLoopButton } from '@/Components/Contracts/Ledger/Filters/ContractLedgerLoopButton';

import FleetLoop from '../../../../Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '../../../../Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '../../../../Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '../../../../Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '../../../../Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '../../../../Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '../../../../Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '../../../../Assets/media/ContractLedger/SecLoop.webm?url';
import { ContractLedgerQuickNav } from '../../../../Components/Contracts/Ledger/ContractLedgerQuickNav';
import { ContractBriefingDisplay } from '../../../../Components/Contracts/Ledger/Details/ContractBriefingDisplay';
import { ContractLedgerTableTools } from '../../../../Components/Contracts/Ledger/Filters/ContractLedgerTableTools';
import { ContractLedgerContractsViewer } from '../../../../Components/Contracts/Ledger/List/ContractLedgerContractsViewer';

export const ContractLedgerTablePage: React.FC<unknown> = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleContractPick = (id: number | null) => {
    setSelectedId(id);
  };
  useEffect(() => {
    console.log(`SelectedId: ${selectedId}`);
  }, [selectedId]);
  //Contract Selection for selecting a certain Contract
  const handleContractClose = () => {
    setSelectedId(null);
  };

  const [selectedType, setSelectedType] = useState<string>('');

  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false);

  const openCreateContract = () => {
    setIsCreateContractOpen(true);
  };

  return (
    <Box>
      <Box sx={{ marginTop: '1.5em' }}>
        {/*QuickNav Buttons (Top Left) */}
        <ContractLedgerQuickNav title="Contract Manager" />
        <ContractLedgerQuickNav title="Create Contract" onClick={openCreateContract} />
      </Box>
      <CreateContract
        open={isCreateContractOpen}
        onClose={() => setIsCreateContractOpen(false)}
      />
      <Box
        id="Contract-Table-Page"
        sx={{
          marginTop: '1em',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          id="Game-Loop-Filters-Box"
          sx={{ marginLeft: '1.5em', width: '18%', overflow: 'hidden' }}
        >
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
            title="Proxy"
            videoSource={ProxyLoop}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </Box>
        <Box
          id="Contract-Browser-Box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            marginLeft: '5%',
          }}
        >
          <ContractLedgerTableTools />
          <ContractLedgerContractsViewer
            selectedId={selectedId}
            selectedIdSetter={handleContractPick}
            contractOnClose={handleContractClose}
          />
        </Box>
        <Box
          id="Contract-Briefing-Box"
          sx={{
            flexGrow: 1,
            ml: '2%',
            mr: '1em',
            width: '30%',
          }}
        >
          <ContractBriefingDisplay selectedId={selectedId} />
        </Box>
      </Box>
    </Box>
  );
};
