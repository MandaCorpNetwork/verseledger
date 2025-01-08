import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import type React from 'react';

export const OrgActivityBox: React.FC = () => {
  return (
    <div>
      <FeatureContainer sx={{ p: '1em', gap: '1em' }}>
        <div style={{ display: 'flex', gap: '1em' }}>
          <FeatureDisplay>
            <DateCalendar />
          </FeatureDisplay>
          <FeatureDisplay sx={{ p: '0.5em' }}>Date Itenerary:</FeatureDisplay>
        </div>
        <FeatureDisplay sx={{ minHeight: '100px' }}>
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
        </FeatureDisplay>
      </FeatureContainer>
    </div>
  );
};
