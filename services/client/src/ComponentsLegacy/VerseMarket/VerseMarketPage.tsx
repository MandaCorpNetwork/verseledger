import { InDevOverlay } from '@CommonLegacy/Components/App/InDevOverlay';
import { VLViewport } from '@CommonLegacy/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import { isDev } from '@Utils/isDev';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { CollapseMenu } from './CollapseMenu';

/**
 * ### VerseMarketPage
 * @summary
 * This is the main page for the VerseMarket. This is where users go to trade goods between each other and view current market values.
 * #### Functional Components
 * @component {@link CollapseMenu}
 * @component {@link ItemBrowser}
 * @component {@link ItemDisplay}
 * #### Styled Components
 * @component {@link VLViewport}
 */
export const VerseMarketPage: React.FC = () => {
  const dev = isDev();
  return (
    <VLViewport
      data-testid="VerseMarketPage"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {!dev && <InDevOverlay supportButton={true} />}
      <Box
        data-testid="VerseMarket__Wrapper"
        sx={{
          py: '1em',
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <CollapseMenu />
        <Box
          data-testid="VerseMarket__Outlet_Wrapper"
          sx={{
            height: '100%',
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </VLViewport>
  );
};
