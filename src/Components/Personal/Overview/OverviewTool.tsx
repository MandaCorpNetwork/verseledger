import { PowerSettingsNew, Sync } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { LocationExplorerTool } from '@/Components/Personal/Overview/LocationExplorerTool';
//import { ActiveToolsOverview } from '@/Components/Personal/Overview/ActiveTools';
import { OverviewNotification } from '@/Components/Personal/Overview/NotificationTool';
import { RadioFrequenciesTool } from '@/Components/Personal/Overview/RadioFrequenciesTool';
import { ShipStatus } from '@/Components/Personal/Overview/ShipStatus';

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box data-id="OverviewToolTitle" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4">Overview</Typography>
        <Divider variant="ToolTitle" />
      </Box>
      <Box
        data-id="OverviewToolFunctionContainer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1em',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '35%', height: '100%' }}
        >
          <Box
            data-id="NotificationToolContainer"
            sx={{
              border: '3px solid',
              borderColor: 'primary.dark',
              padding: '1em',
              margin: '1em',
              width: '100%',
              height: '35%',
              alignItems: 'center',
            }}
          >
            <Box
              data-id="NotificationToolTitle"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '10%',
                mb: '1.5em',
              }}
            >
              <Typography variant="h5">Notifications</Typography>
              <Divider variant="ComponentTitle" />
            </Box>
            <Box
              data-id="NotificationToolContent"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                padding: '1em',
                overflow: 'auto',
                bgcolor: 'rgb(6, 86, 145, .15)',
                borderRadius: '5px',
                height: '85%',
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
              width: '100%',
              height: '30%',
            }}
          >
            <Box data-id="RadioFrequenciesToolTitle">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">Radio Frequencies</Typography>
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
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '55%', height: '100%' }}
        >
          <Box
            data-id="LocationExplorerToolContainer"
            sx={{
              border: '3px solid',
              borderColor: 'primary.dark',
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              margin: '1em',
              width: '100%',
              height: '45%',
            }}
          >
            <Box data-id="LocationExplorerToolTitle" sx={{ height: '10%', p: '.5em' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">Location Explorer</Typography>
                <IconButton sx={{ ml: 'auto' }}>
                  <Sync />
                </IconButton>
              </Box>
              <Divider variant="ComponentTitle" />
            </Box>
            <Box data-id="LocationExplorerToolContent" sx={{ height: '90%' }}>
              <LocationExplorerTool />
            </Box>
          </Box>
          <Box
            data-id="ShipStatusToolContainer"
            sx={{
              border: '3px solid',
              borderColor: 'primary.dark',
              display: 'flex',
              flexDirection: 'column',
              p: '1em',
              ml: '1em',
              width: '100%',
              height: '45%',
            }}
          >
            <Box data-id="ShipStatusToolTitle" sx={{ height: '10%' }}>
              <Typography variant="h5">Ship Status</Typography>
              <Divider variant="ComponentTitle" />
            </Box>
            <Box
              data-id="ShipStatusToolContent"
              sx={{ height: '85%', mt: '1em', p: '.5em' }}
            >
              <ShipStatus />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
