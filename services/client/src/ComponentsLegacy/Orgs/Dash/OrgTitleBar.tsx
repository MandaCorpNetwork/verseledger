import MandaLogo from '@Assets/media/MandaLogo.png';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type OrgTitleProps = {
  org: IOrganization;
};

export const OrgTitleBar: React.FC<OrgTitleProps> = ({ org }) => {
  return (
    <FeatureDisplay
      sx={{ p: '0.5em 1em', flexDirection: 'row', minWidth: '320px', gap: '2em' }}
    >
      <div style={{ display: 'flex', gap: '0.5em' }}>
        <Box
          sx={{
            width: '80px',
            height: '80px',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              backgroundImage: `url(${MandaLogo})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-end' }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', textShadow: '0 2px 2px rgba(0,0,0)' }}
          >
            {org.title}
          </Typography>
          <Typography variant="subtitle2" color="info">
            {org.rsi_handle}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-end',
          flexDirection: 'column',
          textAlign: 'right',
        }}
      >
        <Typography variant="caption">Members: 363</Typography>
        <Typography variant="caption">
          Activity: <Typography variant="caption">Low</Typography>
        </Typography>
      </div>
    </FeatureDisplay>
  );
};
