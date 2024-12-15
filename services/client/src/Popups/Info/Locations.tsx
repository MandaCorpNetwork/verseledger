import { useSoundEffect } from '@Audio/AudioManager';
import PopupFormDisplay from '@CommonLegacy/Components/Boxes/PopupFormDisplay';
import { PopupFormSelection } from '@CommonLegacy/Components/Boxes/PopupFormSelection';
import { DigiField } from '@CommonLegacy/Components/Custom/DigiField/DigiField';
import { ReadOnlyField } from '@CommonLegacy/Components/TextFields/ReadOnlyField';
import { ContentCopy, GpsFixed } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { SparkLineChart } from '@mui/x-charts';
import { type TitleWithObject, VLPopup } from '@Popups/PopupWrapper/Popup';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { setUserLocation } from '@Redux/Slices/Auth/Actions/setUserLocation.action';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { selectLocationById } from '@Redux/Slices/Locations/locations.selectors';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { useNavigate } from 'react-router';
import type { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export type LocationInfoProps = {
  locationId: string;
};

export const POPUP_LOCATION_INFO = 'locationInfo';

export const LocationInfoPopup: React.FC<LocationInfoProps> = ({ locationId }) => {
  const location = useAppSelector((state) => selectLocationById(state, locationId));
  const currentLocation = useAppSelector(selectUserLocation);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();

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
        onAccept: handleSetLocation(location),
        clickaway: 'true',
        testid: 'LocationExplorer__SetLocation',
      }),
    );
  }, [dispatch, handleSetLocation, location]);

  const currentLocationIcon = React.useMemo(
    () => (
      <Tooltip title="Current Location" arrow>
        <GpsFixed />
      </Tooltip>
    ),
    [],
  );

  const onLocation = currentLocation.id === locationId;

  const getPopupTitle = React.useCallback(() => {
    if (location) {
      if (onLocation) {
        return {
          text: location.waypoint_name,
          object: currentLocationIcon,
        } as TitleWithObject;
      }
      return location.waypoint_name;
    } else {
      return 'Unknown Location';
    }
  }, [location, onLocation, currentLocationIcon]);

  const popupTitle = getPopupTitle();

  const handleOpenExplorer = React.useCallback(() => {
    sound.playSound('navigate');
    navigate(`/apps/explore/${location?.id}`);
    dispatch(closePopup(POPUP_LOCATION_INFO));
  }, [sound, navigate, dispatch, location?.id]);

  return (
    <VLPopup
      data-testid="Location__Popup"
      name={POPUP_LOCATION_INFO}
      title={popupTitle}
      sx={{
        minWidth: '500px',
      }}
    >
      <Box
        data-testid="LocationPopup__ContentWrapper"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <PopupFormSelection
          data-testid="LocationPopup__ButtonWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: '1em',
            py: '.5em',
            px: '.2em',
          }}
        >
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleSetLocationVerify}
            disabled={currentLocation.id === location?.id}
          >
            Set Location
          </Button>
          <Button variant="outlined" color="error" size="small" disabled>
            Route To
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleOpenExplorer}
          >
            Open Explorer
          </Button>
        </PopupFormSelection>
        <PopupFormDisplay
          data-testid="LocationPopup__TimeDataWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <ReadOnlyField label="Local Time" />
          <Box
            data-testid="LocationPopup-TimeData__LightTime_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'space-between',
              mb: '.5em',
            }}
          >
            <ReadOnlyField label="StarRise Time" />
            <ReadOnlyField label="StarSet Time" />
          </Box>
        </PopupFormDisplay>
        <PopupFormDisplay
          data-testid="LocationPopup__InformationWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            p: '.5em',
            mt: '1em',
          }}
        >
          <Box
            data-testid="LocationPopup-Information__StaticInfo_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1em',
            }}
          >
            <Box data-testid="LocationPopup-Information-StaticInfo__Coordiantes_Wrapper">
              <Typography data-testid="LocationPopup-Information-StaticInfo__Coordiantes_Title">
                Coordinates
              </Typography>
              <Tooltip
                data-testid="LocationPopup-Information-StaticInfo__Coordiantes_Tooltip"
                title={`x: ${location?.x}, y: ${location?.y}, z: ${location?.z}`}
              >
                <TextField
                  data-testid="LocationPopup-Information-StaticInfo__Coordiante_Field"
                  size="small"
                  value={`x: ${location?.x}, y: ${location?.y}, z: ${location?.z}`}
                  fullWidth
                  slotProps={{
                    input: {
                      inputProps: {
                        sx: {
                          textAlign: 'center',
                        },
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <ContentCopy />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Tooltip>
            </Box>
            <Box
              data-testid="LocationPopup-Information-StaticInfo__Parents_Wrapper"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <DigiField label="Moon" sx={{ minWidth: '100px' }}>
                Moon
              </DigiField>
              <DigiField label="Planet" sx={{ minWidth: '100px' }}>
                {location?.parent}
              </DigiField>
              <DigiField label="Star" sx={{ minWidth: '100px' }}>
                Star
              </DigiField>
            </Box>
          </Box>
          <Box
            data-testid="LocationPopup-Information__UserBasedInfo_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '.5em',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'stretch',
              mt: '1em',
            }}
          >
            <Box
              data-testid="LocationPopup-Information-UserBasedInfo__PopulationChart_Container"
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: 3 }}
            >
              <Typography data-testid="LocationPopup-Information-UserBasedInfo__PopulationChart_Title">
                Population
              </Typography>
              <SparkLineChart
                height={100}
                data={[2500, 800, 1500, 900, 700, 600, 3200]}
              />
            </Box>
          </Box>
        </PopupFormDisplay>
      </Box>
    </VLPopup>
  );
};
