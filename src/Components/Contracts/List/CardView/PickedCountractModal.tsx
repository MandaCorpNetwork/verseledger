import { Modal } from '@mui/material';
import React, { useEffect,useState } from 'react';

import { ContractCard } from '@/Components/Contracts/List/CardView/ContractCard';
import { ContractCardDisplay } from '@/Components/Contracts/List/CardView/ContractCardDisplay';

interface PickedContractModalProps {
  contracts: Contract[];
};

export const PickedContractModal: React.FC<PickedContractModalProps> = ({ contracts }) => {
  return (
    {pickedContract && (
      <Modal
        open={selectedId !== null}
        disableEnforceFocus={true}
        disablePortal={true}
    
        sx={{
          width: '100%',
          height: '100%',
          zIndex: '100',
          position: 'absolute',
          top: '0',
          left: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '10%',
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(5, 5, 32, .68)',
            backdropFilter: 'blur(10px)',
            position: 'absolute',
          },
        }}
      >
        <ContractCard contract={pickedContract} />
      </Modal>
    )};
  );
};
