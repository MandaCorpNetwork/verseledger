import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ContractLedgerLoopButton } from '@/Components/ContractLedgerLoopButton';

import FleetLoop from '../../../../Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '../../../../Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '../../../../Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '../../../../Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '../../../../Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '../../../../Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '../../../../Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '../../../../Assets/media/ContractLedger/SecLoop.webm?url';
import { ContractLedgerQuickNav } from '../../../../Components/ContractLedgerQuickNav';
import { ContractLedgerContractsViewer } from './ContractLedgerContractsViewer';
import { ContractLedgerTableTools } from './ContractLedgerTableTools';

export const ContractLedgerTablePage: React.FC<unknown> = () => {
  const [selectedType, setSelectedType] = useState('');
  //Universal Loop Selection for Contract Gameloops

  const subTypeSelected = () => {
    switch (selectedType) {
      case 'Logistics':
        return LogisiticsSubTypes;
      case 'Medical':
        return MedicalSubTypes;
      case 'Salvage':
        return SalvageSubTypes;
      case 'Security':
        return SecuritySubTypes;
      case 'Industry':
        return IndustrySubTypes;
      case 'RRR':
        return RRRSubTypes;
      case 'Fleet':
        return FleetSubTypes;
      case 'Proxy':
        return ProxySubTypes;
      default:
        return null;
    }
  };
  //Sub-Type Selection for Contract Gameloops

  useEffect(() => {
    console.log('Selected Type:', selectedType);
  }, [selectedType]);
  //Console Log for Selected Loop for testing

  return (
    <Box>
      <Box sx={{ marginTop: '1.5em' }}>
        {/*QuickNav Buttons (Top Left) */}
        <ContractLedgerQuickNav title="Contract Manager" />
        <ContractLedgerQuickNav title="Create Contract" />
      </Box>
      <Box
        id="Contract-Table-Page"
        sx={{
          marginTop: '1em',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box id="Game-Loop-Filters-Box" sx={{ marginLeft: '1.5em', width: '15%' }}>
          <ContractLedgerLoopButton
            title="Logistics"
            videoSource={LogisticsLoop}
            onClick={() => setSelectedType('Logistics')}
          />
          <ContractLedgerLoopButton
            title="Medical"
            videoSource={MedicalLoop}
            onClick={() => setSelectedType('Medical')}
          />
          <ContractLedgerLoopButton
            title="Security"
            videoSource={SecurityLoop}
            onClick={() => setSelectedType('Security')}
          />
          <ContractLedgerLoopButton
            title="Salvage"
            videoSource={SalvageLoop}
            onClick={() => setSelectedType('Salvage')}
          />
          <ContractLedgerLoopButton
            title="Industry"
            videoSource={IndustryLoop}
            onClick={() => setSelectedType('Industry')}
          />
          <ContractLedgerLoopButton
            title="RRR"
            videoSource={RRRLoop}
            onClick={() => setSelectedType('RRR')}
          />
          <ContractLedgerLoopButton
            title="Fleet"
            videoSource={FleetLoop}
            onClick={() => setSelectedType('Fleet')}
          />
          <ContractLedgerLoopButton
            title="Proxy"
            videoSource={ProxyLoop}
            onClick={() => setSelectedType('Proxy')}
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
          <ContractLedgerContractsViewer />
        </Box>
      </Box>
    </Box>
  );
};
