import { TextField, Tooltip } from '@mui/material';
import React from 'react';

type TimeFieldProps = {
  label: string;
  value?: string | number;
  sx?: object;
};

export const ReadOnlyField: React.FC<TimeFieldProps> = ({ label, sx, value }) => {
  return (
    <Tooltip title={label} arrow>
      <TextField
        label={label}
        value={value ?? ''}
        size="small"
        color="secondary"
        InputProps={{ readOnly: true }}
        sx={{ width: '10em', margin: '.5em', ...sx }}
      />
    </Tooltip>
  );
};
