import { Box } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';

export type LocationInfoProps = {
  location: string;
};

export const POPUP_LOCATION_INFO = 'locationInfo';

export const LocationInfoPopup: React.FC<LocationInfoProps> = ({ location }) => {
  return (
    <VLPopup name={POPUP_LOCATION_INFO} title={location}>
      <Box>For sure a place of sorts....</Box>
    </VLPopup>
  );
};
