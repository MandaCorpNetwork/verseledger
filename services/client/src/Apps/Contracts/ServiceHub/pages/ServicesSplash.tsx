import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Button, Typography } from '@mui/material';
import type React from 'react';

/**
 * @description A Splash Menu for selecting different views for the Service Hub Application
 * ___
 * TODO:
 * Create Modular Section Buttons
 */
export const ServicesSplash: React.FC = () => {
  return (
    <FeatureDisplay
      aria-label="Service Hub Page Navigation"
      id="ServiceHub__NavContainer"
      data-testid="ServiceHub__NavContainer"
    >
      <Typography
        aria-labelledby="ServiceHub__NavContainer"
        data-testid="ServiceHub-NavContainer__Label"
        variant="h3"
      >
        Service Request Hub
      </Typography>
      <Typography>Service Requests</Typography>
      <Typography>Active Contractors</Typography>
      <Button color="secondary">Create Service Request</Button>
    </FeatureDisplay>
  );
};
