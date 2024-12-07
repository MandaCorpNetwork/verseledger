import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppPage: React.FC<unknown> = () => {
  return (
    <VLViewport
      data-testid="AppViewerPage"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        data-testid="AppViewerPage__AppDisplay_Container"
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          flexGrow: 1,
          m: { xs: '0', md: '1%' },
          p: { xs: '0', md: '0.5em', lg: '1em' },
          overflowY: { xs: 'auto', md: 'hidden' },
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
      >
        <Box
          data-testid="AppViewerPage__AppDisplay_Wrapper"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
        <div style={{ marginTop: '100px' }} />
      </Box>
    </VLViewport>
  );
};
