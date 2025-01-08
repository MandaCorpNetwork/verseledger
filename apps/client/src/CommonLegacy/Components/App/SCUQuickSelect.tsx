import { Box, Button, Typography } from '@mui/material';
import type React from 'react';

//TODO: Fix Render Continuity Issues
type SCUQuickSelect = {
  onClick: (value: number) => void;
  size?: 'small' | 'medium' | 'large';
  sx?: object;
  value?: number;
  slotProps?: {
    text?: {
      sx?: object;
    };
    buttons?: {
      sx?: object;
    };
  };
};

export const SCUQuickSelect: React.FC<SCUQuickSelect> = ({
  onClick,
  size: buttonSize = 'small',
  sx,
  slotProps,
  value,
}) => {
  return (
    <Box
      sx={{
        px: '5px',
        py: '5px',
        gap: '0.5em',
        display: 'flex',
        flexDirection: 'row',
        ...sx,
      }}
    >
      {[0.125, 1, 2, 4, 8, 16, 24, 32].map((size) => {
        const isCurrent = value === size;
        return (
          <Button
            key={size}
            size={buttonSize}
            variant="outlined"
            onClick={() => onClick(size)}
            sx={[
              { gap: '.5em', ...slotProps?.buttons?.sx },
              {
                transition:
                  'border-color 0.3s ease, background-image 0.3s ease,  box-shadow 0.3s ease, transform 0.3s ease, color 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              },
              {
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderColor: 'text.secondary',
                backgroundImage:
                  'linear-gradient(135deg, rgba(14,35,141,0.5), rgba(8,22,80,0.3))',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'secondary.main',
                  backgroundImage:
                    'linear-gradient(135deg, rgba(14,35,141,0.7), rgba(8,22,80,0.5))',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  color: 'text.primary',
                },
              },
              isCurrent && {
                borderColor: 'success.main',
                backgroundImage:
                  'linear-gradient(135deg, rgba(8,201,11,0.5), rgba(14,140,11,0.3))',
                boxShadow:
                  '0 0 5px rgba(8, 201, 11, 0.4), 0 0 10px rgba(8, 201, 11, 0.2), 0 0 15px rgba(8, 201, 11, 0.15)',
                color: 'secondary.main',
                '&:hover': {
                  borderColor: 'success.light',
                  backgroundImage:
                    'linear-gradient(135deg, rgba(8,201,11,0.7), rgba(14,140,11,0.5))',
                  color: 'secondary.light',
                },
              },
            ]}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                ...slotProps?.text?.sx,
              }}
            >
              {size === 0.125 ? '1/8' : size}
              {` SCU`}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};
