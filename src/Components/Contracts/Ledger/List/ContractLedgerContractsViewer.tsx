import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import React from 'react';

import { CardorTableViewToggle } from '@/Components/Contracts/Ledger/List/CardView/Card-TableViewToggle';

import { ContractCardDisplay } from './CardView/ContractCardDisplay';

type ContractLedgerContractsViewerProps = {
  selectedId: number | null;
  selectedIdSetter: (id: number | null) => void;
  contractOnClose: () => void;
};

export const ContractLedgerContractsViewer: React.FC<
  ContractLedgerContractsViewerProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ selectedId, selectedIdSetter, contractOnClose }) => {
  return (
    <Box
      id="Contract-Viewer-Box"
      sx={{
        border: '3px ridge ',
        borderColor: 'text.disabled',
        height: '70vh',
        marginTop: '1em',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        id="Contract-Display-View-Tools-Box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '1em',
          alignItems: 'center',
        }}
      >
        <Box data-id="Contract-Deselect-Button-Box" sx={{ mr: 'auto'}}>
          <Button
            label="Close"
            onClick={contractOnClose}
            variant="text"
            endIcon={<CloseIcon />}
            sx={{ color: 'text.secondary' }}
          >
            Close
          </Button>
        </Box>
        <Box data-id="Contract-Display-View-Toggle-Box" sx={{ ml: 'auto' }}>
          <CardorTableViewToggle />
        </Box>
      </Box>
      <Box
        id="Contract-Display-Box"
        sx={{
          flexGrow: 1,
          display: 'flex',
          position: 'relative',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(121, 192, 244, .5)',
          },
        }}
      >
        <ContractCardDisplay onPick={selectedIdSetter} />
      </Box>
    </Box>
  );
};
