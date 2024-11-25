import { Box } from '@mui/material';
import React from 'react';

export const WikiDisplay: React.FC = () => {
  return (
    <Box
      data-testid="WikiPage__Display"
      sx={{
        height: '90%',
        width: '80%',
        display: 'flex',
        m: 'auto',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderRadius: '10px',
        borderColor: 'secondary.main',
        borderLeft: '1px solid rgba(14,49,141,0.5)',
        borderRight: '1px solid rgba(14,49,141,0.5)',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(14,49,141,.8)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(0,30,100,0.2)',
        padding: '.5em',
        '&::-webkit-scrollbar': {
          width: '5px',
          height: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgb(0,73,130)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          background: 'rgb(24,252,252)',
        },
      }}
    ></Box>
  );
};
