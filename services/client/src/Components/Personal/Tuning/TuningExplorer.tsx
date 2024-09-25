import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Tab, Tabs } from '@mui/material';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

export const TuningExplorer: React.FC = () => {
  const [tab, setTab] = React.useState<'saved' | 'discover'>('saved');
  const { playSound } = useSoundEffect();
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: 'saved' | 'discover') => {
      playSound('clickMain');
      setTab(value);
    },
    [setTab, playSound],
  );
  return (
    <GlassBox sx={{ p: '1em' }}>
      <ControlPanelBox>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          color="secondary"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Saved Presets" value="saved" />
          <Tab label="Discover Presets" value="discover" />
        </Tabs>
      </ControlPanelBox>
    </GlassBox>
  );
};
