import { Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectOrgMembersByOrgId } from '@Redux/Slices/Orgs/orgs.selectors';
import type React from 'react';
import type {
  IOrganization,
  IOrganizationMemberWithUser,
  IOrganizationRank,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

import { MemberInvites } from './MemberInvites';
import { MemberRequests } from './MemberRequests';
import { MemberManagementList } from './MembersList';
import { RecentMemberManageList } from './RecentMembersList';

type MemberManagementProps = {
  org: IOrganization | null;
  ranks: IOrganizationRank[] | null;
};

export const MemberManagement: React.FC<MemberManagementProps> = ({ org, ranks }) => {
  const members = useAppSelector((state) =>
    org ? selectOrgMembersByOrgId(state, org.id) : null,
  );
  return (
    <div
      data-testid="OrgManager-PanelDisplay-Rank&Roles-Panel__MemberManagement_Wrapper"
      style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1em' }}
    >
      <div
        data-testid="OrgManager-PanelDisplay-MemberManagement__Title_Wrapper"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          data-testid="OrgManager-PanelDisplay-MemberManagement__Title"
          variant="h4"
          sx={{
            color: 'text.secondary',
            textShadow: '2px 2px 4px rgba(255,255,255,0.3)',
          }}
        >
          Manage Organization Members
        </Typography>
        <Typography
          data-testid="OrgManager-PanelDisplay-MemberManagement-Title__Description"
          variant="subtitle1"
          sx={{
            color: 'info.main',
            textShadow: '2px 2px 2px rgba(0,0,0,0.8)',
          }}
        >
          Check Join Requests, Invites, & Manage Member Information
        </Typography>
      </div>
      <div
        data-testid="OrgManager-PanelDisplay-MemberMangement__Pending_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
        }}
      >
        <MemberInvites />
        <MemberRequests />
      </div>
      <RecentMemberManageList />
      <MemberManagementList
        members={members ?? ([] as IOrganizationMemberWithUser[])}
        ranks={ranks ?? ([] as IOrganizationRank[])}
      />
    </div>
  );
};
