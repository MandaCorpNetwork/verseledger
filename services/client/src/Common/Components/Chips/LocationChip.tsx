import { Place } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { POPUP_LOCATION_INFO } from '@Popups/Info/Locations';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectLocationById } from '@Redux/Slices/Locations/locations.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

import { useSoundEffect } from '@/AudioManager';

type LocationChipProps = {
  locationId: string;
  onDelete?: (locationId: string) => void;
  sx?: object;
  ['data-testid']?: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  iconSize?: 'small' | 'medium' | 'large';
};

export const LocationChip: React.FC<LocationChipProps> = (props) => {
  const {
    locationId,
    onDelete,
    sx,
    'data-testid': testid = 'Chip',
    variant = 'outlined',
    size = 'small',
    color = 'secondary',
    iconSize = 'medium',
  } = props;
  const { playSound } = useSoundEffect();
  const dispatch = useAppDispatch();

  const location = useAppSelector((state) => selectLocationById(state, locationId));

  const handleLocationInfoPopup = () => {
    if (locationId !== '') {
      playSound('open');
      dispatch(openPopup(POPUP_LOCATION_INFO, { locationId }));
    }
  };

  return (
    <Tooltip title={location ? location.waypoint_name : 'Redacted'}>
      <Chip
        data-testid={`LocationChip__${testid}_root`}
        label={location ? location.waypoint_name : 'Redacted'}
        color={color}
        variant={variant}
        icon={<Place fontSize={iconSize} />}
        size={size}
        onClick={handleLocationInfoPopup}
        onDelete={onDelete ? () => onDelete(locationId) : undefined}
        sx={{
          maxWidth: '100px',
          ...sx,
        }}
      />
    </Tooltip>
  );
};
