import { Chip } from '@mui/material';
import React from 'react';

type ContractStatusChipProps = {
  status: string;
};

export const ContractStatusChip: React.FC<ContractStatusChipProps> = ({ status }) => {
  // Defines the color for the Status Chip
  const statusChipColor = React.useCallback(() => {
    if (status == 'BIDDING') {
      return 'secondary';
    } else if (status == 'STARTED') {
      return 'info';
    } else if (status == 'COMPLETE') {
      return 'success';
    } else if (status == 'CANCELED') {
      return 'error';
    } else {
      return 'primary';
    }
  }, [status]);

  const statusColor = statusChipColor();
  return (
    <>
      <Chip
        data-testid="ContractBid-ContractDetails-ContractStatus__StatusChip"
        label={status.charAt(0) + status.slice(1).toLowerCase()}
        color={statusColor}
        size="small"
        sx={{ cursor: 'default' }}
      />
    </>
  );
};
