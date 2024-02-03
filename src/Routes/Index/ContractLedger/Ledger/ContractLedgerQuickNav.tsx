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
      sx={{
        color: 'text.primary',
        width: '12em',
        height: '3em',
        border: '5px ridge',
        borderColor: 'primary.dark',
        borderRadius: '.4em',
        bgcolor: 'primary.dark',
        marginLeft: '1em',
        '&:hover': {
          borderColor: 'primary.light',
        },
        '&:active': {
          color: 'text.secondary',
          borderColor: 'primary.main',
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
