import '@Assets/Css/scrollbar.css';

import { Grid2 } from '@mui/material';
// import { useParams } from 'react-router-dom';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

import { OrgCard } from './OrgCard';

type OrgCardDisplayProps = {
  orgs: IOrganization[];
};

export const OrgCardDisplay: React.FC<OrgCardDisplayProps> = ({ orgs }) => {
  // const { selectedOrgId } = useParams();
  return (
    <div
      style={{ flexGrow: 1, display: 'flex', width: '100%', overflowY: 'auto' }}
      className="VerseOS-Scroll"
    >
      <Grid2
        container
        data-testid="AppList__ListContainer"
        rowGap={4}
        sx={{
          display: 'grid',
          alignContent: 'flex-start',
          px: '1em',
          pt: '1em',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          width: '100%',
          justifyItems: 'stretch',
        }}
      >
        {orgs.map((org) => (
          <Grid2
            key={org.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrgCard organization={org} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};
