import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import React from 'react';

import { CollapseMenu } from '@/Components/Orders/VerseMarket/CollapseMenu';
import { ItemDisplay } from '@/Components/Orders/VerseMarket/ItemDisplay';
import { OrderBrowser } from '@/Components/Orders/VerseMarket/OrderBrowser';

/**
 * ### VerseMarketPage
 * @summary
 * This is the main page for the VerseMarket. This is where users go to trade goods between each other and view current market values.
 * @version 0.1.0
 * @returns {JSX.Element}
 * #### Functional Components
 * @component {@link CollapseMenu}
 * @component {@link OrderBrowser}
 * @component {@link ItemDisplay}
 * #### Styled Components
 * @component {@link VLViewport}
 * @author ThreeCrown - Aug 2024
 */
export const VerseMarketPage: React.FC<unknown> = () => {
  return (
    <VLViewport
      data-testid="VerseMarketPage"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
      }}
    >
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
          data-testid="VerseMarket__MarketplaceWrapper"
          sx={{
            height: '100%',
            maxWidth: '90%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <OrderBrowser />
          <ItemDisplay />
        </Box>
      </Box>
    </VLViewport>
  );
};
