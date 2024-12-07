import { useSoundEffect } from '@Audio/AudioManager';
import { useMasterAppList } from '@Common/Definitions/AppListings';
import { Contracts } from '@Common/Definitions/CustomIcons';
import {
  AccountCircleTwoTone,
  AppsTwoTone,
  BusinessTwoTone,
  CelebrationTwoTone,
  ExpandLess,
  ExpandMore,
  FingerprintTwoTone,
  FollowTheSignsTwoTone,
  HelpCenterTwoTone,
  HomeTwoTone,
  InfoTwoTone,
  ManageAccountsTwoTone,
  NewReleasesTwoTone,
  PlayCircleFilledTwoTone,
  ReportProblemTwoTone,
  RouteTwoTone,
  SettingsTwoTone,
  VolunteerActivismTwoTone,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useParams } from 'react-router-dom';

export const SupportDrawer: React.FC = () => {
  const nav = useNav();
  const masterAppList = useMasterAppList();
  const handleReturnHome = React.useCallback(
    (e: React.MouseEvent) => {
      nav('/', 'internal', true).onClick(e);
    },
    [nav],
  );

  const version = masterAppList.find((app) => app.id === 'wiki')?.version;
  const versionLabel = `Support ${version}`;

  const { page, subpage } = useParams();
  const sound = useSoundEffect();

  const handlePageSelect = React.useCallback(
    (e: React.MouseEvent, newPage: string) => {
      if (!subpage) {
        if (page === newPage) return sound.playSound('denied');
      }
      const url = `/support/${newPage}`;
      nav(url, 'internal', false).onClick(e);
    },
    [nav, page, sound, subpage],
  );

  const handleSubpageSelect = React.useCallback(
    (e: React.MouseEvent, page: string, newSubpage: string) => {
      if (subpage === newSubpage) return sound.playSound('denied');
      const url = `${page}/${newSubpage}`;
      nav(url, 'internal', false).onClick(e);
    },
    [nav, sound, subpage],
  );
  return (
    <Drawer
      data-testid="WikiPage__Drawer"
      variant="permanent"
      sx={{
        position: 'relative',
        boxShadow:
          '2px 4px 4px rgba(0,1,19,0.4),3px 3px 4px rgba(0,1,19,.3), 4px 4px 12px rgba(0,1,19,.2), 5px 5px 16px rgba(0,1,19,.1)',
        borderRadius: '10px',
        height: '100%',
        '& .MuiDrawer-paper': {
          position: 'relative',
          boxSizing: 'border-box',
          bgcolor: 'rgba(14,35,141,0.8)',
          backgroundImage:
            'linear-gradient(145deg, rgba(33,150,243,0.1), rgba(0,1,19,0.2))',
          boxShadow:
            'inset 0px 1px 2px rgba(33,150,243,0.2), inset 0 -1px 2px rgba(0,1,19,0.2), 0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(33,150,243,0.2)',
          border: '2px solid',
          borderLeft: 'none',
          borderRadius: '10px',
          borderColor: 'primary.main',
          transition: 'all 0.3s ease-in-out',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(0,1,19,0.2) 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            opacity: 0.6,
          },
          '&:hover': {
            backgroundImage:
              'linear-gradient(125deg, rgba(0,1,19,0.25), rgba(0,30,100,0.3))',
            borderColor: 'primary.light',
            boxShadow:
              'inset 0px 1px 2px rgba(33,150,243,.2), inset 0 -1px 2px rgba(0,1,19,.2)',
            '&:before': {
              backgroundImage:
                'radial-gradient(circle, rgba(33,150,252,0.2) 1px, transparent 1px)',
            },
          },
        },
        '&:hover': {
          boxShadow:
            '2px 2px 6px 6px rgba(0,1,19,0.3), 2px 4px 8px 8px rgba(0,1,19,.3), 4px 6px 12px 12px rgba(0,1,19,.2), 4px 8px 16px 24px rgba(0,1,19,.1)',
        },
      }}
    >
      <Box
        data-testid="WikiPage-Drawer__List_Wrapper"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div>
          <ListItemButton
            data-testid="WikiPage-Drawer-List__ReturnHome_Button"
            onClick={(e) => handleReturnHome(e)}
            onAuxClick={(e) => handleReturnHome(e)}
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <HomeTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Return Home" />
          </ListItemButton>
          <Divider variant="middle" />
        </div>
        <List
          sx={{ width: '100%' }}
          subheader={
            <ListSubheader sx={{ bgcolor: 'transparent' }}>
              Information Pages
            </ListSubheader>
          }
        >
          <ListItemButton
            data-testid="WikiPage-InfoList__About_Button"
            selected={page === 'about'}
            onClick={(e) => handlePageSelect(e, 'about')}
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <InfoTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <CelebrationTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Special Thanks" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <PlayCircleFilledTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Get Started" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <HelpCenterTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <VolunteerActivismTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Support Us" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <ReportProblemTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Send Report" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <NewReleasesTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Release Notes" />
          </ListItemButton>
          <Divider variant="middle" sx={{ mt: '1em' }} />
        </List>
        <List
          subheader={
            <ListSubheader sx={{ bgcolor: 'transparent' }}>Wiki Pages</ListSubheader>
          }
        >
          <ListItemButton
            data-testid="WikiPage-WikiList__AccountSetup_Button"
            selected={page === 'accSetup'}
            onClick={(e) => handlePageSelect(e, 'accSetup')}
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <AccountCircleTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Account Setup" />
            {page === 'accSetup' ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={page === 'accSetup'} timeout="auto" unmountOnExit>
            <List
              data-testid="WikiPage-WikiList-AccountSetup__SubPage_List"
              component="div"
              disablePadding
            >
              <ListItemButton
                data-testid="WikiPage-WikiList-AccountSetup-SubPage__Signup_Button"
                onClick={(e) => handleSubpageSelect(e, 'accSetup', 'signUp')}
                selected={subpage === 'signUp'}
                sx={{
                  pl: 4,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'warning.main',
                  },
                }}
              >
                <ListItemIcon>
                  <FollowTheSignsTwoTone color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
              <ListItemButton
                data-testid="WikiPage-WikiList-AccountSetup-SubPage__Verification_Button"
                onClick={(e) => handleSubpageSelect(e, 'accSetup', 'verification')}
                selected={subpage === 'verification'}
                sx={{
                  pl: 4,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'warning.main',
                  },
                }}
              >
                <ListItemIcon>
                  <FingerprintTwoTone color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Verification" />
              </ListItemButton>
              <ListItemButton
                data-testid="WikiPage-WikiList-AccountSetup-SubPage__NewSettings_Button"
                onClick={(e) => handleSubpageSelect(e, 'accSetup', 'newSettings')}
                selected={subpage === 'newSettings'}
                sx={{
                  pl: 4,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'warning.main',
                  },
                }}
              >
                <ListItemIcon>
                  <ManageAccountsTwoTone color="secondary" />
                </ListItemIcon>
                <ListItemText primary="New Settings" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <SettingsTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <Collapse></Collapse>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <AppsTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="App Dock" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <Contracts color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Contracts" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <RouteTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Routes" />
          </ListItemButton>
          <ListItemButton
            disabled
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'warning.main',
              },
            }}
          >
            <ListItemIcon>
              <BusinessTwoTone color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Organizations" />
          </ListItemButton>
          <Divider variant="middle" sx={{ mt: '1em' }} />
        </List>
        <Typography sx={{ mt: 'auto' }}>{versionLabel}</Typography>
      </Box>
    </Drawer>
  );
};
