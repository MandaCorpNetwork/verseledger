// This is the LocationsForm Component for the CreateContracts Component. It adds up to 6 Locations to the Contract. It requires the input of a Starting Location. When the plus button is clicked, a Final Location Autocomplete is added at the bottom to be selected, any addition presses of the add button will map Location `${locationCount}` to the Contract.
import { AddCircleOutline, Check } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { ReactElement } from 'react';

type AdditionalLocationProps = {
  count: number;
  label: string;
};
// Props to be passed into the AdditionalLocation Component, which is what is rendered on the form when the add button is pressed.

const additionalLocations: React.FC<AdditionalLocationProps> = ({ label }) => {
  return (
    <FormLabel>
      {label}
      {/*{label} passes the 'Final Location' or 'Location ${locationCount}' set in the Locations Form*/}
      <FormControl>
        {/*{locationTestDB} is a placeholder for the actual locations pulled from the API*/}
        <Autocomplete
          options={locationTestDB}
          renderInput={(params) => <TextField {...params} label="Location" />}
          renderOption={(props, option, { selected }) => (
            <MenuItem {...props} sx={{ display: 'flex' }}>
              {option.label}
              {selected && (
                <Check
                  sx={{
                    color: 'secondary.main',
                    ml: 'auto',
                    opacity: 0.6,
                    fontSize: '1.2em',
                  }}
                />
              )}
            </MenuItem>
          )}
        />
      </FormControl>
    </FormLabel>
  );
};

export const LocationsForm: React.FC<unknown> = () => {
  interface Location {
    label: string;
  }
  //This interface is for identifying the the label property of additionalLocations that is inserted into the locations state to save components to the state.
  const [locations, setLocations] = React.useState<Location[]>([]);
  // The locations state is used to store the components that are rendered on the form when the add button is pressed.
  const [locationCount, setLocationCount] = React.useState(1);
  // The locationCount state is used to increment the label property of additionalLocations that is inserted into the locations state to save components to the state.

  const label = locationCount === 1 ? 'Final Location' : `Location ${locationCount}`;
  // This is used to set the label property of additionalLocations Component so that the last component rendered on the form is 'Final Location' and the remaining ones are 'Location ${locationCount}'

  const handleAddingLocation = () => {
    setLocationCount(locationCount + 1);
    //Increments the locationCount state by 1.
    setLocations([...locations, additionalLocations({ count: locationCount, label })]);
    //Inserts the additionalLocations Component into the locations state.
  };
  // This handler is triggered by the AddLocation button.

  const addLocationsComponents = locations.map((loc) => (
    <additionalLocations key={loc.label} label={loc.label} />
  ));
  // This function is used to map the additionalLocations saved to the locations state to be able to be filtered to put 'Final Location' at the bottom of the form.

  const finalLocation = addLocationsComponents.find(
    (l) => l.props.label === 'Final Location',
  );
  // A constant used to find the additionalLocations Component with the 'Final Location' label to render below the others in the JSX.
  const otherLocations = addLocationsComponents.filter(
    (l) => l.props.label !== 'Final Location',
  );
  // A constant used to filter the additionalLocations Components to remove the one with the 'Final Location' label to render above the finalLocation const in JSX.

  return (
    <Box>
      <FormGroup>
        <FormLabel>
          Starting Location
          <FormControl>
            {/*Below is the Starting Location Autocomplete that is required to be answered*/}
            <Autocomplete
              options={locationTestDB}
              renderInput={(params) => <TextField {...params} label="Location" />}
              renderOption={(props, option, { selected }) => (
                <MenuItem {...props} sx={{ display: 'flex' }}>
                  {option.label}
                  {selected && (
                    <Check
                      sx={{
                        color: 'secondary.main',
                        ml: 'auto',
                        opacity: 0.6,
                        fontSize: '1.2em',
                      }}
                    />
                  )}
                </MenuItem>
              )}
            />
          </FormControl>
        </FormLabel>
        {otherLocations}
        {/*The otherLocations constant is mapped to render the additionalLocations Components above the finalLocation constant*/}
        {finalLocation}
        {/*The finalLocation constant is rendered below the otherLocations constant*/}
        <IconButton onClick={handleAddingLocation}>
          {/*The AddLocation button that triggers the handleAddingLocation handler*/}
          <AddCircleOutline color="secondary" />
        </IconButton>
      </FormGroup>
    </Box>
  );
};

// TestDB for locations to be replaced by the API
const locationTestDB = [
  { star: 'Stanton', body: 'Hurston', location: 'Loreville', label: 'Loreville' },
  { star: 'Stanton', body: 'Hurston', location: 'Everus Harbor', label: 'Everus Harbor' },
  { star: 'Stanton', body: 'Aberdeen', location: 'Klecher', label: 'Klecher' },
  { star: 'Stanton', body: 'Hurston', location: `Cutter's Rig`, label: `Cutter's Rig` },
  { star: 'Stanton', body: 'Hurston', location: `Finn's Folly`, label: `Finn's Folly` },
  {
    star: 'Stanton',
    body: 'Hurston',
    location: 'HDES Calthrope',
    label: 'HDES Calthrope',
  },
];
