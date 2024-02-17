import { Box, Backdrop } from '@mui/material';
import { ContractCard } from '@/Components/ContractCard';
import { auto } from '@popperjs/core';
import React from 'react';

export const ContractCardDisplay: React.FC<unknown> = () => {
  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);

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
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ zIndex: '100', position: 'absolute', backgroundColor: 'rgba(0, 1, 19, 0.8)' }}
      />
      {open && (
        <Modal>
          <ContractCard />
        </Modal>
      )}
      <ContractCard setOpenProp={(isOpen) => setOpen(isOpen)} />
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
