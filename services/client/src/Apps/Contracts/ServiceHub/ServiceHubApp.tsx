import { Box, Typography } from '@mui/material';
import { FeatureFlag } from '@Utils/Hooks/FeatureFlag';
import type React from 'react';

export const ServiceHubApp: React.FC = () => {
  return (
    <FeatureFlag flag="F-services">
      <Box>
        <Typography variant="h1" color="error">
          Testing
        </Typography>
      </Box>
    </FeatureFlag>
  );
};
