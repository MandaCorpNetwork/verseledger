import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Typography } from '@mui/material';
import type React from 'react';

export const OnlineMembers: React.FC = () => {
  return (
    <FeatureDisplay>
      <Typography variant="h6" align="center">
        Online Members:
      </Typography>
    </FeatureDisplay>
  );
};
