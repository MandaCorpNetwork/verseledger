import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Avatar, Box, Stack } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';

export const UserPage: React.FC = () => {
  //LOCAL STATES
  const [searchParam] = useURLQuery();
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <VLViewport data-testid="UserPage_PageContainer" sx={{ p: '1em' }}>
      <Box
        data-testid="UserPage_TopRow"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '25%',
          width: '100%',
          border: '1px solid', // Remove this after testing
        }}
      >
        <Box
          data-testid="UserPage_PlayerDataContainer"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '50%',
            border: '2px solid green', // Remove this after testing
          }}
        >
          <Box
            data-testid="UserPage-PlayerData_AvatarWrapper"
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid pink', // Remove this after testing
              mx: '1em',
              px: '1em',
            }}
          >
            <Avatar />
          </Box>
          <Box
            data-testid="UserPage-PlayerData_DataWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'space-around',
              height: '100%',
              border: '2px solid',
            }}
          >
            <Box data-testid="UserPage-PlayerData_UsernameContainer">1</Box>
            <Box data-testid="UserPage-PlayerData_DiscordUsernameContainer">2</Box>
            <Box data-testid="UserPage-PlayerData_OnlineTimeContainer">3</Box>
            <Box data-testid="UserPage-PlayerData_MessagePlayerButtonContainer">4</Box>
          </Box>
        </Box>
        <Box
          data-testid="UserPage_CurrentDataContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '50%',
          }}
        ></Box>
      </Box>
    </VLViewport>
  );
};
