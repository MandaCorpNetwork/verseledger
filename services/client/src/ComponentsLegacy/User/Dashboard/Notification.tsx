import { ControlPanelBox } from '@Common/Components/Core/Boxes/ControlPanelBox';
import { Clear, Forward } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import type React from 'react';

type OverviewNotificationProps = {
  title: string;
  text: string;
  onClose: () => void;
  view: () => void;
};

export const OverviewNotification: React.FC<OverviewNotificationProps> = ({
  title,
  text,
  onClose,
  view,
}) => {
  const theme = useTheme();
  return (
    <ControlPanelBox
      data-testid="NotificationContainer"
      sx={{
        justifyContent: 'space-between',
        px: { xs: '.2em', md: '1em' },
        alignItems: 'center',
        gap: '.5em',
        my: '.5em',
      }}
    >
      <Typography
        data-id="ToolName"
        variant={theme.breakpoints.down('md') ? 'body2' : 'body1'}
      >
        {title}
      </Typography>
      <Box data-testid="NotificationMessageContiner">
        <Typography
          data-testid="NotificationMessage"
          align="center"
          variant={theme.breakpoints.down('md') ? 'body2' : 'body1'}
        >
          {text}
        </Typography>
      </Box>
      <Box data-testid="NavButtonContainer">
        <Button
          color="secondary"
          startIcon={<Forward />}
          size={theme.breakpoints.down('md') ? 'small' : 'medium'}
          onClick={view}
        >
          View
        </Button>
        <Tooltip title="Dismiss Notification">
          <IconButton
            color="error"
            size={theme.breakpoints.down('md') ? 'small' : 'medium'}
            onClick={onClose}
          >
            <Clear
              color="error"
              fontSize={theme.breakpoints.down('md') ? 'small' : 'medium'}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </ControlPanelBox>
  );
};
