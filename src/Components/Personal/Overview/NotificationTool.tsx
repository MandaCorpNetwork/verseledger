import { Clear, Forward } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';

export const OverviewNotification: React.FC<unknown> = () => {
  return (
    <Box
      data-id="NotificationContainer"
      sx={{
        bgcolor: 'primary.dark',
        display: 'flex',
        justifyContent: 'space-between',
        pr: '1em',
        pl: '1em',
        alignItems: 'center',
      }}
    >
      <IconButton color="secondary">
        <Clear color="error" />
      </IconButton>
      <Box data-id="ToolNameContainer">
        <Typography data-id="ToolName">VerseMarket</Typography>
      </Box>
      <Box data-id="NotificationMessageContiner">
        <Typography data-id="NotificationMessage">
          New Bid on Owned Order #5622819
        </Typography>
      </Box>
      <Box data-id="NavButtonContainer">
        <Button startIcon={<Forward />}>Jump</Button>
      </Box>
    </Box>
  );
};
