import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { CardorTableViewToggle } from '@CommonLegacy/Components/Buttons/TorCToggle';
import { TextField, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectOrgs } from '@Redux/Slices/Orgs/orgs.selectors';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

import { OrgCardDisplay } from './OrgCardDisplay';
import { PaginationAnchor } from './PaginationAnchor';

export const OrgFinder: React.FC = () => {
  const isMobile = useIsMobile();
  const [view, setView] = React.useState<'card' | 'table'>('card');
  const orgList = useAppSelector(selectOrgs);
  return (
    <FeatureContainer sx={{ gap: '1em', width: '90%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <Typography>Search Orgs</Typography>
        <TextField size="small" />
        <div style={{ marginLeft: 'auto' }}>
          <CardorTableViewToggle onChange={setView} view={view} disabled />
        </div>
      </div>
      <FeatureDisplay
        sx={{
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          m: '5px',
        }}
      >
        {view === 'card' && <OrgCardDisplay orgs={orgList} />}
        <PaginationAnchor isMobile={isMobile} />
      </FeatureDisplay>
    </FeatureContainer>
  );
};
