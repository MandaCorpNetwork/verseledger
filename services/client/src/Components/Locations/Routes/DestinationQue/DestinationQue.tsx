import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Typography } from '@mui/material';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { MappedLocation } from '../RouteUtilities';
import { CustomDestinationTable } from './CustomTable';
import { DestQueHeader } from './DestQueHeader';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

type DestinationQueProps = {
  destinations: IDestination[];
  // missions: IMission[];
  locationTree: Map<string, MappedLocation>;
};

export type RouteOrder = 'custom' | 'distance' | 'fuel';

export const DestinationQue: React.FC<DestinationQueProps> = ({
  destinations,
  locationTree,
}) => {
  const [routeOrder, setRouteOrder] = React.useState<RouteOrder>('custom');
  return (
    <GlassBox
      data-testid="RouteTool__DestinationList__Wrapper"
      sx={{ p: '1em', gap: '1em', height: '100%', minWidth: '400px', flexGrow: '1' }}
    >
      <DestQueHeader routeOrder={routeOrder} setRouteOrder={setRouteOrder} />
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
