import { useSoundEffect } from '@Audio/AudioManager';
import { Box, Tab, Tabs } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import React from 'react';

import { FlatRateTab, PoolTab, TimedRateTab } from './PayInfoDisplays';

export const POPUP_PAY_STRUCTURES = 'payStructures';

export const PayStructuresPopup: React.FC = () => {
  const [payTypeTab, setPayTypeTab] = React.useState('flat');
  const sound = useSoundEffect();

  const handlePayTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    sound.playSound('clickMain');
    setPayTypeTab(newValue);
  };

  const renderTab = (tab: string) => {
    switch (tab) {
      case 'flat':
        return <FlatRateTab />;
      case 'pool':
        return <PoolTab />;
      case 'timed':
        return <TimedRateTab />;
      default:
        return;
    }
  };

  return (
    <VLPopup name={POPUP_PAY_STRUCTURES} title="Pay Structures">
      <Box
        data-testid="PayStructure-Popup__Wrapper"
        sx={{
          minWidth: '400px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box>
          <Tabs
            value={payTypeTab}
            textColor="secondary"
            indicatorColor="secondary"
            orientation="vertical"
            onChange={handlePayTabChange}
          >
            <Tab label="Flat Rate" value="flat" />
            <Tab label="Pool" value="pool" />
            <Tab label="Timed Rate" value="timed" />
            <Tab label="Participation Pool" value="partPool" disabled />
            <Tab label="Stepped Flat Rate" value="stepFlat" disabled />
            <Tab label="Weighted Pool" value="weightPool" disabled />
            <Tab label="Weighted Timed Rate" value="weightTime" disabled />
          </Tabs>
        </Box>
        <Box data-testid="PayStructure-TabDisplay__Wrapper" sx={{ ml: '1em' }}>
          {renderTab(payTypeTab)}
        </Box>
      </Box>
    </VLPopup>
  );
};
