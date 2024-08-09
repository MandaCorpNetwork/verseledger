import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { Clear, Forward } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, Typography, useTheme } from '@mui/material';

export const OverviewNotification: React.FC<unknown> = () => {
  const theme = useTheme();
  return (
    <ControlPanelBox
      data-testid="NotificationContainer"
      sx={{
        justifyContent: 'space-between',
        px: { xs: '.2em', md: '1em' },
        alignItems: 'center',
        gap: '.5em',
      }}
    >
      <Tooltip title="Dismiss Notification">
        <IconButton
          color="error"
          size={theme.breakpoints.down('md') ? 'small' : 'medium'}
        >
          <Clear
            color="error"
            fontSize={theme.breakpoints.down('md') ? 'small' : 'medium'}
          />
        </IconButton>
      </Tooltip>
      <Typography
        data-id="ToolName"
        variant={theme.breakpoints.down('md') ? 'body2' : 'body1'}
      >
        VerseMarket
      </Typography>
      <Box data-testid="NotificationMessageContiner">
        <Typography
          data-testid="NotificationMessage"
          align="center"
          variant={theme.breakpoints.down('md') ? 'body2' : 'body1'}
        >
          New Bid on Owned Order #5622819
        </Typography>
      </Box>
      <Box data-testid="NavButtonContainer">
        <Button
          color="secondary"
          startIcon={<Forward />}
          size={theme.breakpoints.down('md') ? 'small' : 'medium'}
        >
          Jump
        </Button>
      </Box>
    </ControlPanelBox>
  );
};
