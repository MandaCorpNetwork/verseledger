import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Typography } from '@mui/material';
import React from 'react';
import {
  IOrganizationMemberWithUser,
  IOrganizationRank,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

import { MemberBox } from './MemberBox';

type MemberManagementListProps = {
  members: IOrganizationMemberWithUser[];
  ranks: IOrganizationRank[];
};

export const MemberManagementList: React.FC<MemberManagementListProps> = ({
  members,
  ranks,
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
          <MemberBox key={member.id} member={member} ranks={ranks} />
        ))}
      </div>
    </GlassDisplay>
  );
};
