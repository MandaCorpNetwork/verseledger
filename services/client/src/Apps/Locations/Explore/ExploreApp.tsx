import { Typography } from '@mui/material';
import { FeatureFlag } from '@Utils/Hooks/FeatureFlag';

/**
 * Exploration App for Viewing Player's known Locations, Adding Locations, and utilizing the personal Map tool
 * ___
 * TODO:
 * - Search Location Component
 * - Location Details Display
 * - Nearby Locations Component
 * - Nearby Players Component
 * - Explore Control Panel
 * - Explore Map
 * - User State
 * - Everything else.....
 * [Explore App Plan](https://mandacorp-network.atlassian.net/wiki/spaces/VL/whiteboard/18350084)
 * ___
 * ! Waiting on New System for Local DB
 *
 * ! Waiting on New Location Data Structure
 */
export const ExploreApp: React.FC = () => {
  return (
    <FeatureFlag flag="F-explore">
      <Typography>Fuel the Jet, Fuel the Jet, Fuel the Jet</Typography>
    </FeatureFlag>
  );
};
