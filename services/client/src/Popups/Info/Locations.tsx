import { ReadOnlyField } from '@Common/Components/TextFields/ReadOnlyField';
import { Box, Button } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locationSelectors';
import { Logger } from '@Utils/Logger';

export type LocationInfoProps = {
  locationId: string;
};

export const POPUP_LOCATION_INFO = 'locationInfo';

export const LocationInfoPopup: React.FC<LocationInfoProps> = ({ locationId }) => {
  Logger.info('LocationPopup', locationId);
  const location = useAppSelector((state) => selectLocationById(state, locationId));

  return (
    <VLPopup
      data-testid="Location__Popup"
      name={POPUP_LOCATION_INFO}
      title={location ? location.short_name : 'Unknown Location'}
    >
      <Box
        data-testid="LocationPopup__ContentWrapper"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Box data-testid="LocationPopup__ButtonWrapper">
          <Button>Set Location</Button>
          <Button>Report Crime</Button>
          <Button>Open Explorer</Button>
        </Box>
        <Box data-testid="LocationPopup__TimeDataWrapper">
          <ReadOnlyField label="Local Time" />
          <ReadOnlyField label="StarRise Time" />
          <ReadOnlyField label="StarSet Time" />
        </Box>
        <Box data-testid="LocationPopup__">
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
    </VLPopup>
  );
};
