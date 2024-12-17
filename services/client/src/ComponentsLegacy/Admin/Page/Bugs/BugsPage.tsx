import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { ControlPanelBox } from '@Common/Components/Core/Boxes/ControlPanelBox';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

import { BugReport } from './BugReport';
import { BugStatsBar } from './BugStatsBar';

export const BugsPage: React.FC = () => {
  const [bugsTab, setBugsTab] = React.useState<string>('unread');
  const sound = useSoundEffect();
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      sound.playSound('clickMain');
      setBugsTab(newValue);
    },
    [sound],
  );
  return (
    <Box
      data-testid="AdminPage-Content__BugsPage_Container"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        p: '1em',
      }}
    >
      <Typography variant="h4" data-testid="AdminPage-Content__BugPage_Title">
        Bug Reports
      </Typography>
      <Box
        data-testid="AdminPage-Content-BugPage__Tabs_Container"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <ControlPanelBox
          data-testid="AdminPage-Content-BugPage__Tabs_Wrapped"
          sx={{ px: '.5em', py: '.2em' }}
        >
          <Tabs
            data-testid="dminPage-Content-BugPage__Tabs_Controller"
            value={bugsTab}
            onChange={handleTabChange}
            indicatorColor="secondary"
          >
            <Tab
              data-testid="AdminPage-Content-BugPage-Tabs__Recent_Tab"
              label="Unread"
              value="unread"
            />
            <Tab
              data-testid="AdminPage-Content-BugPage-Tabs__Confirmed_Tab"
              label="Confirmed"
              value="confirmed"
            />
            <Tab
              data-testid="AdminPage-Content-BugPage-Tabs__Assignments_Tab"
              label="My Assignments"
              value="assigned"
            />
            <Tab
              data-testid="AdminPage-Content-BugPage-Tabs__Completed_Tab"
              label="Completed Bugs"
              value="completed"
            />
            <Tab
              data-testid="AdminPage-Content-BugPage-Tabs__Ignored_Tab"
              label="Ignored"
              value="ignored"
            />
          </Tabs>
        </ControlPanelBox>
      </Box>
      <FeatureDisplay
        data-testid="AdminPage-Content-BugPage__Content_Wrapper"
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: '1em' }}
      >
        <ComponentContainer data-testid="AdminPage-Content-BugPage__Stats_Container">
          <BugStatsBar tab={bugsTab} count={5} />
        </ComponentContainer>
        <Box data-testid="AdminPage-Content-BugPage__List_Container" sx={{ p: '1em' }}>
          <BugReport />
        </Box>
      </FeatureDisplay>
    </Box>
  );
};
