import { Box, Typography } from '@mui/material';
import React from 'react';

export const BidPanel: React.FC<unknown> = () => {
  return (
    <Box data-testid="ContractTime-Panel__BidTimeWrapper">
      <Typography>Bid Time Remaining: X</Typography>
      <Typography>Bid End Date: X</Typography>
    </Box>
  );
};

export const StartPanel: React.FC<unknown> = () => {
  return (
    <Box data-testid="ContractTime-Panel__StartTimeWrapper">
      <Typography>Time Till Start: X</Typography>
      <Typography>Contract Start Date: X</Typography>
      <Typography>Contract Time Remaining: X</Typography>
    </Box>
  );
};

export const EndPanel: React.FC<unknown> = () => {
  return (
    <Box data-testid="ContractTime-Panel__EndTimeWrapper">
      <Typography>Time Till End: X</Typography>
      <Typography>Contract End Date: X</Typography>
    </Box>
  );
};
