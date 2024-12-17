import { Box } from '@mui/material';
import { FeatureFlag } from '@Utils/Hooks/FeatureFlag';
import type React from 'react';

export const ServiceHubApp: React.FC = () => {
  return (
    <FeatureFlag flag="F_services">
      <Box>Testing</Box>
    </FeatureFlag>
  );
};
