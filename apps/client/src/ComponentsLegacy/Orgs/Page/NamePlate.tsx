import MandaLogo from '@Assets/media/MandaLogo.png';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Divider, Typography } from '@mui/material';
import type React from 'react';
import type { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type OrgNamePlateProps = {
  organization: IOrganization;
};

export const OrgNamePlate: React.FC<OrgNamePlateProps> = ({ organization: org }) => {
  return (
    <FeatureDisplay
      data-testid="OrgPage__NamePlate_Wrapper"
      sx={{ flexDirection: 'row', minHeight: '150px', minWidth: '340px', p: '0.5em' }}
    >
      <div
        data-testid="OrgPage-NamePlate__Logo"
        style={{
          width: '100px',
          height: '100px',
          position: 'relative',
          display: 'flex',
          backgroundImage: `url(${MandaLogo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          alignSelf: 'center',
          marginRight: '1em',
        }}
      />
      <Divider
        orientation="vertical"
        sx={{ height: '80%', my: 'auto', opacity: '0.5', borderRightWidth: '2px' }}
      />
      <div
        data-testid="OrgPage-NamePlate__Text_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          flexGrow: 1,
          padding: '1em 0',
        }}
      >
        <Typography
          data-testid="OrgPage-NamePlate__Title"
          variant="body1"
          sx={{
            fontWeight: 'bold',
            cursor: 'default',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {org?.title}
        </Typography>
        <Typography
          data-testid="OrgPage-NamePlate__Handle"
          variant="body2"
          sx={{ fontWeight: 'bold', cursor: 'default' }}
        >
          {org?.rsi_handle}
        </Typography>
        <div data-testid="OrgPage-NamePlate__Spacer" style={{ flexGrow: 1 }} />
        <Typography
          data-testid="OrgPage-NamePlate__MemberCount"
          variant="caption"
          sx={{ cursor: 'default' }}
        >
          Members:
        </Typography>
        <Typography
          data-testid="OrgPage-NamePlate__Activity_Header"
          variant="caption"
          sx={{ cursor: 'default' }}
        >
          Activity:
        </Typography>
        <Typography
          data-testid="OrgPage-NamePlate__Rating_Header"
          variant="caption"
          sx={{ cursor: 'default' }}
        >
          Rating:
        </Typography>
      </div>
    </FeatureDisplay>
  );
};
