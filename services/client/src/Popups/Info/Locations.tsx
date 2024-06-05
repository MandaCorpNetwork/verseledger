import { Box } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locationSelectors';

export type LocationInfoProps = {
  locationid: string;
};

export const POPUP_LOCATION_INFO = 'locationInfo';

export const LocationInfoPopup: React.FC<LocationInfoProps> = ({ locationid }) => {
  const location = useAppSelector((state) => selectLocationById(state, locationid));

  return (
    <VLPopup
      name={POPUP_LOCATION_INFO}
      title={location ? location.short_name : 'Unknown Location'}
    >
      <Box>For sure a place of sorts....</Box>
    </VLPopup>
  );
};
