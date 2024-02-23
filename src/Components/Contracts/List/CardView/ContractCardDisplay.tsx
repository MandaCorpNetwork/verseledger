import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { ContractCard } from '@/Components/Contracts/List/CardView/ContractCard';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectContracts } from '@/Redux/Slices/Contracts/contractSelectors';
import { fetchContracts } from '@/Redux/Slices/Contracts/contractThunks';

type ContractCardDisplayProps = {
  onPick: (id: number | null) => void;
};

export const ContractCardDisplay: React.FC<ContractCardDisplayProps> = ({ onPick }) => {
  const dispatch = useAppDispatch();
  const contracts = useAppSelector((root) => selectContracts(root));
  useEffect(() => {
    dispatch(fetchContracts());
  }, []);
  //Contract Array Loader
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
