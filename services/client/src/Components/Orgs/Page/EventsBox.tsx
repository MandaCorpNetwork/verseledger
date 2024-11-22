import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import TabListHolo from '@Common/Components/Tabs/TabListHolo';
import { Tab, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import React from 'react';

export const OrgEventsBox: React.FC = () => {
  return (
    <GlassDisplay
      data-testid="OrgPage__Events_Wrapper"
      sx={{ flexGrow: 1, p: '0.5em', gap: '1em' }}
    >
      <TabListHolo
        data-testid="OrgPage-Events__Tabs"
        indicatorColor="secondary"
        variant="fullWidth"
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
        />
        <Tab data-testid="OrgPage-Events__Tab_Orders" value="orders" label="Orders" />
      </TabListHolo>
      <DigiBox sx={{ flexGrow: 1, alignItems: 'center', gap: '2em' }}>
        <DigiDisplay style={{ flexDirection: 'row', width: 'fit-content' }}>
          <DateCalendar />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography>Date Itenerary:</Typography>
          </div>
        </DigiDisplay>
        <DigiDisplay sx={{ p: '0.5em 1em', width: '90%' }}>
          <Typography variant="h6" align="center">
            News
          </Typography>
          <Typography
            align="center"
            color="textDisabled"
            sx={{ fontWeight: 'bold', textShadow: '0 2px 2px rgba(0,0,0)' }}
          >
            No News
          </Typography>
        </DigiDisplay>
      </DigiBox>
    </GlassDisplay>
  );
};
