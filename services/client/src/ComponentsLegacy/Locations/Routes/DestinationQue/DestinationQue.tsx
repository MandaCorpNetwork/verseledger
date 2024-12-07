import GlassBox from '@CommonLegacy/Components/Boxes/GlassBox';
import { Divider, Typography } from '@mui/material';
import { capFirstLetter } from '@Utils/StringUtil';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { MappedLocation } from '../RouteUtilities';
import { CustomDestinationTable } from './CustomTable';
import { DistanceTable } from './DistanceTable';
import { DestinationEffForm } from './TableContent/DestinationEffForm';
import { DestQueHeader } from './TableContent/DestQueHeader';

type DestinationQueProps = {
  destinations: IDestination[];
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
      sx={{
        p: '1em',
        gap: '1em',
        height: '100%',
        minWidth: '400px',
        flexGrow: '1',
      }}
    >
      <DestQueHeader
        routeOrder={routeOrder}
        setRouteOrder={setRouteOrder}
        destinations={destinations}
      />
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography>
            Current Route Order:
            <Divider
              textAlign="center"
              variant="middle"
              sx={{ opacity: '0.4', width: '200px', mx: 'auto' }}
            />
            <Typography variant="subtitle2" color="info">
              {capFirstLetter(routeOrder)}
            </Typography>
          </Typography>
          {routeOrder === 'custom' && (
            <Typography variant="caption" sx={{ display: 'inline-flex', mx: 'auto' }}>
              You can use{' '}
              <Typography
                variant="caption"
                sx={{ fontWeight: 'bold', color: 'info.main' }}
              >
                &nbsp;Route Order&nbsp;
              </Typography>
              to automate your Route Efficiency Calculation
            </Typography>
          )}
        </div>
        {routeOrder !== 'custom' && <DestinationEffForm locationTree={locationTree} />}
      </div>

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
          {routeOrder === 'distance' && (
            <DistanceTable destinations={destinations} locationTree={locationTree} />
          )}
        </div>
      )}
    </GlassBox>
  );
};
