import {
  Autocomplete,
  Box,
  createFilterOptions,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations';
import { selectLocationsArray } from '@Redux/Slices/Locations/locationSelectors';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

//Filter Options property from MUI AutoComplete
//Typed Filter Sorting
const filterOptions = createFilterOptions<ILocation>({
  matchFrom: 'any',
  stringify: ({ parent, short_name }) => `${short_name} ${parent}`.trim(),
});

//Type Def for the LocationSearch Component
//Handler for Location Selection
//Width setter --optional--
type LocationSearchProps = {
  onLocationSelect: (locationId: ILocation | null) => void;
  width?: string;
  helperText?: string;
};

export const LocationSearch: React.FC<LocationSearchProps> = (props) => {
  const { onLocationSelect, width, helperText } = props;
  const [inputValue, setInputValue] = React.useState<ILocation | null>(null);
  //InputValue State Setter using ILocation Schema

  const dispatch = useAppDispatch();

  //Set the State with the Locations Selector
  const locations = useAppSelector(selectLocationsArray);

  //Location Query Result Fetcher
  React.useEffect(() => {
    //API Call
    dispatch(fetchLocations());
  }, []);

  return (
    <Box>
      <Autocomplete
        data-testid="LocationSearch"
        onChange={(_, newValue) => {
          setInputValue(newValue);
          onLocationSelect(newValue);
        }}
        value={inputValue}
        options={locations
          .sort((a, b) => -b.short_name.localeCompare(a.short_name))
          .sort(
            (a, b) =>
              -(b.parent ?? '_Stellar Body').localeCompare(a.parent ?? '_Stellar Body'),
          )}
        groupBy={(l) => l.parent ?? '_Stellar Body'}
        noOptionsText={'Enter Location'}
        filterOptions={filterOptions}
        autoHighlight
        getOptionLabel={(option) => option.short_name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Locations"
            variant="outlined"
            size="small"
            color="secondary"
            helperText={helperText}
            FormHelperTextProps={{
              margin: 'dense',
              disabled: true,
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} sx={{ display: 'flex' }}>
            <Typography>{option.short_name}</Typography>
            {option.category != 'Uncategorized' && (
              <Typography
                sx={{ ml: '.5em', color: 'text.secondary' }}
              >{`- ${option.category}`}</Typography>
            )}
          </MenuItem>
        )}
        renderGroup={(params) => {
          const group = params.group[0] == '_' ? params.group.slice(1) : params.group;
          return (
            <li key={params.key}>
              <Box>
                <Typography>{group}</Typography>
              </Box>
              {params.children}
            </li>
          );
        }}
        sx={{
          width: width,
          mb: helperText ? '.8em' : '',
        }}
      />
    </Box>
  );
};
