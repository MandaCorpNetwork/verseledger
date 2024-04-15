import { Box } from '@mui/material';
import React from 'react';

import { ContractCard } from '@/Components/Contracts/Ledger/List/CardView/ContractCard';

type ContractCardDisplayProps = {
  onPick: (id: number | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contracts: any[];
};

export const ContractCardDisplay: React.FC<ContractCardDisplayProps> = ({
  onPick,
  contracts,
}) => {
  const [isSelected, setIsSelected] = React.useState<number | null>(null);

  const handlePick = (id: number | null) => {
    onPick(id);
    setIsSelected(id);
  };

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
            onClick={() => handlePick(contract.id)}
            isSelected={isSelected === contract.id}
          />
        );
      })}
    </Box>
  );
};
