import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Grid2, Typography } from '@mui/material';
import React from 'react';
import { Float3, MathX } from 'vl-shared/src/math';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { DestinationTableRow } from './TableContent/TableRow';

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'destination', label: 'Destination', align: 'left' },
  { id: 'reason', label: 'Stop Reason', align: 'center' },
  { id: 'tasks', label: 'Total Tasks', align: 'center' },
  { id: 'distance', label: 'Travel Distance', align: 'center' },
];

type CustomTableProps = {
  destinations: IDestination[];
};

export const CustomDestinationTable: React.FC<CustomTableProps> = ({ destinations }) => {
  const sortedDestinations = React.useMemo(() => {
    return [...destinations].sort((a, b) => a.stopNumber - b.stopNumber);
  }, [destinations]);

  const formatDistance = React.useCallback((locA: ILocation, locB: ILocation) => {
    const posA = new Float3(locA.x, locA.y, locA.z);
    const posB = new Float3(locB.x, locB.y, locB.z);
    const floatDistance = MathX.distance(posA, posB);
    const absDistance = Math.abs(floatDistance);
    if (absDistance >= 1_000_000) {
      return `${(absDistance / 1_000_000).toFixed(2)} Gkm`;
    } else if (absDistance >= 1_000) {
      return `${(absDistance / 1_000).toFixed(2)} Mkm`;
    } else {
      return `${absDistance.toFixed(2)} km`;
    }
  }, []);
  return (
    <GlassDisplay
      data-testid="RouteTool-RouteViewer-DestinationQue__CustomTable_Container"
      sx={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        overflow: 'auto',
        p: '1em',
      }}
    >
      <Grid2 container direction="column" sx={{ gap: 1, flexGrow: 1 }}>
        <Grid2
          direction="row"
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            display: 'flex',
            px: '1em',
            py: '0.5em',
          }}
        >
          {columns.map((column) => (
            <Grid2 key={column.id}>
              <Typography>{column.label}</Typography>
            </Grid2>
          ))}
        </Grid2>
        <Grid2
          container
          sx={{
            flexGrow: 1,
            alignContent: 'flex-start',
            gap: '0.5em',
            overflow: 'auto',
          }}
        >
          {sortedDestinations.map((place, index) => {
            return (
              <Grid2 key={place.id} sx={{ width: '100%' }}>
                <DestinationTableRow
                  data-testid={`RouteTool-RouteViewer-DestinationQue-CustomTable-Table-Body__TableRow_${place.id}`}
                  key={place.id}
                  draggable
                  destination={place}
                  list={sortedDestinations}
                  distance={
                    index === 0
                      ? '—'
                      : formatDistance(
                          place.location,
                          sortedDestinations[index - 1].location,
                        )
                  }
                />
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
    </GlassDisplay>
  );
};
