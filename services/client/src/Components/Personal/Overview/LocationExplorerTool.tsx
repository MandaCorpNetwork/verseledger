import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { ReadOnlyField } from '@Common/Components/App/ReadOnlyField';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

type LocationExplorerToolProps = {
  selectedLocation: ILocation | null;
  setSelectedLocation: (location: ILocation | null) => void;
};

export const LocationExplorerTool: React.FC<LocationExplorerToolProps> = ({
  setSelectedLocation,
}) => {
  const handleLocationSelect = (location: ILocation | null) => {
    setSelectedLocation(location);
  };
  return (
    <Box
      data-testid="LocationExplorerComponent"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        mt: '1em',
        p: '1em',
      }}
    >
      <Box
        data-testid="LocationExplorer__ TopBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          data-testid="LocationExplorer-TopBox__LeftWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
          <Box
            data-testid="LocationSelectorContainer"
            sx={{
              boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
              backgroundImage:
                'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
              borderLeft: '2px solid',
              borderRight: '2px solid',
              borderColor: 'secondary.main',
              borderRadius: '5px',
              p: '.5em',
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
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </Box>
        </Box>
        <Box
          data-testid="LocationExplorer-TopBox__RightWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
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
        </Box>
      </Box>
      <Box
        data-testid="LocationExplorer__BottomBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <Box>
          <Button color="secondary">Set Location</Button>
          <Button color="warning">Report Crime</Button>
          <Button color="error">Jump To</Button>
        </Box>
      </Box>
    </Box>
  );
};
