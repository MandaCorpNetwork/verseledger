import { Box, Modal, Typography } from '@mui/material';
import React from 'react';

import { CreateContractStepper } from './CreateContractStepper';

type CreateContractProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateContract: React.FC<CreateContractProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ backdropFilter: 'blur(5px)' }}>
      <Box
        data-testid="CreateContract__Container"
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          data-testid="CreateContract__Wrapper"
          sx={{
            bgcolor: 'rgba(8, 29, 68, 0.6)',
            display: 'flex',
            padding: '2em',
            borderRadius: '10px',
            flexDirection: 'column',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', mb: '1em', color: 'text.secondary' }}
          >
            Create Contract
          </Typography>
          <Box data-id="ContractForm-Container">
            <CreateContractStepper passClose={onClose} passSubmit={() => {}} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
