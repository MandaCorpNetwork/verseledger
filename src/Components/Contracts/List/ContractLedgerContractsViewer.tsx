import { Box } from '@mui/material';
import React, { useState } from 'react';

import { CardorTableViewToggle } from '@/Components/Contracts/List/CardView/Card-TableViewToggle';
import { PickedContractModal } from '@/Components/Contracts/List/CardView/PickedContractModal';
import { selectContracts } from '@/Redux/Slices/Contracts/contractSelectors';
import { fetchContracts } from '@/Redux/Slices/Contracts/contractThunks';

import { ContractCardDisplay } from './CardView/ContractCardDisplay';
export const ContractContext = React.createContext(null);

export const ContractLedgerContractsViewer: React.FC<unknown> = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleContractPick = (id: number | null) => {
    setSelectedId(id);
  };
  //Contract Selection for selecting a certain Contract
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

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
      <PickedContractModal selectedId={selectedId} />
      <Box
        id="Contract-Display-Box"
        sx={{
          flexGrow: 1,
          display: 'flex',
          position: 'relative',
          overflow: selectedId ? 'hidden' : 'auto',
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
        <ContractCardDisplay onPick={handleContractPick} />
      </Box>
    </Box>
  );
};
