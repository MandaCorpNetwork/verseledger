import { useSoundEffect } from '@Audio/AudioManager';
import {
  Autocomplete,
  createFilterOptions,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations.action';
import { selectLocationsArray } from '@Redux/Slices/Locations/locations.selectors';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

//Filter Options property from MUI AutoComplete
//Typed Filter Sorting
const filterOptions = createFilterOptions<ILocation>({
  matchFrom: 'any',
  stringify: ({ parent, short_name }) => `${short_name} ${parent}`.trim(),
});

const menuSizeValues = {
  xs: 200,
  s: 300,
  m: 400,
  l: 500,
  xl: 600,
  xxl: 700,
};
//Type Def for the LocationSearch Component
//Handler for Location Selection
//Width setter --optional--
//Menu Size to set the Popper List Size
//If the Menu Opens to the top, try choosing a smaller Size
type LocationSearchProps = {
  onLocationSelect: (location: ILocation | null) => void;
  width?: string;
  helperText?: string;
  margin?: string;
  required?: boolean;
  menuSize?: keyof typeof menuSizeValues;
  sx?: object;
  label?: string;
};

//TODO: Move Locations to Local Storage for Faster Loading
export const LocationSearch: React.FC<LocationSearchProps> = (props) => {
  const {
    onLocationSelect,
    width,
    helperText,
    margin,
    required,
    menuSize = 'm',
    sx,
    label = 'Search Locations',
  } = props;
  const [inputValue, setInputValue] = React.useState<ILocation | null>(null);
  //InputValue State Setter using ILocation Schema

  const sound = useSoundEffect();

  const dispatch = useAppDispatch();

  //Set the State with the Locations Selector
  const locations: ILocation[] = useAppSelector(selectLocationsArray);

  //Set the User Location Default
  const currentUserLocation = useAppSelector(selectUserLocation);

  //Location Query Result Fetcher
  React.useEffect(() => {
    //API Call
    dispatch(fetchLocations());
  }, [dispatch]);

  React.useEffect(() => {
    if (currentUserLocation && locations.length > 0) {
      const selectedLocation = locations.find((loc) => loc.id === currentUserLocation.id);
      if (selectedLocation) {
        setInputValue(selectedLocation);
      }
    }
  }, [currentUserLocation, locations]);

  return (
    <>
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
        noOptionsText={'Unknown Location'}
        filterOptions={filterOptions}
        autoHighlight
        getOptionLabel={(option) => option.short_name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${label}${required ? ' *' : ''}`}
            variant="outlined"
            size="small"
            color="secondary"
            helperText={helperText}
            slotProps={{
              formHelperText: {
                margin: 'dense',
                sx: {
                  color: 'info.main',
                  mx: 'auto',
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem
            {...props}
            key={props.key}
            sx={{ display: 'flex' }}
            onMouseEnter={() => sound.playSound('hover')}
          >
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
              <div>
                <Typography>{group}</Typography>
              </div>
              {params.children}
            </li>
          );
        }}
        sx={{
          width: width,
          mb: helperText ? '.8em' : '',
          m: margin,
          ...sx,
        }}
        ListboxProps={{
          sx: {
            maxHeight: menuSizeValues[menuSize],
          },
        }}
      />
    </>
  );
};
