import { Backdrop, Box } from '@mui/material';
import { auto } from '@popperjs/core';
import React, { useEffect } from 'react';

import { ContractCard } from '@/Components/Contracts/ContractCard';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { fetchContracts } from '@/Redux/Slices/Contracts/contractThunks';
import { selectContracts } from '@/Redux/Slices/Contracts/contractSelectors';

export const ContractCardDisplay: React.FC<unknown> = () => {
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const contracts = useAppSelector((root) => selectContracts(root));
  useEffect(() => {
    dispatch(fetchContracts());
  }, []);

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
        sx={{
          zIndex: '100',
          position: 'absolute',
          backgroundColor: 'rgba(0, 1, 19, 0.8)',
        }}
      />
      {/*{open && (
        <Modal>
          <ContractCard id={} />
        </Modal>
      )}*/}
      {contracts.map((contract) => {
        return (
          <ContractCard contract={contract} key={contract.id} setOpenProp={(isOpen) => setOpen(isOpen)} />
        );
      })}
    </Box>
  );
};
