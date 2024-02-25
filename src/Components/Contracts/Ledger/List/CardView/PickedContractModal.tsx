import { Modal, Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ContractCard } from '@/Components/Contracts/Ledger/List/CardView/ContractCard';
import { useAppSelector } from '@/Redux/hooks';
import { pickContract } from '@/Redux/Slices/Contracts/contractSelectors';

type PickedContractModalProps = {
  selectedId: number | null;
  onClose: () => void;
};

export const PickedContractModal: React.FC<PickedContractModalProps> = ({
  selectedId,
  onClose,
}) => {
  const pickedContract = useAppSelector((root) => pickContract(root, selectedId));
  useEffect(() => {
    console.log(`PickedContractModal: ${selectedId}`);
  }, [selectedId]);

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
          <Box>
            <Button endIcon={<CloseIcon />} onClick={onClose} sx={{ color: 'text.secondary', mb: '10%' }}>Close</Button>
            <ContractCard contract={pickedContract} />
          </Box>
        </Modal>
      )}
    </>
  );
};
