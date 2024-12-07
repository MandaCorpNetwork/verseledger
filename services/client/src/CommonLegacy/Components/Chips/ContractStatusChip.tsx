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
      case 'PENDING':
        return 'warning';
      case 'INPROGRESS':
        return 'info';
      case 'COMPLETE':
        return 'success';
      case 'CANCELED':
        return 'error';
      case 'BIDDING':
      default:
        return 'primary';
    }
  }, [status]);

  const statusChipStyle = React.useCallback(() => {
    if (variant === 'outlined') return {};
    switch (status) {
      case 'BIDDING':
        return {
          background:
            'linear-gradient(45deg, rgba(12,35,141) 50%, rgba(33,150,243,.8) 90% )',
          color: 'text.primary',
          textShadow: '0 0 6px rgba(24,252,252,0.5), 0 0 3px rgba(0,0,0)',
          boxShadow:
            '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19), inset 0 1px 3px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)',
          border: '1px solid rgba(24,252,252,0.5)',
        };
      case 'INPROGRESS':
        return {
          background:
            'linear-gradient(45deg, rgba(255,141,15) 50%, rgba(255,193,0) 90% )',
          color: 'black',
          textShadow: '0 0 6px rgba(252,252,252,0.5), 0 0 3px rgba(0,0,0)',
          boxShadow:
            '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19), inset 0 1px 3px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,0,8,0.5)',
        };
      case 'COMPLETED':
        return {
          background: 'linear-gradient(45deg, rgba(8,201,11) 50%, rgba(8,165,0) 90% )',
          color: 'primary.contrastText',
          textShadow: '0 0 6px rgba(252,252,252,0.5), 0 0 3px rgba(0,0,0)',
          boxShadow:
            '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19), inset 0 1px 3px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)',
          border: '1px solid rgba(8,252,0,0.5)',
        };
      case 'CANCELED':
        return {
          background:
            'linear-gradient(45deg, rgba(255,0,8) 50%, rgba(252,176,0,.8) 90% )',
          color: 'primary.contrastText',
          textShadow: '0 0 6px rgba(252,252,252,0.5), 0 0 3px rgba(0,0,0)',
          boxShadow:
            '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19), inset 0 1px 3px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)',
          border: '1px solid rgba(200,0,8,0.5)',
        };
      default:
        return {};
    }
  }, [status, variant]);

  const statusColor = statusChipColor();
  const customStyle = statusChipStyle();
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
        sx={{ cursor: 'default', ...sx, ...customStyle }}
      />
    </>
  );
};
