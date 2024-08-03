import { Chip } from '@mui/material';
import React from 'react';

type ContractStatusChipProps = {
  status: string;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  sx?: object;
  ['data-testid']?: string;
};

export const ContractStatusChip: React.FC<ContractStatusChipProps> = (props) => {
  const {
    status,
    size = 'small',
    variant = 'filled',
    sx,
    'data-testid': testid = 'Chip',
  } = props;
  // Defines the color for the Status Chip
  const statusChipColor = React.useCallback(() => {
    switch (status) {
      case 'BIDDING':
        return 'primary';
      case 'INPROGRESS':
        return 'info';
      case 'COMPLETE':
        return 'success';
      case 'CANCELED':
        return 'error';
      default:
        return 'primary';
    }
  }, [status]);

  const statusColor = statusChipColor();
  return (
    <>
      <Chip
        data-testid={`ContractStatusChip__${testid}_root`}
        label={
          status === 'INPROGRESS'
            ? 'In Progress'
            : status.charAt(0) + status.slice(1).toLowerCase()
        }
        color={statusColor}
        size={size}
        variant={variant}
        sx={{ cursor: 'default', ...sx }}
      />
    </>
  );
};
