import { useSoundEffect } from '@Audio/AudioManager';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import TabListHolo from '@Common/Components/Tabs/TabListHolo';
import { Tab } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserMembershipByOrgId } from '@Redux/Slices/Orgs/orgs.selectors';
import React from 'react';
import { useParams } from 'react-router-dom';

type ManageTabs = 'rankAndRole' | 'info' | 'awards' | 'events' | 'payroll';

export const OrgManager: React.FC = () => {
  const { selectedOrgId } = useParams();
  const sound = useSoundEffect();
  const membership = useAppSelector((state) =>
    selectedOrgId ? selectUserMembershipByOrgId(state, selectedOrgId) : null,
  );
  const org = membership ? membership.Org : null;

  const [manageTab, setManageTab] = React.useState<ManageTabs>('rankAndRole');

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
      case 'rankAndRole':
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
            marginLeft: '10%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
          <div
            data-testid="OrgManager__TabList_Wrapper"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <TabListHolo
              value={manageTab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                px: '0.5em',
              }}
            >
              <Tab label="Ranks & Roles" value="rankAndRole" />
              <Tab label="Information" value="info" />
              <Tab label="Awards" value="awards" />
              <Tab label="Events" value="events" />
              <Tab label="Payroll Preferences" value="payroll" disabled />
            </TabListHolo>
          </div>
          <div data-testid="OrgManager__PanelDisplay_Wrapper" style={{ flexGrow: 1 }}>
            <GlassBox>{renderPanel()}</GlassBox>
          </div>
        </div>
      )}
    </div>
  );
};
