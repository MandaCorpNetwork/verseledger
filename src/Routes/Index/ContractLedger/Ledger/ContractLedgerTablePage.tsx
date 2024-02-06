import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import FleetLoop from '../../../../Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '../../../../Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '../../../../Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '../../../../Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '../../../../Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '../../../../Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '../../../../Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '../../../../Assets/media/ContractLedger/SecLoop.webm?url';
import { ContractLedgerLoopButton } from './ContractLedgerLoopButton';
import {
  FleetSubTypes,
  IndustrySubTypes,
  LogisiticsSubTypes,
  MedicalSubTypes,
  ProxySubTypes,
  RRRSubTypes,
  SalvageSubTypes,
  SecuritySubTypes,
} from './ContractLedgerLoopSubType';
import { ContractLedgerQuickNav } from './ContractLedgerQuickNav';
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
        }}
      >
        <Box sx={{ marginLeft: '1.5em' }}>
          {/*Gameplay Loop Contract Type (Left Hand Side)*/}
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
        <Box>
          <h2>Contract Table Display Section</h2>
          <Box id="Contract-SubType-Radios">{subTypeSelected()}</Box>
          <Box>
            <h3>Filters, Sortby & Search</h3>
            <ContractLedgerTableTools />
          </Box>
          <Box>
            <h3>Contract Cards</h3>
          </Box>
        </Box>
        <Box>
          <h2>Contract Info Display</h2>
        </Box>
      </Box>
    </Box>
  );
};
