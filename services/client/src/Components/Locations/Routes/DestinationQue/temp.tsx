import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations.action';
import { numericalFilter } from '@Utils/numericFilter';
import React from 'react';
import { IDestination, IMission } from 'vl-shared/src/schemas/RoutesSchema';

type DestinationQueProps = {
  destinations: IDestination[];
  missions: IMission[];
};

export const DestinationQue: React.FC<DestinationQueProps> = () => {
  const [routeOrder] = React.useState<string>('custom');
  const [maxLoad, setMaxLoad] = React.useState<number | null>(null);
  const [currentLoad, setCurrentLoad] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();
  // const handleRouteOrder = React.useCallback(
  //   (value: string) => {
  //     setRouteOrder(value);
  //   },
  //   [setRouteOrder],
  // );
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  // const locations = useAppSelector(selectLocationsArray);

  // const userLocation = useAppSelector(selectUserLocation);

  // const locationTree = React.useMemo(() => {
  //   return binaryLocationTree(locations);
  // }, [locations]);

  // const evaluateDistanceRoute = React.useCallback(() => {
  //   const route = getEfficentDistancePath(
  //     missions,
  //     userLocation ?? null,
  //     locationTree,
  //     maxLoad ?? 0,
  //     currentLoad ?? 0,
  //   );
  //   dispatch(replaceDestinations(route));
  // }, [missions, userLocation, locationTree, dispatch, maxLoad, currentLoad]);

  // const handleRouteEvaluation = React.useCallback(() => {
  //   if (routeOrder === 'distance') {
  //     evaluateDistanceRoute();
  //   }
  // }, [routeOrder, evaluateDistanceRoute]);

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
        <Box></Box>
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
    </GlassBox>
  );
};
