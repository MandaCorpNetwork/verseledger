import { Place } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import {
  selectContractLocationById,
  selectLocationById,
} from '@Redux/Slices/Locations/locationSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

type LocationChipProps = {
  locationId: string;
  onDelete?: (locationId: string) => void;
  source: string;
};

export const LocationChip: React.FC<LocationChipProps> = (props) => {
  const { locationId, onDelete, source } = props;
  const dispatch = useAppDispatch();

  console.log(`LocationChip: ${locationId}`);

  const location = useAppSelector((state) =>
    source === 'contract'
      ? selectContractLocationById(state, locationId)
      : selectLocationById(state, locationId),
  );

  const handleLocationInfoPopup = () => {
    console.log(`Location Id: ${locationId}`);
    console.log(`Location Pulled: ${location}`);
    dispatch(openPopup(POPUP_LOCATION_INFO, { locationId }));
  };

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
