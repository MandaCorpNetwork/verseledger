import { Button, Typography } from '@mui/material';
import React from 'react';

type ContractLedgerQuickNavProps = {
  title: string;
};

export const ContractLedgerQuickNav: React.FC<ContractLedgerQuickNavProps> = ({
  title,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        color: 'text.primary',
        width: '12em',
        height: '3em',
        bgcolor: 'primary.dark',
        marginLeft: '1em',
        '&:hover': {
          bgcolor: 'primary.main',
        },
        '&:active': {
          color: 'text.secondary',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '.9em',
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
