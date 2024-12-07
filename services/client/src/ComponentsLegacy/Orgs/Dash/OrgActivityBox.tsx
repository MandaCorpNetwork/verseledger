import GlassBox from '@CommonLegacy/Components/Boxes/GlassBox';
import { GlassDisplay } from '@CommonLegacy/Components/Boxes/GlassDisplay';
import { Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import React from 'react';

export const OrgActivityBox: React.FC = () => {
  return (
    <div>
      <GlassBox sx={{ p: '1em', gap: '1em' }}>
        <div style={{ display: 'flex', gap: '1em' }}>
          <GlassDisplay>
            <DateCalendar />
          </GlassDisplay>
          <GlassDisplay sx={{ p: '0.5em' }}>Date Itenerary:</GlassDisplay>
        </div>
        <GlassDisplay sx={{ minHeight: '100px' }}>
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
        </GlassDisplay>
      </GlassBox>
    </div>
  );
};
