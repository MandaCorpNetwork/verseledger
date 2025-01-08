import { useAppSelector } from '@Redux/hooks';
import { selectUserMembershipByOrgId } from '@Redux/Slices/Orgs/orgs.selectors';
import type React from 'react';
import { useParams } from 'react-router';

import { OnlineMembers } from './OnlineMembers';
import { OrgActivityBox } from './OrgActivityBox';
import { OrgJobsOverview } from './OrgJobsOverview';
import { OrgTitleBar } from './OrgTitleBar';

export const OrgDash: React.FC = () => {
  const { selectedOrgId } = useParams();

  const membership = useAppSelector((state) =>
    selectedOrgId ? selectUserMembershipByOrgId(state, selectedOrgId) : null,
  );

  const org = membership ? membership.Org : null;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      {membership && org && (
        <>
          <div
            data-testid="OrgDashboard__Left_Container"
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <div>
              <OrgTitleBar org={org} />
            </div>
            <OrgActivityBox />
          </div>
          <div
            data-testid="OrgDashboard__Right_Container"
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <OrgJobsOverview />
            <OnlineMembers />
          </div>
        </>
      )}
    </div>
  );
};
