import { Box, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type DigiFieldProps = PropsWithChildren<{
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children?: unknown;
}>;

const DigiFieldComponent: React.FC<DigiFieldProps> = (props) => {
  const { label, startAdornment, endAdornment, children } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(8,22,80,.8)',
        py: '2px',
        px: '5px',
        borderRadius: '5px',
        color: 'text.secondary',
        boxShadow: '0 2px 5px rgba(0,0,0,.3)',
        border: '1px solid',
        borderColor: 'primary.dark',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 10px rgba(0,0,0,.3)',
          backdropFilter: 'blur(10px)',
          color: 'secondary.main',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '.7em',
          color: 'inherit',
          transition: 'all 0.1s ease-in-out',
          cursor: 'default',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {startAdornment}
        <Typography sx={{ color: 'text.primary' }}>{children}</Typography>
        {endAdornment}
      </Box>
    </Box>
  );
};

export const DigiField = React.memo(DigiFieldComponent);
