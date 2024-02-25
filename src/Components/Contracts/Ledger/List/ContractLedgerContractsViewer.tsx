import { Box } from '@mui/material';
import React from 'react';

import { CardorTableViewToggle } from '@/Components/Contracts/Ledger/List/CardView/Card-TableViewToggle';

import { ContractCardDisplay } from './CardView/ContractCardDisplay';

type ContractLedgerContractsViewerProps = {
  selectedId: number | null;
  selectedIdSetter: (id: number | null) => void;
  contractOnClose: () => void;
};

export const PickedContractContext = React.createContext<number | null>(null);

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
      <Box id="Contract-Display-Toggle-Box" sx={{ padding: '.5em', marginLeft: 'auto' }}>
        <CardorTableViewToggle />
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
