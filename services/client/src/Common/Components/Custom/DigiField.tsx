import { Box, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type DigiFieldProps = PropsWithChildren<{
  ['data-testid']?: string;
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children?: unknown;
  sx?: object;
  slots?: {
    label?: {
      sx?: object;
    };
    content?: {
      sx?: object;
    };
    typography?: {
      sx?: object;
    };
  };
}>;

const DigiFieldComponent: React.FC<DigiFieldProps> = (props) => {
  const {
    label,
    startAdornment,
    endAdornment,
    children,
    sx,
    slots,
    'data-testid': testid = 'infoField',
  } = props;
  return (
    <Box
      data-testid={`DigiField-${testid}-root`}
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
        ...sx,
      }}
    >
      <Typography
        data-testid={`DigiField-${testid}-label`}
        sx={{
          fontSize: '.7em',
          color: 'inherit',
          transition: 'all 0.1s ease-in-out',
          cursor: 'default',
          ...slots?.label?.sx,
        }}
      >
        {label}
      </Typography>
      <Box
        data-testid={`DigiField-${testid}-content`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...slots?.content?.sx,
        }}
      >
        <div data-testid={`DigiField-${testid}-startAdornment`}>{startAdornment}</div>
        <Typography
          data-testid={`DigiField-${testid}-children`}
          sx={{ color: 'text.primary', ...slots?.typography?.sx }}
        >
          {children}
        </Typography>
        <div data-testid={`DigiField-${testid}-endAdornment`}>{endAdornment}</div>
      </Box>
    </Box>
  );
};

export const DigiField = React.memo(DigiFieldComponent);
