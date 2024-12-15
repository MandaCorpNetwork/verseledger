import { Button } from '@mui/material';
import type React from 'react';

type ClearAllButtonProps = {
  onClear: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  title?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  sx?: object;
};

export const ClearAllButton: React.FC<ClearAllButtonProps> = ({
  onClear,
  variant = 'outlined',
  title = 'Clear All',
  color = 'warning',
  size = 'small',
  sx,
}) => {
  return (
    <Button variant={variant} onClick={onClear} color={color} size={size} sx={{ ...sx }}>
      {title}
    </Button>
  );
};
