import { ContractDisplayContainer } from '@Components/Contracts/Ledger/Details/ContractDisplayContainer';
import { LedgerBrowser } from '@Components/Contracts/Ledger/LedgerBrowser';
import { LedgerSidePanel } from '@Components/Contracts/Ledger/LedgerSidePanel';
import { Box } from '@mui/material';
import React from 'react';

/**
 * ### ContractLedgerPage
 * @summary
 * The main page for the Contract Ledger.
 * It displays a list of contracts to display and search tools to find contracts.
 * It also contains navigation buttons to open the Contract Manager or create a new contract.
 * - In Desktop, it displays a selected contract in a side panel.
 * - In Mobile, when a contract is selected, the user is navigated to a corresponding {@link ContractPage}.
 */
export const ContractLedgerApp: React.FC<unknown> = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState<boolean>(false);
  return (
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
      <LedgerSidePanel openMobileSearch={setMobileSearchOpen} />
      <LedgerBrowser mobileSearchOpen={mobileSearchOpen} />
      <ContractDisplayContainer />
    </Box>
  );
};
