import Spectrum from '@Assets/media/Spectrum.png?url';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { UserViewport } from '@Common/Components/Boxes/UserViewport';
import { SecurityIcon } from '@Common/Definitions/CustomIcons';
import { Mail, Place, Security } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
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
 * TODO: Connect 'Last Online' to the Stomp Client
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
    <UserViewport
      data-testid="UserPage_PageContainer"
      sx={{
        p: '1em',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <GlassDisplay
        data-testid="UserPage_ContentWrapper"
        sx={{
          p: '2em',
          width: '100%',
          height: '100%',
          mx: { xs: '0', md: '2em', lg: '5%' },
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          data-testid="UserPage_TopRow"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            height: '25%',
            width: '100%',
          }}
        >
          <Box
            data-testid="UserPage_PlayerDataContainer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
              width: '35%',
            }}
          >
            <Box
              data-testid="UserPage-PlayerData_AvatarWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mx: '1em',
                px: '1em',
              }}
            >
              <Avatar
                data-testid="UserPage-PlayerData_UserAvatar"
                src={selectedUser?.pfp}
                sx={{
                  width: '100px',
                  height: '100px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.5)',
                  '&:hover': {
                    boxShadow:
                      '0 12px 24px rgba(0,30,100,0.35), 0 16px 36px rgba(0,1,19,0.2)',
                  },
                }}
                variant="rounded"
              />
              <Rating
                data-testid="UserPage-PlayerData_UserRating"
                value={3}
                readOnly={true}
                size="medium"
                sx={{ mt: '1em' }}
              />
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
                backgroundImage:
                  'linear-gradient(135deg, rgba(0,30,160,.8) 0%, rgba(0,30,140,.7) 50%, rgba(0,30,120,.6) 100%)',
                '&:hover': {
                  boxShadow:
                    '0 0 10px 5px rgba(0,30,100,.35), 0 12px 15px rgba(0, 1, 19, .2)',
                },
              }}
            >
              <Box data-testid="UserPage-PlayerData_UsernameContainer">
                <Typography
                  data-testid="UserPage-PlayerData_UserDisplayName"
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    color: 'primary.contrasttext',
                  }}
                >
                  {selectedUser?.displayName}
                </Typography>
              </Box>
              <Box
                data-testid="UserPage-PlayerData_SpectrumHandleContainer"
                sx={{ alignItems: 'center', display: 'flex' }}
              >
                <Typography
                  data-testid="UserPage-PlayerData_SpectrumHandle"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                  }}
                  variant="body2"
                >
                  <IconButton
                    data-testid="UserPage-PlayerData_RSILink"
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
              <Box data-testid="UserPage-PlayerData_OnlineTimeContainer">
                <Typography
                  data-testid="UserPage-PlayerData_LastOnlineLabel"
                  variant="body2"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Last Online:
                  <Typography
                    data-testid="UserPage-PlayerData_LastOnlineData"
                    variant="overline"
                    sx={{
                      ml: '0.2em',
                      mt: '0.2em',
                      color: 'grey',
                      textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                    }}
                  >
                    2 Days Ago
                  </Typography>
                </Typography>
              </Box>
              <Box
                data-testid="UserPage-PlayerData_MessagePlayerButtonContainer"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  px: '1.5em',
                }}
              >
                <Tooltip
                  data-testid="UserPage-PlayerData_MailUserButtonTooltip"
                  title="Message"
                >
                  <IconButton>
                    <Mail data-testid="UserPage-PlayerData_MailUserButton"></Mail>
                  </IconButton>
                </Tooltip>
                <Tooltip
                  data-testid="UserPage-PlayerData_CrewInvitationButtonTooltip"
                  title="Invite to Crew"
                >
                  <IconButton>
                    <SecurityIcon data-testid="UserPage-PlayerData_CrewInvitationButton"></SecurityIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            </PopupFormDisplay>
          </Box>
          <Box
            data-testid="UserPage_CurrentDataContainer"
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <DigiBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-around',
                px: '2em',
                mx: 'auto',
                minWidth: { xs: '300px', md: '500px' },
              }}
            >
              <DigiDisplay
                sx={{ py: '0.8em', display: 'flex', flexDirection: 'row', width: '100%' }}
              >
                <Tooltip title="View Location">
                  <IconButton onClick={() => {}}>
                    <Place fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-flex',
                    ml: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Current Location
                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    ml: 'auto',
                    pt: '3em',
                    color: 'grey',
                    fontSize: '0.6em',
                    alignSelf: 'flex-end',
                    textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                  }}
                >
                  Last Updated:
                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    ml: '0.2em',
                    pt: '3em',
                    color: 'grey',
                    fontSize: '0.6em',
                    textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                  }}
                >
                  2 Days Ago
                </Typography>
              </DigiDisplay>
              <DigiDisplay sx={{ py: '0.8em', display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="View Ship">
                  <IconButton onClick={() => {}}>
                    <SecurityIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-flex',
                    ml: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Current Ship
                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    ml: 'auto',
                    pt: '3em',
                    color: 'grey',
                    fontSize: '0.6em',
                    alignSelf: 'flex-end',
                    textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                  }}
                >
                  Last Updated:
                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    ml: '0.2em',
                    pt: '3em',
                    color: 'grey',
                    fontSize: '0.6em',
                    textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                  }}
                >
                  2 Days Ago
                </Typography>
              </DigiDisplay>
            </DigiBox>
          </Box>
        </Box>
      </GlassDisplay>
    </UserViewport>
  );
};
