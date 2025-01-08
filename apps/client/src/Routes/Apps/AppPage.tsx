import { AppDisplay } from '@Common/Components/Core/Boxes/AppContainer';
import { VLViewport } from '@Common/Components/Core/Boxes/VLViewport';
import { MaskedVideo } from '@Common/Components/Functional/Applcation/Media/MaskedVideo';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

export const AppPage: React.FC<unknown> = () => {
  const theme = useTheme();
  const fidelity = React.useMemo(() => {
    return theme.fidelity;
  }, [theme.fidelity]);
  return (
    <VLViewport data-testid="AppViewerPage">
      <AppDisplay data-testid="AppViewerPage__AppDisplay_Container">
        {fidelity === 'high' && <MaskedVideo />}
        <Box
          data-testid="AppViewerPage__AppDisplay_Wrapper"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            zIndex: 1,
          }}
        >
          <Outlet />
        </Box>
        <div style={{ marginTop: '100px' }} />
      </AppDisplay>
    </VLViewport>
  );
};
