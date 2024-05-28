import { Place } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

type LocationChipProps = {
  label?: string;
};

export const LocationChip: React.FC<LocationChipProps> = ({ label }) => {
  const dispatch = useAppDispatch();

  const handleLocationInfoPopup = () => {
    dispatch(openPopup(POPUP_LOCATION_INFO, { label }));
  };
  return (
    <>
      <Chip
        data-testid="LocationChip"
        label={label}
        color="secondary"
        variant="outlined"
        icon={<Place />}
        size="small"
        onClick={handleLocationInfoPopup}
      />
    </>
  );
};
