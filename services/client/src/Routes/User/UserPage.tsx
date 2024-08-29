import Spectrum from '@Assets/media/Spectrum.png?url';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { UserViewport } from '@Common/Components/Boxes/UserViewport';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { fetchSearchUserId } from '@Redux/Slices/Users/Actions/fetchUserById';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

/**
 * ### UserPage
 * @description
 * The UserPage displays the information of the selected user, be in another user or themself.
 * Allows the user view detailled information about the selected user based on their access level.
 * Includes a button that opens up the player messaging widget.
 * Retrieves a User from a userId passed through the url query.
 * @version 0.1.0
 * @returns {React.FC}
 * #### Function Components
 * - None
 * #### Styled Components
 * @component {@link UserViewport}
 * @author Eugene R. Petrie - AUG 2024
 */
export const UserPage: React.FC = () => {
  //LOCAL STATES
  /** Gets the URL Query parameter for read only. */
  const [searchParam] = useURLQuery();
  // HOOKS
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();
  // LOGIC
  /** @var {string}selectedUserId - Fetching the User ID from teh Query params. */
  const selectedUserId = searchParam.get(QueryNames.User);
  /** @function useEffect - Fetching user object by user id from backend. */
  React.useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchSearchUserId(selectedUserId));
    }
  }, [selectedUserId, dispatch]);
  /**
   * @function selectedUser - Fetches the user object from the state based on the selected user id.
   * @param {string}userId
   * @returns {IUser}
   */
  const selectedUser = useAppSelector((state) => {
    if (selectedUserId) {
      return selectUserById(state, selectedUserId);
    }
  });
  /** @var {User}currentUser - Fetches the current user viewing the page. */
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <UserViewport data-testid="UserPage_PageContainer" sx={{ p: '1em' }}>
      <Box
        data-testid="UserPage_TopRow"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '25%',
          width: '100%',
          zIndex: 1,
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
              mx: '1em',
              px: '1em',
            }}
          >
            <Avatar src={selectedUser?.pfp} />
            {/*TODO: Adjust avatar size before final commit.*/}
          </Box>
          <PopupFormDisplay
            data-testid="UserPage-PlayerData_DataWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'space-around',
              height: '100%',
              mx: '1em',
              p: '1em',
              justifyContent: 'space-around',
            }}
          >
            <Box data-testid="UserPage-PlayerData_UsernameContainer">
              <Typography align="center">{selectedUser?.displayName}</Typography>
            </Box>
            <Box data-testid="UserPage-PlayerData_SpectrumHandleContainer">
              <Typography align="center">
                <IconButton
                  component="a"
                  href={`https://robertsspaceindustries.com/citizens/${selectedUser?.handle}`}
                  target="_blank"
                  rel="noopenner noreferrer"
                  onClick={() => playSound('navigate')}
                >
                  <img width="24" height="24" src={Spectrum} alt="Spectrum" />
                </IconButton>
                {`@${selectedUser?.handle}`}
              </Typography>
            </Box>
            <Box data-testid="UserPage-PlayerData_OnlineTimeContainer">3</Box>
            <Box data-testid="UserPage-PlayerData_MessagePlayerButtonContainer">4</Box>
          </PopupFormDisplay>
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
    </UserViewport>
  );
};
