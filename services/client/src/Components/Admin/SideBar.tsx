import '@Assets/Css/ripple.css';

import { SideControlPanel } from '@Common/Components/Collapse/SideControlPanel';
import {
  AdminPanelSettingsTwoTone,
  BugReportTwoTone,
  ContactSupportTwoTone,
  FeedbackTwoTone,
  FlagTwoTone,
  KeyboardDoubleArrowRight,
  SupervisedUserCircleTwoTone,
  TipsAndUpdatesTwoTone,
} from '@mui/icons-material';
import { Box, Button, Grow, IconButton, Slide, Tooltip } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import { useIsTablet } from '@Utils/isTablet';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

const adminTabs = [
  {
    to: '/admin/bugs',
    label: 'Bug Reports',
    value: 'bugs',
    id: 'Bugs',
    icon: <BugReportTwoTone fontSize="large" />,
  },
  {
    to: '/admin/reports',
    label: 'Moderation',
    value: 'reports',
    id: 'Reports',
    icon: <AdminPanelSettingsTwoTone fontSize="large" />,
  },
  {
    to: '/admin/user-issue',
    label: 'User Issues',
    value: 'user-issue',
    id: 'UserIssue',
    icon: <SupervisedUserCircleTwoTone fontSize="large" />,
  },
  {
    to: '/admin/questions',
    label: 'Questions',
    value: 'questions',
    id: 'Questions',
    icon: <ContactSupportTwoTone fontSize="large" />,
  },
  {
    to: '/admin/suggestions',
    label: 'Suggestions',
    value: 'suggestions',
    id: 'Suggestions',
    icon: <FeedbackTwoTone fontSize="large" />,
  },
  {
    to: '/admin/updates',
    label: 'Feature Updates',
    value: 'updates',
    id: 'Updates',
    icon: <TipsAndUpdatesTwoTone fontSize="large" />,
  },
  {
    to: '/admin/milestones',
    label: 'Milestones',
    value: 'milestones',
    id: 'Milestones',
    icon: <FlagTwoTone fontSize="large" />,
  },
];

export const AdminSideBar: React.FC = () => {
  const { adminTab } = useParams();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();

  const handleDrawerOpen = React.useCallback(() => {
    if (isExpanded) {
      playSound('toggleOff');
    } else {
      playSound('toggleOn');
    }
    setIsExpanded(!isExpanded);
  }, [setIsExpanded, isExpanded, playSound]);

  return (
    <SideControlPanel
      data-testid="AdminPage__SidePanel"
      in={isExpanded}
      orientation="horizontal"
      collapsedSize="50px"
      sx={{ height: '100%', maxWidth: '230px' }}
    >
      {!mobile && !tablet && (
        <IconButton
          data-testid="AdminPage-SidePanel__ExpandButton"
          onClick={handleDrawerOpen}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: `rotate(${isExpanded ? '180deg' : '0'})`,
            transition: 'transform 0.3s',
            '&:hover': {
              color: 'text.primary',
              transform: 'scale(1.2)',
            },
          }}
        >
          <KeyboardDoubleArrowRight fontSize="large" />
        </IconButton>
      )}
      <Box
        data-testid="AdminPage-SidePanel__NavButtons_Wrapper"
        marginTop={{ xs: '.5em', sm: '.5em', md: '2em', lg: '3em' }}
      >
        <Slide
          data-testid="AdminPage-SidePanel-NavButtons__Slide"
          direction="right"
          in={!isExpanded}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 800, exit: 300 }}
        >
          <Box data-testid="AdminPage-SidePanel-NavButtons__CollapsedWrapper">
            {adminTabs.map((tab) => (
              <Tooltip
                key={tab.id}
                data-testid={`AdminPage-SidePanel-NavButtons__${tab.id}Tooltip`}
                title={tab.label}
                placement="right"
              >
                <IconButton
                  data-testid={`AdminPage-SidePanel-NavButtons__${tab.id}_IconButton`}
                  onClick={() => navigate(`${tab.to}`)}
                  sx={{
                    transition: 'all 0.3s ease',
                    color:
                      adminTab === `${tab.value}` ? 'secondary.main' : 'primary.light',
                    '&:hover': {
                      color: 'text.primary',
                      transform: 'scale(1.2)',
                    },
                    '&:active': {
                      transform: 'scale(1)',
                    },
                  }}
                >
                  {tab.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Slide>
        <Grow
          data-testid="AdminPage-SidePanel-NavButtons__Grow"
          in={isExpanded}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 3500, exit: 300 }}
        >
          <Box
            data-testid="AdminPage-SidePanel-NavButtons__ExpandedWrapper"
            sx={{ display: 'flex', flexDirection: 'column', gap: '1em', pl: '.5em' }}
          >
            {adminTabs.map((tab) => (
              <Button
                key={tab.id}
                data-testid={`AdminPage-SidePanel-NavButtons__${tab.id}Button`}
                startIcon={tab.icon}
                onClick={() => {
                  playSound('open');
                  navigate(`${tab.to}`);
                }}
                variant="contained"
                TouchRippleProps={{ className: 'dark-ripple' }}
                sx={{
                  boxShadow: '0 4px 8px rgba(0,0,0,.8)',
                  background:
                    adminTab === tab.value
                      ? 'linear-gradient(145deg, rgba(14,49,252) 30%, rgba(33,150,243) 100%)'
                      : 'linear-gradient(145deg, rgba(14,35,141) 30%, rgba(8,22,80) 100%)',
                  color: adminTab === tab.value ? 'secondary.main' : 'text.secondary',
                  textShadow: '0 2px 4px rgba(0,0,0,.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(0,0,0,.8)',
                    background:
                      'linear-gradient(145deg, rgba(8,22,80) 30%, rgba(0,1,19) 100%)',
                    color: 'text.primary',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 2px 4px rgba(0,0,0,.8)',
                  },
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Grow>
      </Box>
    </SideControlPanel>
  );
};
