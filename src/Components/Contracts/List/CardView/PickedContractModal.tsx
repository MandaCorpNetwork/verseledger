import { Modal } from '@mui/material';
import React from 'react';

import { ContractCard } from '@/Components/Contracts/List/CardView/ContractCard';
import { useAppSelector } from '@/Redux/hooks';
import { pickContract } from '@/Redux/Slices/Contracts/contractSelectors';

type PickedContractModalProps = {
  selectedId: number | null;
};

export const PickedContractModal: React.FC<PickedContractModalProps> = ({
  selectedId,
}) => {
  const pickedContract = useAppSelector((root) => pickContract(root, selectedId));

  return (
    <>
      {pickedContract && (
        <Modal
          open={selectedId !== null}
          disableEnforceFocus={true}
          disablePortal={true}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: '1000',
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
      )}
    </>
  );
};
