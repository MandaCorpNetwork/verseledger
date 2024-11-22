import { Box } from '@mui/material';

// import { useAppSelector } from '@Redux/hooks';
// import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { AddOrgButton } from './AddOrgButton';
import { EmptySpace } from './EmptySpace';

export const OrgSwitcher: React.FC = () => {
  // const user = useAppSelector(selectCurrentUser);

  // const userMemberships = user ? user.
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
        <AddOrgButton />
        <EmptySpace />
        <EmptySpace />
        <EmptySpace />
        <EmptySpace />
        <EmptySpace />
      </div>
    </Box>
  );
};
