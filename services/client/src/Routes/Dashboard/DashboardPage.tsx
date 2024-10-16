import { AppDock } from '@Common/Components/AppDock/AppDock';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardPage: React.FC<unknown> = () => {
  return (
    <VLViewport
      data-testid="PersonalLedgerPage"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: '1em',
        '&:after': {
          backgroundImage: `url(https://files.otakustudy.com/wp-content/uploads/2020/07/18150855/SC-Aeroview-Hangar-01.jpg)`,
        },
      }}
    >
      <Box
        data-testid="ToolDisplay"
        sx={{
          width: '100%',
          height: '90%',
          margin: { xs: '0', md: '1%' },
          padding: { xs: '0', md: '.5em' },
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
        <Outlet />
      </Box>
      <Box sx={{ mt: 'auto', mb: '1%' }}>
        <AppDock />
      </Box>
    </VLViewport>
  );
};
