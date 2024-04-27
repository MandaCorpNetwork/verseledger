import { Place } from '@mui/icons-material';
import { Chip } from '@mui/material';

type LocationChipProps = {
  label?: string;
};

export const LocationChip: React.FC<LocationChipProps> = () => {
  return (
    <>
      <Chip
        data-testid="LocationChip"
        label="Location"
        color="secondary"
        variant="outlined"
        icon={<Place />}
        size="small"
      />
    </>
  );
};
