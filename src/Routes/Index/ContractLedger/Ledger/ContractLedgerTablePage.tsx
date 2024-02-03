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
import { ContractLedgerQuickNav } from './ContractLedgerQuickNav';
import { ContractLedgerLoopButton } from './ContractLedgerLoopButton';

export const ContractLedgerTablePage: React.FC<unknown> = () => {
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
          marginTop:'1em'
        }}
      >
        <Box sx={{ marginLeft: '1.5em' }}>
          {/*Gameplay Loop Contract Type (Left Hand Side)*/}
          <ContractLedgerLoopButton title="Logistics" videoSource={LogisticsLoop} />
          <ContractLedgerLoopButton title="Medical" videoSource={MedicalLoop} />
          <ContractLedgerLoopButton title="Security" videoSource={SecurityLoop} />
          <ContractLedgerLoopButton title="Salvage" videoSource={SalvageLoop} />
          <ContractLedgerLoopButton title="Industry" videoSource={IndustryLoop} />
          <ContractLedgerLoopButton title="RRR" videoSource={RRRLoop} />
          <ContractLedgerLoopButton title="Fleet" videoSource={FleetLoop} />
          <ContractLedgerLoopButton title="Proxy" videoSource={ProxyLoop} />
        </Box>
        <Box>
          <h2>Contract Table Display Section</h2>
          <Box id="Contract-SubType-Radios"></Box>
          <Box>
            <h3>Filters, Sortby & Search</h3>
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
