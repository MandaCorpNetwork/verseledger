import { Box, Divider, Typography } from '@mui/material';

import { ActiveToolsOverview } from '@/Components/Personal/Overview/ActiveTools';
import { OverviewNotification } from '@/Components/Personal/Overview/NotificationTool';

export const OverviewTool: React.FC<unknown> = () => {
  return (
    <Box
      data-id="OverviewToolContainer"
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexWrap: 'wrap' }}
    >
      <Box data-id="OverviewToolTitle">
        <Typography variant="h3">Overview</Typography>
        <Divider variant="ToolTitle" />
      </Box>
      <Box
        data-id="NotificationToolContainer"
        sx={{
          border: '3px solid',
          borderColor: 'primary.dark',
          padding: '1em',
          margin: '1em',
          width: '35%',
          height: '45%',
          alignItems: 'center',
        }}
      >
        <Box
          data-id="NotificationToolTitle"
          sx={{ display: 'flex', flexDirection: 'column', height: '10%', mb: '1.5em' }}
        >
          <Typography variant="h4">Notifications</Typography>
          <Divider variant="ComponentTitle" />
        </Box>
        <Box
          data-id="NotificationToolContent"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            padding: '1em',
            maxHeight: '75%',
            overflow: 'auto',
            bgcolor: 'rgb(6, 86, 145, .15)',
            borderRadius: '5px',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgb(8, 29, 68)',
              borderRadius: '20px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '20px',
              background: 'rgb(121, 192, 244, .5)',
            },
          }}
        >
          <OverviewNotification />
          <OverviewNotification />
          <OverviewNotification />
          <OverviewNotification />
          <OverviewNotification />
          <OverviewNotification />
        </Box>
      </Box>
      <Box
        data-id="ActiveToolsToolContainer"
        sx={{
          border: '3px solid',
          borderColor: 'primary.dark',
          display: 'flex',
          flexDirection: 'column',
          p: '1em',
          ml: '1em',
          width: '35%',
          height: '40%',
        }}
      >
        <Box data-id="ActiveToolsToolTitle">
          <Typography variant="h4">Active Tools</Typography>
          <Divider variant="ComponentTitle" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActiveToolsOverview />
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">Radio Frequencies</Typography>
        <Divider variant="ComponentTitle" />
      </Box>
      <Box>
        <Typography variant="h4">Location Explorer</Typography>
        <Divider variant="ComponentTitle" />
      </Box>
      <Box>
        <Typography variant="h4">Ship Status</Typography>
        <Divider variant="ComponentTitle" />
      </Box>
    </Box>
  );
};
