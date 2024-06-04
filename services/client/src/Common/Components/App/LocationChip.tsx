import { Place } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locationSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

type LocationChipProps = {
  locationId: string;
  onDelete?: (locationId: string) => void;
};

export const LocationChip: React.FC<LocationChipProps> = (props) => {
  const { locationId, onDelete } = props;
  const dispatch = useAppDispatch();

  const handleLocationInfoPopup = () => {
    dispatch(openPopup(POPUP_LOCATION_INFO, { locationId }));
  };

  const location = useAppSelector((state) => selectLocationById(state, locationId));

  return (
    <Tooltip title={location?.short_name}>
      <Chip
        data-testid="LocationChip"
        label={location?.short_name}
        color="secondary"
        variant="outlined"
        icon={<Place />}
        size="small"
        onClick={handleLocationInfoPopup}
        onDelete={onDelete ? () => onDelete(locationId) : undefined}
        sx={{
          maxWidth: '125px',
        }}
      />
    </Tooltip>
  );
};
