import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Box } from '@mui/material';
import React from 'react';

import { CollapseMenu } from '@/Components/Orders/VerseMarket/CollapseMenu';
import { ItemDisplay } from '@/Components/Orders/VerseMarket/ItemDisplay';
import { OrderBrowser } from '@/Components/Orders/VerseMarket/OrderBrowser';

export const VerseMarketPage: React.FC<unknown> = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleDrawerOpen = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedTab, setSelectedTab] = React.useState('market');
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

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
        <CollapseMenu
          isExpanded={isExpanded}
          handleDrawerOpen={handleDrawerOpen}
          handleTabChange={handleTabChange}
          selectedTab={selectedTab}
        />
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
