import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

import { BugStatsBar } from './BugStatsBar';

export const BugsPage: React.FC = () => {
  const [bugsTab, setBugsTab] = React.useState<string>('recent');
  const { playSound } = useSoundEffect();
  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      playSound('clickMain');
      setBugsTab(newValue);
    },
    [playSound, setBugsTab],
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
          <Tabs data-testid="dminPage-Content-BugPage__Tabs_Controller" value={bugsTab}>
            <Tab
              data-testid="AdminPage-Content-BugPage-Tabs__Recent_Tab"
              label="Recent"
              value="recent"
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
      <GlassDisplay
        data-testid="AdminPage-Content-BugPage__Content_Wrapper"
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: '1em' }}
      >
        <DigiBox data-testid="AdminPage-Content-BugPage__Stats_Container">
          <BugStatsBar tab={bugsTab} />
        </DigiBox>
      </GlassDisplay>
    </Box>
  );
};
