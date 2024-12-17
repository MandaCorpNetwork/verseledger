import { useSoundEffect } from '@Audio/AudioManager';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import TabListHolo from '@CommonLegacy/Components/Tabs/TabListHolo';
import { Tab } from '@mui/material';
import React from 'react';

export const OrgJobsOverview: React.FC = () => {
  const [orgJobTab, setOrgJobTab] = React.useState<'contracts' | 'orders'>('contracts');
  const sound = useSoundEffect();

  const handleTabChange = React.useCallback(
    (_e: React.SyntheticEvent, newValue: 'contracts' | 'orders') => {
      sound.playSound('clickMain');
      setOrgJobTab(newValue);
    },
    [sound],
  );
  return (
    <FeatureDisplay sx={{ p: '1em' }}>
      <TabListHolo
        value={orgJobTab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        sx={{ px: '0.5em' }}
      >
        <Tab label="Contracts" value="contracts" />
        <Tab label="Orders" value="orders" disabled />
      </TabListHolo>
      <div style={{ marginTop: '5px' }}>Contract Accordian Display</div>
    </FeatureDisplay>
  );
};
