import { Place } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locationSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

type LocationChipProps = {
  locationId: string;
  onDelete?: (locationId: string) => void;
  sx?: object;
};

export const LocationChip: React.FC<LocationChipProps> = (props) => {
  const { locationId, onDelete, sx } = props;
  const dispatch = useAppDispatch();

  const location =
    locationId !== ''
      ? useAppSelector((state) => selectLocationById(state, locationId))
      : null;

  const handleLocationInfoPopup = () => {
    if (locationId !== '') {
      dispatch(openPopup(POPUP_LOCATION_INFO, { locationId }));
    }
  };

  return (
    <Tooltip title={location ? location.short_name : 'Redacted'}>
      <Chip
        data-testid="LocationChip"
        label={location ? location.short_name : 'Redacted'}
        color="secondary"
        variant="outlined"
        icon={<Place />}
        size="small"
        onClick={handleLocationInfoPopup}
        onDelete={onDelete ? () => onDelete(locationId) : undefined}
        sx={{
          ...sx,
        }}
      />
    </Tooltip>
  );
};
