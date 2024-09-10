import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
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
import { Gauge, SparkLineChart } from '@mui/x-charts';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locationSelectors';

export type LocationInfoProps = {
  locationId: string;
};

export const POPUP_LOCATION_INFO = 'locationInfo';

export const LocationInfoPopup: React.FC<LocationInfoProps> = ({ locationId }) => {
  const location = useAppSelector((state) => selectLocationById(state, locationId));

  return (
    <VLPopup
      data-testid="Location__Popup"
      name={POPUP_LOCATION_INFO}
      title={location ? location.short_name : 'Unknown Location'}
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
          <Button variant="outlined" color="success" size="small">
            Set Location
          </Button>
          <Button variant="outlined" color="error" size="small">
            Report Crime
          </Button>
          <Button variant="outlined" color="secondary" size="small">
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
                Planet
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
            <Box
              data-testid="LocationPopup-Information-UserBasedInfo__SafteyMeter_Wrapper"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography>Saftey Rating</Typography>
              <Gauge
                value={75}
                startAngle={-110}
                endAngle={110}
                text={`Danger`}
                width={120}
                height={100}
              />
            </Box>
          </Box>
        </PopupFormDisplay>
      </Box>
    </VLPopup>
  );
};
