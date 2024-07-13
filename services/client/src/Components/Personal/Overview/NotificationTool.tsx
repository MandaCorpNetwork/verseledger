import { Clear, Forward } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';

export const OverviewNotification: React.FC<unknown> = () => {
  return (
    <Box
      data-testid="NotificationContainer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        pr: '1em',
        pl: '1em',
        alignItems: 'center',
        boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
        backgroundImage:
          'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: 'secondary.main',
        borderRadius: '5px',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '5px 5px',
          opacity: 0.5,
        },
        '&:hover': {
          backgroundImage:
            'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
          borderColor: 'secondary.light',
          boxShadow: '0 0 5px 2px rgba(14,49,252,.4)',
        },
        transition: 'all 0.3s',
      }}
    >
      <Tooltip title="Dismiss Notification">
        <IconButton color="error">
          <Clear color="error" />
        </IconButton>
      </Tooltip>
      <Box data-testid="ToolNameContainer">
        <Typography data-id="ToolName">VerseMarket</Typography>
      </Box>
      <Box data-testid="NotificationMessageContiner">
        <Typography data-testid="NotificationMessage">
          New Bid on Owned Order #5622819
        </Typography>
      </Box>
      <Box data-testid="NavButtonContainer">
        <Button color="secondary" startIcon={<Forward />}>
          Jump
        </Button>
      </Box>
    </Box>
  );
};
