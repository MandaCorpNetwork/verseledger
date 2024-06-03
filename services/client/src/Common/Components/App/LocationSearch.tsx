import { Autocomplete, Box } from '@mui/material';

type LocationSearchProps = {
  location: Location;
  onLocationSelect: (locationId: Location | null) => void;
};

export const LocationSearch: React.FC<LocationSearchProps> = (props)  => {
  const {
    location,
    onLocationSelect,
  } = props;
  return (
    <Box>
      <Autocomplete
        data-testid="LocationSearch"
        />
    </Box>
  );
}
