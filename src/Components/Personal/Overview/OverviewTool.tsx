import { PowerSettingsNew } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';

import { ActiveToolsOverview } from '@/Components/Personal/Overview/ActiveTools';
import { OverviewNotification } from '@/Components/Personal/Overview/NotificationTool';
import { RadioFrequenciesTool } from '@/Components/Personal/Overview/RadioFrequenciesTool';
import { useState } from 'react';

export const OverviewTool: React.FC<unknown> = () => {
  const [radioOff, setRadioOff] = useState<boolean>(true);

  const RadioIcon = () => {
    if (!radioOff) {
      return <PowerSettingsNew color="success" fontSize="large" />;
    } else {
      return <PowerSettingsNew color="error" fontSize="large" />;
    }
  };

  const toggleRadio = () => {
    setRadioOff(!radioOff);
  };
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
        data-id="RadioFrequenciesToolContainer"
        sx={{
          border: '3px solid',
          borderColor: 'primary.dark',
          display: 'flex',
          flexDirection: 'column',
          p: '1em',
          ml: '1em',
          width: '35%',
          height: '30%',
        }}
      >
        <Box data-id="RadioFrequenciesToolTitle">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Radio Frequencies</Typography>
            <IconButton onClick={toggleRadio} sx={{ ml: 'auto' }}>
              <RadioIcon />
            </IconButton>
          </Box>
          <Divider variant="ComponentTitle" />
        </Box>
        <Box
          data-id="RadioFrequenciesToolContent"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <RadioFrequenciesTool isDisabled={radioOff} />
        </Box>
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
