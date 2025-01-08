import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Typography } from '@mui/material';
import type React from 'react';
import type {
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
    <FeatureDisplay
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
    </FeatureDisplay>
  );
};
