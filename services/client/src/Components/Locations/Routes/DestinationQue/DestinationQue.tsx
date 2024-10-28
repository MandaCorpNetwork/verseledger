import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Functions } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { CustomDestinationTable } from './CustomTable';
import { MappedLocation } from './TableContent/RouteUtilities';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

type DestinationQueProps = {
  destinations: IDestination[];
  // missions: IMission[];
  locationTree: Map<string, MappedLocation>;
};

type RouteOrder = 'custom' | 'distance' | 'fuel';

export const DestinationQue: React.FC<DestinationQueProps> = ({
  destinations,
  locationTree,
}) => {
  const [routeOrder, setRouteOrder] = React.useState<RouteOrder>('custom');

  const handleRouteOrder = React.useCallback(
    (value: 'custom' | 'distance' | 'fuel') => {
      setRouteOrder(value);
    },
    [setRouteOrder],
  );
  return (
    <GlassBox
      data-testid="RouteTool__DestinationList__Wrapper"
      sx={{ p: '1em', gap: '1em', height: '100%', minWidth: '400px', flexGrow: '1' }}
    >
      <div
        data-testid="RouteTool-DestinationList__TitleBar_Wrapper"
        style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography data-testid="RouteTool__DestinationList_Title" variant="h5">
          Destinations
        </Typography>
        <div>
          <Button variant="contained">Add Stop</Button>
          <FormControl>
            <InputLabel color="secondary">Route Order</InputLabel>
            <Select
              labelId="Route Order"
              label="Route Order"
              value={routeOrder}
              size="small"
              color="secondary"
              onChange={(e) =>
                handleRouteOrder(e.target.value as 'custom' | 'distance' | 'fuel')
              }
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
              // onClick={handleRouteEvaluation}
            >
              <Functions />
            </IconButton>
          </Tooltip>
        </div>
      </div>
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
      {destinations.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          {routeOrder === 'custom' && (
            <CustomDestinationTable
              destinations={destinations}
              locationTree={locationTree}
            />
          )}
        </div>
      )}
    </GlassBox>
  );
};
