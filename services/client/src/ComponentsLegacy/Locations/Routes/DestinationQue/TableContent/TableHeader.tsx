import { Grid2, Typography, useMediaQuery } from '@mui/material';
import type React from 'react';

export const TableHeader: React.FC = () => {
  const hideReason = useMediaQuery('(max-width: 1200px)');
  const hideTasks = useMediaQuery('(max-width: 1090px)');
  const headerStyle = {
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: 'text.secondary',
    cursor: 'default',
    textShadow:
      '0px 0px 8px rgba(24,252,252,0.5), 0px 0px 15px rgba(24,252,252,0.4), 2px 2px 8px rgba(0,0,0,0.6)',
    letterSpacing: 0.5,
  };
  return (
    <Grid2
      direction="row"
      container
      columns={12}
      sx={{
        width: '100%',
      }}
    >
      <Grid2 size={4}>
        <Typography sx={[{ ml: '5%' }, headerStyle]}>Destination</Typography>
      </Grid2>
      {!hideReason && (
        <Grid2 size="grow" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={[{ mr: '22%' }, headerStyle]}>Stop Reason</Typography>
        </Grid2>
      )}
      {!hideTasks && (
        <Grid2 size="grow">
          <Typography sx={[{ ml: '10%' }, headerStyle]}>Task Count</Typography>
        </Grid2>
      )}
      <Grid2 size={1} offset="auto">
        <Typography sx={[{ mr: '5%' }, headerStyle]}>Distance</Typography>
      </Grid2>
    </Grid2>
  );
};
