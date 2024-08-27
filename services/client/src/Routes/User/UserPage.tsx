import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Avatar, Box, Stack } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';

export const UserPage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <VLViewport data-testid="UserPage_PageContainer">
      <Avatar alt="Test Avatar" src={user?.pfp} sx={{ width: 150, height: 150 }} />
    </VLViewport>
  );
};
