import Spectrum from '@Assets/media/Spectrum.png?url';
import { useSoundEffect } from '@Audio/AudioManager';
import { AppDock } from '@Common/AppDockV3/AppDockV3';
import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import { RatingDisplay } from '@Common/Components/App/RatingDisplay';
import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { UserViewport } from '@Common/Components/Boxes/UserViewport';
import { Security } from '@Common/Definitions/CustomIcons';
import { userBackgroundOptions } from '@Common/Definitions/Structures/Users/UserBackgrounds';
import { MobileDock } from '@Common/MobileDock/MobileDock';
import { ContractInfoPanel } from '@Components/User/UserPage/Info/Panels/ContractsInfoPanel';
import { FleetInfoPanel } from '@Components/User/UserPage/Info/Panels/FleetInfoPanel';
import { OrderInfoPanel } from '@Components/User/UserPage/Info/Panels/OrdersInfoPanel';
import { OrgsInfoPanel } from '@Components/User/UserPage/Info/Panels/OrgsInfoPanel';
import { ContractStatsPanel } from '@Components/User/UserPage/Stats/Panels/ContractStatsPanel';
import { OrderStatsPanel } from '@Components/User/UserPage/Stats/Panels/OrderStatsPanel';
import { Mail, Place } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Grow,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
// import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { fetchSearchUserId } from '@Redux/Slices/Users/Actions/fetchUserById.action';
import {
  selectUserById,
  selectUserPageImageById,
} from '@Redux/Slices/Users/users.selectors';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * ### UserPage
 * @description
 * The UserPage displays the information of the selected user, be in another user or themself.
 * Allows the user view detailled information about the selected user based on their access level.
 * Includes a button that opens up the player messaging widget.
 * Retrieves a User from a userId passed through the url query.
 * TODO: Connect 'Last Online' to the Stomp Client
 * #### Function Components
 * @component {@link ContractInfoPanel}
 * @component {@link FleetInfoPanel}
 * @component {@link OrderInfoPanel}
 * @component {@link OrgsInfoPanel}
 * @component {@link ContractStatsPanel}
 * @component {@link OrderStatsPanel}
 * #### Styled Components
 * @component {@link UserViewport}
 */
export const UserPage: React.FC = () => {
  //LOCAL STATES
  /** Gets the URL Query parameter for read only. */
  const { selectedUserId } = useParams();
  const isMobile = useIsMobile();
  const [statsTab, setStatsTab] = React.useState<string>('contracts');
  const [infoTab, setInfoTab] = React.useState<string>('contracts');
  const [_loading, setLoading] = React.useState<boolean>(true);
  const [_isError, setIsError] = React.useState<boolean>(false);
  // HOOKS
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  // LOGIC
  /** Fetching user object by user id from backend. */
  React.useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      dispatch(fetchSearchUserId({ userId: selectedUserId, scope: ['profile'] }))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          setIsError(true);
        });
    }
  }, [selectedUserId, dispatch, setLoading]);
  /**
   * Fetches the user object from the state based on the selected user id.
   * @paramuserId
   */
  const selectedUser = useAppSelector((state) => {
    if (selectedUserId) {
      return selectUserById(state, selectedUserId);
    }
  });
  /** @var {User}currentUser - Fetches the current user viewing the page. */
  // TODO - Add ability to view player's current position and ship.
  // const currentUser = useAppSelector(selectCurrentUser);
  /**
   * Handles the tab changes for the user stats window.
   * @paramvalue
   * @param_event
   */
  const handleStatsTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      sound.playSound('clickMain');
      setStatsTab(value);
    },
    [setStatsTab, sound],
  );
  /**
   * Call back function created for the user stats panel.
   * This call back function retrieves the current selected panel based on the state choice.
   * Then renders the corrisponding component in the panel.
   */
  const getStatsPanel = React.useCallback(() => {
    switch (statsTab) {
      case 'orders':
        return <OrderStatsPanel />;
      case 'contracts':
      default:
        return <ContractStatsPanel />;
    }
  }, [statsTab]);
  /**
   * Handles the tab changes for the user info window.
   * @paramvalue
   * @param_event
   */
  const handleInfoTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      sound.playSound('clickMain');
      setInfoTab(value);
    },
    [setInfoTab, sound],
  );
  /**
   * Call back function created for the user info panel.
   * This call back function retrieves the current selected panel based on the state choice.
   * Then renders the corrisponding component in the panel.
   */
  const getInfoPanel = React.useCallback(() => {
    switch (infoTab) {
      case 'orgs':
        return <OrgsInfoPanel />;
      case 'orders':
        return <OrderInfoPanel />;
      case 'contracts':
        return <ContractInfoPanel user={selectedUser ?? null} />;
      case 'fleet':
      default:
        return <FleetInfoPanel />;
    }
  }, [infoTab, selectedUser]);

  /**
   * Gets the User ProfileBackground for the found user or passes default if none
   */
  const selectedUserImage = useAppSelector((state) =>
    selectedUser ? selectUserPageImageById(state, selectedUser.id) : null,
  );
  /**
   * @function

      */
  const selectedUserBackground = React.useCallback(() => {
    const backgroundOption = userBackgroundOptions.find(
      (option) => option.value === selectedUserImage,
    );
    return backgroundOption ? backgroundOption.url : userBackgroundOptions[0].url;
  }, [selectedUserImage]);
  return (
    <UserViewport
      data-testid="UserPage_PageContainer"
      sx={{
        backgroundImage: `url(${selectedUserBackground()})`,
        p: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GlassDisplay
        data-testid="UserPage_ContentWrapper"
        sx={{
          p: '2em',
          width: '100%',
          mx: { xs: '0', md: '2em', lg: '5%' },
          backdropFilter: 'blur(5px)',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <Box
          data-testid="UserPage_TopRow"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            width: '100%',
            my: '1em',
          }}
        >
          <Box
            data-testid="UserPage_PlayerDataContainer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
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
                height: '100%',
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
              <RatingDisplay
                value={selectedUser?.display_rating ?? -1}
                size="medium"
                sx={{ mt: '1em' }}
                variant="defined"
              />
            </Box>
            <DigiDisplay
              data-testid="UserPage-PlayerData_DataWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-around',
                mx: '1em',
                p: '1em',
                justifyContent: 'space-around',
                minWidth: '250px',
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
                    onClick={() => sound.playSound('navigate')}
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
                      ml: '0.5em',
                      mt: '0.3em',
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
                    <Security data-testid="UserPage-PlayerData_CrewInvitationButton"></Security>
                  </IconButton>
                </Tooltip>
              </Box>
            </DigiDisplay>
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
              data-testid="UserPage-CurrentData_Wrapper"
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
              <InDevOverlay />
              <DigiDisplay
                data-testid="UserPage-Wrapper_LocationDisplay"
                sx={{ py: '0.8em', display: 'flex', flexDirection: 'row', width: '100%' }}
              >
                <Tooltip
                  data-testid="UserPage-LocationDisplay_LocationButtonTooltip"
                  title="View Location"
                >
                  <IconButton
                    data-testid="UserPage-LocationDisplay_LocationButton"
                    onClick={() => {}}
                  >
                    <Place fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Typography
                  data-testid="UserPage-LocationDisplay_Location"
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
                  data-testid="UserPage-LocationDisplay_LastUpdated"
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
                  data-testid="UserPage-LocationDisplay_UpdatedTime"
                  variant="overline"
                  sx={{
                    mx: '0.5em',
                    pt: '3em',
                    color: 'grey',
                    fontSize: '0.6em',
                    textShadow: '0 5px 8px rgba(0,0,0,0.8), 0 2px 4px rgb(0,0,0)',
                  }}
                >
                  2 Days Ago
                </Typography>
              </DigiDisplay>
              <DigiDisplay
                data-testid="UserPage-Wrapper_ShipDisplay"
                sx={{ py: '0.8em', display: 'flex', flexDirection: 'row' }}
              >
                <Tooltip
                  data-testid="UserPage-ShipDisplay_ShipButtonTooltip"
                  title="View Ship"
                >
                  <IconButton
                    data-testid="UserPage-ShipDisplay_ShipButton"
                    onClick={() => {}}
                  >
                    <Security fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Typography
                  data-testid="UserPage-ShipDisplay_ShipName"
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
                  data-testid="UserPage-ShipDisplay_LastUpdated"
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
                  data-testid="UserPage-ShipDisplay_UpdatedTime"
                  variant="overline"
                  sx={{
                    mx: '0.5em',
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
        <Box
          data-testid="UserPage_BottomRow"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            height: '70%',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <DigiDisplay
            data-testid="UserPage-BottomRow_StatsContainer"
            sx={{
              width: '35%',
              height: '100%',
              pt: '1em',
              justifyContent: 'flex-start',
            }}
          >
            <InDevOverlay supportButton={true} />
            <ControlPanelBox
              data-testid="UserPage-BottomRow_Stats_Tablist_Wrapper"
              sx={{
                display: 'block',
                px: '.5em',
                pm: '.5em',
                mb: '1em',
              }}
            >
              <Tabs
                data-testid="UserPage-BottomRow-Stats_Tablist"
                variant="fullWidth"
                value={statsTab}
                onChange={handleStatsTabChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab
                  data-testid="UserPage-Stats-Tablist_ContractsTab"
                  label="Contracts"
                  value="contracts"
                />
                <Tab
                  disabled
                  data-testid="UserPage-Stats-Tablist_OrdersTab"
                  label="Orders"
                  value="orders"
                />
              </Tabs>
            </ControlPanelBox>
            <Grow data-testid="UserPage-Stats-Tab_Display_Wrapper" in={true}>
              <Box data-testid="UserPage-Tab_Display_Box">{getStatsPanel()}</Box>
            </Grow>
          </DigiDisplay>
          <DigiDisplay
            data-testid="UserPage-BottomRow_UserInfoContainer"
            sx={{
              width: '60%',
              height: '100%',
              pt: '1em',
              justifyContent: 'flex-start',
            }}
          >
            <ControlPanelBox
              sx={{
                display: 'block',
                px: '.5em',
                pm: '.5em',
                mb: '1em',
              }}
            >
              <Tabs
                data-testid="UserPage-BottomRow-Info_Tablist"
                variant="fullWidth"
                value={infoTab}
                onChange={handleInfoTabChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab
                  disabled
                  data-testid="UserPage-Info-Tablist_FleetTab"
                  label="Fleet"
                  value="fleet"
                />
                <Tab
                  disabled
                  data-testid="UserPage-Info-Tablist_OrgsTab"
                  label="Orgs"
                  value="orgs"
                />
                <Tab
                  disabled
                  data-testid="UserPage-Info-Tablist_OrdersTab"
                  label="Orders"
                  value="orders"
                />
                <Tab
                  data-testid="UserPage-Info-Tablist_ContractsTab"
                  label="Contracts"
                  value="contracts"
                />
              </Tabs>
            </ControlPanelBox>
            <Box
              sx={{ width: '100%', p: '1em', height: '85%' }}
              data-testid="UserPage-Tab_Display_Box"
            >
              {getInfoPanel()}
            </Box>
          </DigiDisplay>
        </Box>
      </GlassDisplay>
      {/* {!isMobile && <AppDockRenderer />}
      {isMobile && <MobileDock top hCenter />} */}
    </UserViewport>
  );
};
