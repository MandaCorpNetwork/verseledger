import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Avatar, Box, Stack } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';

export type UserPageProps = {
  /** The user ID. */
  userid: string;
};

export const UserPage: React.FC<UserPageProps> = ({ userid }) => {
  const user = useAppSelector((state) => selectUserById(state, userid));

  return (
    <VLViewport data-testid="UserPage_PageContainer">
      <Stack direction="row" spacing={2}>
        <Avatar alt="Test Avatar" src={user?.pfp} />
      </Stack>
      <Box>UserPage</Box>
    </VLViewport>
  );
};
