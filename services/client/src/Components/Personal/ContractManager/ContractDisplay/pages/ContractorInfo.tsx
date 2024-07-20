import { Box, Divider, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';

export const ContractorInfo: React.FC<unknown> = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '1em',
      }}
    >
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        Select Contract
      </Typography>
      <Divider sx={{ width: '20%', my: '2em' }} />
      <Typography variant="h4" sx={{ color: 'text.secondary' }}>
        {currentUser?.displayName}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
        Ratings Breakdown:
      </Typography>
    </Box>
  );
};
