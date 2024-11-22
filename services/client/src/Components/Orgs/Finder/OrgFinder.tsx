import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { CardorTableViewToggle } from '@Common/Components/Buttons/TorCToggle';
import { TextField, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectOrgsArray } from '@Redux/Slices/Orgs/orgs.selectors';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

import { OrgCardDisplay } from './OrgCardDisplay';
import { PaginationAnchor } from './PaginationAnchor';

export const OrgFinder: React.FC = () => {
  const isMobile = useIsMobile();
  const [view, setView] = React.useState<'card' | 'table'>('card');
  const orgList = useAppSelector((state) => selectOrgsArray(state));
  return (
    <GlassBox sx={{ gap: '1em', width: '90%' }}>
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
          <CardorTableViewToggle onChange={setView} view={view} />
        </div>
      </div>
      <GlassDisplay
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
      </GlassDisplay>
    </GlassBox>
  );
};
