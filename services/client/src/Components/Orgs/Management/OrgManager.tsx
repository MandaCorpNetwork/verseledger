import { useSoundEffect } from '@Audio/AudioManager';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import TabListHolo from '@Common/Components/Tabs/TabListHolo';
import { Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchOrg } from '@Redux/Slices/Orgs/actions/get/fetchOrg.action';
import {
  selectOrg,
  selectUserMembershipByOrgId,
} from '@Redux/Slices/Orgs/orgs.selectors';
import React from 'react';
import { useParams } from 'react-router-dom';

import { MemberManagement } from './MemberManagement';
import { RankAndRoles } from './RankAndRoles';

type ManageTabs = 'members' | 'rankAndRole' | 'info' | 'awards' | 'events' | 'payroll';

export const OrgManager: React.FC = () => {
  const { selectedOrgId } = useParams();
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const [_loading, setLoading] = React.useState<boolean>(true);
  const membership = useAppSelector((state) =>
    selectedOrgId ? selectUserMembershipByOrgId(state, selectedOrgId) : null,
  );

  const getOrg = React.useCallback(
    (orgId: string) => {
      setLoading(true);
      if (orgId) {
        sound.playSound('loading');
        dispatch(fetchOrg(orgId));
        setLoading(false);
      }
    },
    [dispatch, sound],
  );

  React.useEffect(() => {
    if (selectedOrgId) {
      getOrg(selectedOrgId);
    }
  }, [getOrg, selectedOrgId]);

  const org = useAppSelector((state) =>
    selectedOrgId ? selectOrg(state, selectedOrgId) : null,
  );

  // const roles = useAppSelector((state) =>
  //   org ? selectOrgRolesByOrgId(state, org.id) : null,
  // );

  // const members = useAppSelector((state) =>
  //   org ? selectOrgMembersByOrgId(state, org.id) : null,
  // );

  const [manageTab, setManageTab] = React.useState<ManageTabs>('members');

  const handleTabChange = React.useCallback(
    (_e: React.SyntheticEvent, value: ManageTabs) => {
      if (value === manageTab) {
        sound.playSound('denied');
      } else {
        sound.playSound('clickMain');
        setManageTab(value);
      }
    },
    [manageTab, sound],
  );

  const renderPanel = React.useCallback(() => {
    switch (manageTab) {
      case 'members':
        return <MemberManagement />;
      case 'rankAndRole':
        return <RankAndRoles />;
      case 'info':
      case 'awards':
      case 'events':
      case 'payroll':
      default:
        return null;
    }
  }, [manageTab]);

  return (
    <div
      data-testid="OrgManager__Container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {membership && org && (
        <div
          data-testid="OrgManager__Wrapper"
          style={{
            margin: '0 5%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            flexGrow: 1,
          }}
        >
          <div
            data-testid="OrgManager__TabList_Wrapper"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <TabListHolo
              data-testid="OrgManager__TabList"
              value={manageTab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              sx={{
                px: '0.5em',
              }}
            >
              <Tab
                data-testid="OrgManager-TabList__MemberManagement_Tab"
                label="Members"
                value="members"
              />
              <Tab
                data-testid="OrgManager-TabList__Ranks&Roles_Tab"
                label="Ranks & Roles"
                value="rankAndRole"
              />
              <Tab
                data-testid="OrgManager-TabList__Info_Tab"
                label="Information"
                value="info"
              />
              <Tab
                data-testid="OrgManager-TabList__Awards_Tab"
                label="Awards"
                value="awards"
              />
              <Tab
                data-testid="OrgManager-TabList__Events_Tab"
                label="Events"
                value="events"
              />
              <Tab
                data-testid="OrgManager-TabList__Payroll_Tab"
                label="Payroll Preferences"
                value="payroll"
                disabled
              />
            </TabListHolo>
          </div>
          <GlassBox
            data-testid="OrgManager__PanelDisplay_Container"
            sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1em' }}
          >
            {renderPanel()}
          </GlassBox>
        </div>
      )}
    </div>
  );
};
