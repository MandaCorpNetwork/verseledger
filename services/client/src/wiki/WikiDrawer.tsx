import { useMasterAppList } from '@Common/Definitions/AppListings';
import { Contracts } from '@Common/Definitions/CustomIcons';
import {
  AccountCircleTwoTone,
  AppsTwoTone,
  BusinessTwoTone,
  CelebrationTwoTone,
  HelpCenterTwoTone,
  HomeTwoTone,
  InfoTwoTone,
  NewReleasesTwoTone,
  PlayCircleFilledTwoTone,
  ReportProblemTwoTone,
  RouteTwoTone,
  SettingsTwoTone,
  VolunteerActivismTwoTone,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';

export const WikiDrawer: React.FC = () => {
  const navigate = useNav();
  const masterAppList = useMasterAppList();
  const handleReturnHome = React.useCallback(
    (e: React.MouseEvent) => {
      navigate('/', 'internal', true).onClick(e);
    },
    [navigate],
  );

  const version = masterAppList.find((app) => app.id === 'wiki')?.version;
  const versionLabel = `Support ${version}`;
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
        <List sx={{ width: '100%' }}>
          <ListItemButton
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
        <List>
          <ListItemButton
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
          </ListItemButton>
          <ListItemButton
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
          <ListItemButton
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
