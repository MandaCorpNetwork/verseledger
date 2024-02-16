import { Box } from '@mui/material';
import { ContractCard } from '@/Components/ContractCard';
import { auto } from '@popperjs/core';

export const ContractCardDisplay: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        padding: '1em',
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        gap: '1.5em',
        justifyContent: 'space-around',
      }}
    >
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
      <ContractCard />
    </Box>
  );
};
