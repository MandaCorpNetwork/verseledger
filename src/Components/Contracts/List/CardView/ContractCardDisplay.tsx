import { Backdrop, Box, Button, Modal, Typography } from '@mui/material';
import { auto } from '@popperjs/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ContractCard } from '@/Components/Contracts/List/CardView/ContractCard';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import {
  pickContract,
  selectContracts,
} from '@/Redux/Slices/Contracts/contractSelectors';
import { fetchContracts } from '@/Redux/Slices/Contracts/contractThunks';

export const ContractCardDisplay: React.FC<unknown> = () => {
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const contracts = useAppSelector((root) => selectContracts(root));
  useEffect(() => {
    dispatch(fetchContracts());
  }, []);
  //Contract Array Loader
  const [selectedId, setSelectedId] = useState(null);
  const handleContractPick = (id) => {
    setSelectedId(id);
  };
  const handleContractUnpick = () => {
    setSelectedId(null);
  };
  const pickedContract = useAppSelector((root) =>
    root.contracts.find((c) => c.id === selectedId),
  );

  useEffect(() => {
    if (selectedId !== null) {
      const box = document.getElementById('Contract-Card-Display-Box');
      box?.scrollTo({ top: 0 });
    }
  }, [selectedId]);

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
        overflow: selectedId !== null ? 'hidden' : 'auto',
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
      {contracts.map((contract) => {
        return (
          <ContractCard
            contract={contract}
            key={contract.id}
            onClick={() => handleContractPick(contract.id)}
          />
        );
      })}
    </Box>
  );
};
