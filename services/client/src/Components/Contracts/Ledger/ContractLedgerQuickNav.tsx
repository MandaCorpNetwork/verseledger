import { Button } from '@mui/material';
import React from 'react';

type ContractLedgerQuickNavProps = {
  title: string;
  onClick: () => void;
  testid: string;
};

export const ContractLedgerQuickNav: React.FC<ContractLedgerQuickNavProps> = ({
  title,
  onClick,
  testid,
}) => {
  return (
    <Button
      data-testid={`QuickNav__${testid}Button`}
      variant="contained"
      onClick={onClick}
      size="small"
      color="secondary"
      sx={{ fontSize: '.7em', fontWeight: 'bold', mr: '.5em' }}
    >
      {title}
    </Button>
  );
};
