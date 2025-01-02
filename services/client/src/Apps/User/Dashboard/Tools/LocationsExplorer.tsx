import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { InDevOverlay } from '@CommonLegacy/Components/App/InDevOverlay';
import { Typography } from '@mui/material';
import { FeatureFlag } from '@Utils/Hooks/FeatureFlag';

/**
 * Miniature Location Exploration App for the User Dashboard
 * ___
 * ! Pending Explore App Work
 */
export const DashLocationExplorer: React.FC = () => {
  return (
    <FeatureFlag flag="F-explore">
      <FeatureContainer
        data-testid="DashboardApp__LocationExplorer_Container"
        aria-label="Small Location Explorer Tool for the Dashboard"
        id="DashboardLocationExplorer"
        sx={{
          padding: '1em',
        }}
      >
        <Typography variant="h6">Location Explorer</Typography>
        <InDevOverlay supportButton />
      </FeatureContainer>
    </FeatureFlag>
  );
};
