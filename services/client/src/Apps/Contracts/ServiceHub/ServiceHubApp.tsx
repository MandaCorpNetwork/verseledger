import { Box } from '@mui/material';
import { FeatureFlag } from '@Utils/Hooks/FeatureFlag';
import type React from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router';

import { ServicesSplash } from './pages/ServicesSplash';

/**
 * @description Service Hub Application for Ship Service Contracts.
 * Provides a very focused view of Contracts
 */
export const ServiceHubApp: React.FC = () => {
  /** Hooks */
  const { page } = useParams();

  const renderFeature = useCallback(() => {
    switch (page) {
      // case 'requestsRearm':
      // case 'requestsRepair':
      // case 'requestsMulti':
      // case 'contractorsRefuel':
      // case 'contractorsRearm':
      // case 'contractorsRepair':
      // case 'contractorsMulti':
      // case 'contractors':
      // case 'requests':
      case 'requestsRefuel':
      default:
        return <ServicesSplash />;
    }
  }, [page]);

  return (
    <FeatureFlag flag="F-services">
      <Box
        component="section"
        aria-label="Services Hub Application"
        id="ServiceHub__AppContainer"
        data-testid="ServiceHub__AppContainer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          padding: '1em',
        }}
      >
        {renderFeature()}
      </Box>
    </FeatureFlag>
  );
};
