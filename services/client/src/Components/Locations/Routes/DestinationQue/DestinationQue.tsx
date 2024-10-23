import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Functions } from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations.action';
import { selectLocationsArray } from '@Redux/Slices/Locations/locations.selectors';
import { replaceDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import { numericalFilter } from '@Utils/numericFilter';
import React from 'react';
import { IDestination, IMission } from 'vl-shared/src/schemas/RoutesSchema';

import { binaryLocationTree, getEfficentDistancePath } from '../RouteUtilities';
import { StaticDestinationTable } from './StaticDestinationTable';

type DestinationQueProps = {
  destinations: IDestination[];
  missions: IMission[];
};

export const DestinationQue: React.FC<DestinationQueProps> = ({
  destinations,
  missions,
}) => {
  const [routeOrder, setRouteOrder] = React.useState<string>('custom');
  const [maxLoad, setMaxLoad] = React.useState<number | null>(null);
  const [currentLoad, setCurrentLoad] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();
  const handleRouteOrder = React.useCallback(
    (value: string) => {
      setRouteOrder(value);
    },
    [setRouteOrder],
  );
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const locations = useAppSelector(selectLocationsArray);

  const userLocation = useAppSelector(selectUserLocation);

  const locationTree = React.useMemo(() => {
    return binaryLocationTree(locations);
  }, [locations]);

  const evaluateDistanceRoute = React.useCallback(() => {
    const route = getEfficentDistancePath(
      missions,
      userLocation ?? null,
      locationTree,
      maxLoad ?? 0,
      currentLoad ?? 0,
    );
    dispatch(replaceDestinations(route));
  }, [missions, userLocation, locationTree, dispatch, maxLoad, currentLoad]);

  const handleRouteEvaluation = React.useCallback(() => {
    if (routeOrder === 'distance') {
      evaluateDistanceRoute();
    }
  }, [routeOrder, evaluateDistanceRoute]);

  const handleLoadChange = React.useCallback((value: string, option: string) => {
    const filteredValue = numericalFilter(value);
    if (option === 'max') {
      setMaxLoad(filteredValue);
    }
    if (option === 'current') {
      setCurrentLoad(filteredValue);
    }
  }, []);
  return (
    <GlassBox
      data-testid="RouteTool__DestinationList__Wrapper"
      sx={{ p: '1em', gap: '1em', height: '100%', minWidth: '400px', flexGrow: '1' }}
    >
      <Box
        data-testid="RouteTool-DestinationList__TitleBar_Wrapper"
        sx={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography data-testid="RouteTool__DestinationList_Title" variant="h5">
          Destinations
        </Typography>
        <Box>
          <FormControl>
            <InputLabel color="secondary">Route Order</InputLabel>
            <Select
              labelId="Route Order"
              label="Route Order"
              value={routeOrder}
              size="small"
              color="secondary"
              onChange={(e) => handleRouteOrder(e.target.value)}
            >
              <MenuItem value={'custom'}>Custom</MenuItem>
              <MenuItem value={'distance'}>Distance</MenuItem>
              <MenuItem value={'fuel'} disabled>
                Fuel
              </MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Calculate Route">
            <IconButton
              size="small"
              disabled={routeOrder === 'custom'}
              onClick={handleRouteEvaluation}
            >
              <Functions />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {routeOrder !== 'custom' && (
        <DigiBox sx={{ py: '.5em', gap: '.5em', px: '2em' }}>
          <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
            <Typography variant="tip" sx={{ px: '1em' }}>
              Enter SCU Info for Calculation
            </Typography>
          </Box>
          <TextField
            label="Max SCU Load"
            size="small"
            value={maxLoad !== null ? maxLoad.toLocaleString() : ''}
            color="secondary"
            onChange={(e) => handleLoadChange(e.target.value, 'max')}
          />
          <TextField
            label="Current SCU Load"
            size="small"
            value={currentLoad !== null ? currentLoad.toLocaleString() : ''}
            color="secondary"
            onChange={(e) => handleLoadChange(e.target.value, 'current')}
          />
        </DigiBox>
      )}
      {destinations.length === 0 && (
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            width: '100%',
            color: 'grey',
            textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
            mt: '5em',
          }}
        >
          No Destinations
        </Typography>
      )}
      {destinations.length > 0 && <StaticDestinationTable destinations={destinations} />}
    </GlassBox>
  );
};
