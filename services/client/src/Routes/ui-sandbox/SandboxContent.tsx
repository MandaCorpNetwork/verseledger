import { RatingDisplay } from '@Common/Components/App/RatingDisplay';
import { Box } from '@mui/material';
import React from 'react';

export const SandboxContent: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '1em',
      }}
    >
      <Box sx={{ display: 'flex', gap: '1em' }}>
        <RatingDisplay size="medium" value={3} variant="defined" />
      </Box>
    </Box>
  );
};
