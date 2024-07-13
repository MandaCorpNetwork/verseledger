import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { ReadOnlyField } from '@Common/Components/App/ReadOnlyField';
import { ContentCopy } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { setUserLocation } from '@Redux/Slices/Auth/Actions/setUserLocation';
// import { Gauge, gaugeClasses } from '@mui/x-charts';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

type LocationExplorerToolProps = {
  selectedLocation: ILocation | null;
  setSelectedLocation: (location: ILocation | null) => void;
};

export const LocationExplorerTool: React.FC<LocationExplorerToolProps> = ({
  setSelectedLocation,
  selectedLocation,
}) => {
  const dispatch = useAppDispatch();
  const handleLocationSelect = (location: ILocation | null) => {
    setSelectedLocation(location);
  };

  const handleSetLocation = React.useCallback(
    (selectedLocation: ILocation | null) => {
      if (selectedLocation) {
        dispatch(setUserLocation(selectedLocation));
      }
    },
    [dispatch],
  );
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
        mt: '.5em',
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
            width: '50%',
            alignItems: 'center',
          }}
        >
          <Box
            data-testid="LocationSelectorContainer"
            sx={{
              width: '60%',
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
          <Box
            data-testid="LocationExplorer-TopBox-LeftBox__LocationInfoWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              p: '.5em',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            {selectedLocation && (
              <>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                >
                  {selectedLocation?.waypoint_name}
                </Typography>
                <TextField
                  size="small"
                  label="Parent"
                  value={selectedLocation?.parent}
                  color="secondary"
                  margin="dense"
                />
                <Tooltip
                  title={`x: ${selectedLocation?.x}, y: ${selectedLocation?.y}, z: ${selectedLocation?.z}`}
                >
                  <TextField
                    size="small"
                    label="Coordinates"
                    value={`x: ${selectedLocation?.x}, y: ${selectedLocation?.y}, z: ${selectedLocation?.z}`}
                    color="secondary"
                    margin="dense"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Tooltip>
              </>
            )}
            {!selectedLocation && (
              <Typography
                variant="body1"
                align="center"
                sx={{ color: 'text.secondary', fontWeight: 'bold' }}
              >
                Select a location to view information
              </Typography>
            )}
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
          <Box
            data-testid="LocationTimeDataContainer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              borderLeft: '1px solid rgba(14,49,141,0.5)',
              borderRight: '1px solid rgba(14,49,141,0.5)',
              boxShadow: '0 5px 15px rgba(14,49,141,.8)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background:
                  'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                opacity: 0.6,
                backdropFilter: 'blur(10px)',
                zIndex: -1,
                backgroundImage:
                  'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                backgroundSize: '100% 2px',
              },
            }}
          >
            <ReadOnlyField label="Local Time" />
            <ReadOnlyField label="StarRise Time" />
            <ReadOnlyField label="StarSet Time" />
          </Box>
          {/* <Box
            data-testid="NearbyTablesContainer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1em',
              justifyContent: 'center',
            }}
          >
            <Box
              data-id="LocationStatisticsData"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderRadius: '5px',
                borderColor: 'primary.main',
                borderLeft: '1px solid rgba(14,49,141,0.5)',
                borderRight: '1px solid rgba(14,49,141,0.5)',
                boxShadow: '0 5px 15px rgba(14,49,141,.8)',
                position: 'relative',
                p: '.5em',
                gap: '.2em',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  background:
                    'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
                  opacity: 0.6,
                  backdropFilter: 'blur(10px)',
                  zIndex: -1,
                  backgroundImage:
                    'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
                  backgroundSize: '100% 2px',
                },
              }}
            >
              <TextField
                size="small"
                label="Jurisdiction"
                sx={{ width: '6em' }}
                value="UEE"
              />
              {/* Plan on replacing the Saftey Rating & Population Status with Gauge Component from MuiCharts 
              <Box
                data-testid="LocationStatisticsData"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Box
                  data-testid="LocationStatisticsData__SafteyRating"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    Saftey Rating
                  </Typography>
                  <Gauge
                    value={75}
                    startAngle={-110}
                    endAngle={110}
                    width={50}
                    height={50}
                    text=""
                  />
                </Box>
                <TextField
                  size="small"
                  label="Population"
                  sx={{ width: '6em' }}
                  value="1000"
                />
              </Box>
            </Box>
          </Box> */}
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
          mt: 'auto',
          mb: '.2em',
        }}
      >
        <Box
          sx={{
            boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
            backgroundImage:
              'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
            borderLeft: '2px solid',
            borderRight: '2px solid',
            borderColor: 'secondary.main',
            borderRadius: '5px',
            p: '.2em',
            position: 'relative',
            ml: 'auto',
            mr: '10%',
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
          <Button color="secondary" onClick={() => handleSetLocation}>
            Set Location
          </Button>
          <Button color="warning">Report Crime</Button>
          <Button color="error">Jump To</Button>
        </Box>
      </Box>
    </Box>
  );
};
