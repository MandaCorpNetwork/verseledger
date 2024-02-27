import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import { CreateContractStepper } from './CreateContractStepper';

type CreateContractProps = {
  open: boolean;
};

export const CreateContract: React.FC<CreateContractProps> = ({ open }) => {
  return (
    <Modal open={open} onClose={close} sx={{ backdropFilter: 'blur(5px)' }}>
      <Box
        data-id="Create-Contract-Screen-Contianer"
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          data-id="Create-Contract-Box"
          sx={{
            bgcolor: 'rgba(8, 29, 68, 0.6)',
            display: 'flex',
            padding: '2em',
          }}
        >
          <Box>
            <CreateContractStepper />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
