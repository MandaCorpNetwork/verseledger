import MandaLogo from '@Assets/media/MandaLogo.png';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import type { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type OrgCardProps = {
  organization: IOrganization;
};

export const OrgCard: React.FC<OrgCardProps> = ({ organization }) => {
  const navigate = useNav();
  const handleOrgSelect = React.useCallback(
    (e: React.MouseEvent) => {
      const url = `/orgs/finder/${organization.id}`;
      navigate(url, 'internal', false).onClick(e);
    },
    [navigate, organization.id],
  );

  return (
    <Card
      onClick={(e) => handleOrgSelect(e)}
      onAuxClick={(e) => handleOrgSelect(e)}
      sx={{
        p: '0.5em',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: '0.5em',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.2em',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '65px',
              height: '65px',
              poisition: 'relative',
              display: 'flex',
              backgroundImage: `url(${MandaLogo})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <Typography variant="caption">Members:</Typography>
          <Typography variant="caption">Activity:</Typography>
          <Typography variant="caption">Rating:</Typography>
        </div>
        <Divider orientation="vertical" variant="fullWidth" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1">{organization.title}</Typography>
          <Typography variant="body2">{organization.rsi_handle}</Typography>
          <Typography variant="caption">Description of the Organization.</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
