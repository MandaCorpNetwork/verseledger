import { OnlineMembers } from './OnlineMembers';
import { OrgActivityBox } from './OrgActivityBox';
import { OrgJobsOverview } from './OrgJobsOverview';
import { OrgTitleBar } from './OrgTitleBar';

export const OrgDash: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div
          data-testid="OrgDashboard__Left_Container"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <OrgTitleBar />
          </div>
          <OrgActivityBox />
        </div>
        <div
          data-testid="OrgDashboard__Right_Container"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <OrgJobsOverview />
          <OnlineMembers />
        </div>
      </div>
    </div>
  );
};
