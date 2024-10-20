import { LedgerBrowser } from '@Components/Contracts/Ledger/Browser/LedgerBrowser';
import { ContractDisplayContainer } from '@Components/Contracts/Ledger/Details/ContractDisplayContainer';
import { LedgerSidePanel } from '@Components/Contracts/Ledger/SidePanel/LedgerSidePanel';
import { Box } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

/**
 * ### ContractLedgerApp
 * @summary
 * It displays a list of contracts to display and search tools to find contracts.
 * It also contains navigation buttons to open the Contract Manager or create a new contract.
 * - In Desktop, it displays a selected contract in a side panel.
 * - In Mobile, when a contract is selected, the user is navigated to a corresponding {@link ContractPage}.
 */
export const ContractLedgerApp: React.FC = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState<boolean>(false);
  const isMobile = useIsMobile();
  return (
    <Box
      data-testid="ContractLedger__LedgerWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        gap: '1em',
      }}
    >
      <LedgerSidePanel openMobileSearch={setMobileSearchOpen} />
      <LedgerBrowser mobileSearchOpen={mobileSearchOpen} />
      {!isMobile && <ContractDisplayContainer />}
    </Box>
  );
};
