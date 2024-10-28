import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Grid2 } from '@mui/material';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import {
  formatDistance,
  getMappedLocation,
  MappedLocation,
} from './TableContent/RouteUtilities';
import { TableHeader } from './TableContent/TableHeader';
import { DestinationTableRow } from './TableContent/TableRow';

type CustomTableProps = {
  destinations: IDestination[];
  locationTree: Map<string, MappedLocation>;
};

export const CustomDestinationTable: React.FC<CustomTableProps> = ({
  destinations,
  locationTree,
}) => {
  const sortedDestinations = React.useMemo(() => {
    return [...destinations].sort((a, b) => a.stopNumber - b.stopNumber);
  }, [destinations]);

  const getDistance = React.useCallback(
    (idxA: number, idxB: number) => {
      if (idxB < 0) return `——`;
      const locA = getMappedLocation(locationTree, sortedDestinations[idxA].location.id);
      const locB = getMappedLocation(locationTree, sortedDestinations[idxB].location.id);
      if (locA == null) return `Err«`;
      if (locB == null) return `Err»`;
      return formatDistance(locA, locB);
    },
    [sortedDestinations, locationTree],
  );
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
        <TableHeader />
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
            const distance = getDistance(index, index - 1);
            return (
              <Grid2 key={place.id} sx={{ width: '100%' }}>
                <DestinationTableRow
                  data-testid={`RouteTool-RouteViewer-DestinationQue-CustomTable-Table-Body__TableRow_${place.id}`}
                  key={place.id}
                  draggable
                  destination={place}
                  list={sortedDestinations}
                  distance={distance}
                />
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
    </GlassDisplay>
  );
};
