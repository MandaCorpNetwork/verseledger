import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Typography } from '@mui/material';
import React from 'react';
import {
  IOrganizationMemberWithUser,
  IOrganizationRole,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

import { MemberBox } from './MemberBox';

type MemberManagementListProps = {
  members: IOrganizationMemberWithUser[];
  roles: IOrganizationRole[];
};

export const MemberManagementList: React.FC<MemberManagementListProps> = ({
  members,
  roles,
}) => {
  return (
    <GlassDisplay
      data-testid="OrgManager-PanelDisplay-MemberManagement__MemberList_Wrapper"
      sx={{ p: '0.5em 1em' }}
    >
      <div>
        <Typography variant="h6">Members</Typography>
      </div>
      <div>Search & Filter</div>
      <div>
        {members.map((member) => (
          <MemberBox key={member.id} member={member} roles={roles} />
        ))}
      </div>
    </GlassDisplay>
  );
};
