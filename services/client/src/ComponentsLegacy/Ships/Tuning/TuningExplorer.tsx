import { useSoundEffect } from '@Audio/AudioManager';
import { InDevOverlay } from '@CommonLegacy/Components/App/InDevOverlay';
import { ControlPanelBox } from '@CommonLegacy/Components/Boxes/ControlPanelBox';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { Tab, Tabs } from '@mui/material';
import React from 'react';

export const TuningExplorer: React.FC = () => {
  const [tab, setTab] = React.useState<'saved' | 'discover'>('saved');
  const sound = useSoundEffect();
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: 'saved' | 'discover') => {
      sound.playSound('clickMain');
      setTab(value);
    },
    [setTab, sound],
  );
  return (
    <FeatureContainer sx={{ p: '1em' }}>
      <InDevOverlay />
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
    </FeatureContainer>
  );
};
