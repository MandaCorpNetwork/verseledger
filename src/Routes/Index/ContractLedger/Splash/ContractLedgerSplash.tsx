/// <reference types="vite/client" />
import { Box } from '@mui/material';
import React from 'react';

import FleetLoop from '../../../../Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '../../../../Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '../../../../Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '../../../../Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '../../../../Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '../../../../Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '../../../../Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '../../../../Assets/media/ContractLedger/SecLoop.webm?url';
import { ContractSplashLoopButton } from './ContractSplashLoopButton';
import { ContractSplashRedirectButton } from './ContractSplashRedirectButton';

export const ContractLedgerSplash: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        marginTop: '3em',
        display: 'grid',
        justifyContent: 'center',
      }}
    >
      <Box display="flex" justifyContent="center">
        <ContractSplashRedirectButton title="Contract Manager" />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '1.3em',
        }}
      >
        <ContractSplashLoopButton
          title="Logistics"
          videoSource={LogisticsLoop}
          to="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="Medical"
          videoSource={MedicalLoop}
          to-="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="Security"
          videoSource={SecurityLoop}
          to="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="Salvage"
          videoSource={SalvageLoop}
          to="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="Industry"
          videoSource={IndustryLoop}
          to="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="RRR"
          videoSource={RRRLoop}
          to="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="Fleet"
          videoSource={FleetLoop}
          to="/contract/ledger"
        />
        <ContractSplashLoopButton
          title="Proxy"
          videoSource={ProxyLoop}
          to="/contract/ledger"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <ContractSplashRedirectButton title="Create Contract" />
      </Box>
    </Box>
  );
};
