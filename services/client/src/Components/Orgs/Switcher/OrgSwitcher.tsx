import { Box } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserMemberships } from '@Redux/Slices/Orgs/orgs.selectors';

import { AddOrgButton } from './AddOrgButton';
import { EmptySpace } from './EmptySpace';
import { OrgSelectButton } from './OrgSelection';

export const OrgSwitcher: React.FC = () => {
  const userMemberships = useAppSelector(selectUserMemberships);

  const primaryOrg = userMemberships.find((membership) => membership.primary);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '60px',
        borderRadius: '10px',
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 10,
        border: '2px solid',
        borderColor: 'rgba(33,150,243,0.5)',
        backgroundImage: 'linear-gradient(135deg, rgba(14,35,141), rgba(8,22,80))',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5em 0',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '1em',
        }}
      >
        {primaryOrg && <OrgSelectButton membership={primaryOrg} />}
        {userMemberships &&
          userMemberships.map((membership) => {
            if (!membership.primary) {
              return <OrgSelectButton key={membership.id} membership={membership} />;
            }
            return null;
          })}
        {userMemberships.length < 6 && <AddOrgButton />}
        {Array.from({ length: 5 - userMemberships.length }).map((_, index) => {
          const key = `empty-${index}`;
          return <EmptySpace key={key} />;
        })}
      </div>
    </Box>
  );
};
