import { Box } from '@mui/material';
import React from 'react';

import { ContractCard } from '@/Components/Contracts/Ledger/List/CardView/ContractCard';

type ContractCardDisplayProps = {
  onPick: (id: string | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contracts: any[];
  isSelected: string | null;
};

export const ContractCardDisplay: React.FC<ContractCardDisplayProps> = ({
  onPick,
  contracts,
  isSelected,
}) => {

  return (
    <Box
      id="Contract-Card-Display-Box"
      sx={{
        padding: '1em',
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        gap: '1.5em',
        justifyContent: 'space-around',
        position: 'relative',
      }}
    >
      {contracts.map((contract) => {
        return (
          <ContractCard
            contract={contract}
            key={contract.id}
            onClick={() => onPick(contract.id)}
            isSelected={isSelected === contract.id}
          />
        );
      })}
    </Box>
  );
};
