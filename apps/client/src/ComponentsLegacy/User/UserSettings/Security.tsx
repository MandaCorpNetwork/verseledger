import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { Grow, Typography } from '@mui/material';
import type React from 'react';

export const SecuritySettings: React.FC = () => {
  return (
    <Grow in={true} timeout={{ enter: 500, exit: 500 }}>
      <FeatureContainer sx={{ minHeight: '100%', minWidth: '100%' }}>
        <Typography>Security Settings</Typography>
      </FeatureContainer>
    </Grow>
  );
};
