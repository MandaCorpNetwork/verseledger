import { useSoundEffect } from '@Audio/AudioManager';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
import { ContentCopy } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { setUserLocation } from '@Redux/Slices/Auth/Actions/setUserLocation.action';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
// import { Gauge, gaugeClasses } from '@mui/x-charts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();
  const currentLocation = useAppSelector(selectUserLocation);
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

  const handleSetLocationVerify = React.useCallback(() => {
    dispatch(
      openPopup(POPUP_YOU_SURE, {
        title: 'Change Location',
        subjectText: 'Change the current Location',
        bodyText:
          'This action will change your currently set location, which can impact certain experiences throughout Verse Ledger',
        onAccept: handleSetLocation,
        clickaway: 'true',
        testid: 'LocationExplorer__SetLocation',
      }),
    );
  }, [dispatch, handleSetLocation]);

  const handleOpenInfo = React.useCallback(
    (locationId: string | null | undefined) => {
      if (locationId == null) return playSound('denied');
      playSound('navigate');
      navigate(`/apps/explore/${locationId}`);
    },
    [playSound, navigate],
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
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
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
            width: { xs: '100%', md: '50%' },
            alignItems: 'center',
          }}
        >
          <ControlPanelBox
            data-testid="LocationSelectorContainer"
            sx={{
              width: { xs: '100%', md: '60%' },
              p: '.5em',
              justifyContent: 'stretch',
            }}
          >
            <LocationSearch onLocationSelect={handleLocationSelect} width="100%" />
          </ControlPanelBox>
          <DigiBox
            data-testid="LocationExplorer-TopBox-LeftBox__LocationInfoWrapper"
            sx={{
              p: '.5em',
              my: '.5em',
            }}
          >
            {selectedLocation && (
              <>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'bold',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '.2em',
                  }}
                >
                  {selectedLocation?.waypoint_name}
                  {currentLocation?.id == selectedLocation.id && (
                    <Chip
                      label="Current Location"
                      variant="filled"
                      color="info"
                      size="small"
                      sx={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,.6)',
                      }}
                    />
                  )}
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
          </DigiBox>
        </Box>
        <Box
          data-testid="LocationExplorer-TopBox__RightWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            width: { xs: '100%', md: '50%' },
          }}
        >
          <DigiBox
            data-testid="LocationTimeDataContainer"
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              my: '.5em',
            }}
          >
            <ReadOnlyField label="Local Time" />
            <ReadOnlyField label="StarRise Time" />
            <ReadOnlyField label="StarSet Time" />
          </DigiBox>
          {/* <Box
            data-testid="NearbyTablesContainer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1em',
              justifyContent: 'center',
            }}
          >
            <DigiBox
              data-id="LocationStatisticsData"
              sx={{
                p: '.5em',
                gap: '.2em',
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
            </DigiBox>
          </Box> */}
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
            <ControlPanelBox
              sx={{
                p: '.2em',
              }}
            >
              <Button color="secondary" onClick={handleSetLocationVerify}>
                Set Location
              </Button>
              <Button color="warning">Add Stop</Button>
              <Button
                color="info"
                disabled={!selectedLocation}
                onClick={() => handleOpenInfo(selectedLocation?.id)}
              >
                Open Info
              </Button>
            </ControlPanelBox>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
