import { useSoundEffect } from '@Audio/AudioManager';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import TabListHolo from '@CommonLegacy/Components/Tabs/TabListHolo';
import { Tab } from '@mui/material';
import React from 'react';

import { OrgCalendarPanel } from './CalendarPanel';

export const OrgEventsBox: React.FC = () => {
  const [eventTab, setEventTab] = React.useState<'calendar' | 'contracts' | 'orders'>(
    'calendar',
  );
  const sound = useSoundEffect();

  const handleTabChange = React.useCallback(
    (value: 'calendar' | 'contracts' | 'orders') => {
      sound.playSound('clickMain');
      setEventTab(value);
    },
    [sound, setEventTab],
  );

  const renderPanel = React.useCallback(() => {
    switch (eventTab) {
      case 'calendar':
      case 'contracts':
      case 'orders':
      default:
        return <OrgCalendarPanel />;
    }
  }, [eventTab]);

  return (
    <FeatureDisplay
      data-testid="OrgPage__Events_Wrapper"
      sx={{ flexGrow: 1, p: '0.5em', gap: '1em' }}
    >
      <TabListHolo
        data-testid="OrgPage-Events__Tabs"
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        value={eventTab}
        onChange={(_e, value) => handleTabChange(value)}
        sx={{
          px: '1em',
        }}
      >
        <Tab
          data-testid="OrgPage-Events__Tab_Calendar"
          value="calendar"
          label="Calendar"
        />
        <Tab
          data-testid="OrgPage-Events__Tab_Contracts"
          value="contracts"
          label="Contracts"
          disabled
        />
        <Tab
          data-testid="OrgPage-Events__Tab_Orders"
          value="orders"
          label="Orders"
          disabled
        />
      </TabListHolo>
      {renderPanel()}
    </FeatureDisplay>
  );
};
