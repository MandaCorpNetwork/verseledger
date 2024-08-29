import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Avatar, Box, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { fetchSearchUsers } from '@Redux/Slices/Users/Actions/fetchSearchUsers';
import { fetchSearchUserId } from '@Redux/Slices/Users/Actions/fetchUserById';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

export const UserPage: React.FC = () => {
  //LOCAL STATES
  const [searchParam] = useURLQuery();
  // HOOKS
  const dispatch = useAppDispatch();
  // LOGIC
  const selectedUserId = searchParam.get(QueryNames.User);
  React.useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchSearchUserId(selectedUserId));
    }
  }, [selectedUserId, dispatch]);

  const selectedUser = useAppSelector((state) => {
    if (selectedUserId) {
      return selectUserById(state, selectedUserId);
    }
  });

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
            <Avatar src={selectedUser?.pfp} />
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
