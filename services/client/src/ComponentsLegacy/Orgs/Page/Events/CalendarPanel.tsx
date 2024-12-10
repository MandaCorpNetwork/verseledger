import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import React from 'react';

export const OrgCalendarPanel: React.FC = () => {
  return (
    <ComponentContainer sx={{ flexGrow: 1, alignItems: 'center', gap: '2em' }}>
      <ComponentDisplay style={{ flexDirection: 'row', width: 'fit-content' }}>
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
      </ComponentDisplay>
      <ComponentDisplay sx={{ p: '0.5em 1em', width: '90%' }}>
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
      </ComponentDisplay>
    </ComponentContainer>
  );
};
