import { Box, Button, TextField } from '@mui/material';
import React from 'react';

import { LocationSelection } from '@/Common/LocationSelection';
import { ReadOnlyField } from '@/Common/ReadOnlyField';

export const LocationExplorerTool: React.FC<unknown> = () => {
  return (
    <Box
      data-id="LocationExplorerComponent"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        mt: '.4em',
      }}
    >
      <Box
        data-id="LocationSelectorContainer"
        sx={{ width: '20%', justifySelf: 'center', mt: '1em' }}
      >
        <LocationSelection />
      </Box>
      <Box data-id="LocationTimeDataContainer">
        <ReadOnlyField label="Local Time" />
        <ReadOnlyField label="StarRise Time" />
        <ReadOnlyField label="StarSet Time" />
      </Box>
      <Box
        data-id="NearbyTablesContainer"
        sx={{ display: 'flex', flexDirection: 'row', gap: '1em' }}
      >
        <Box data-id="LocationStatisticsData">
          <TextField
            size="small"
            label="Jurisdiction"
            sx={{ width: '6em' }}
            value="UEE"
          />
          {/* Plan on replacing the Saftey Rating & Population Status with Gauge Component from MuiCharts */}
          <Box>
            <TextField
              size="small"
              label="Safety Rating"
              sx={{ width: '6em' }}
              value="5"
            />
            <TextField
              size="small"
              label="Population"
              sx={{ width: '6em' }}
              value="1000"
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Button color="secondary">Set Location</Button>
        <Button color="warning">Report Crime</Button>
        <Button color="error">Jump To</Button>
      </Box>
    </Box>
  );
};
