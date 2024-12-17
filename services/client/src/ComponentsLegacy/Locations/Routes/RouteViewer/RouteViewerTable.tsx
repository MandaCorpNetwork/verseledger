import { DoubleArrow } from '@mui/icons-material';
import { Collapse, Grid2, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { TableHeader } from '../DestinationQue/TableContent/TableHeader';
import { DestinationTableRow } from '../DestinationQue/TableContent/TableRow';
import {
  formatDistance,
  getMappedLocation,
  type MappedLocation,
} from '../RouteUtilities';

type RouteViewerTableProps = {
  destinations: IDestination[];
  locationTree: Map<string, MappedLocation>;
};

export const RouteViewerTable: React.FC<RouteViewerTableProps> = ({
  destinations,
  locationTree,
}) => {
  const visitedDestinations = destinations
    .filter((dest) => dest.visited === true)
    .sort((a, b) => a.stopNumber - b.stopNumber);
  const remainingDestinations = destinations
    .filter((dest) => dest.visited === false)
    .sort((a, b) => a.stopNumber - b.stopNumber);
  const getDistance = React.useCallback(
    (idxA: number, idxB: number, destinationList: IDestination[]) => {
      if (idxB < 0) return '——';
      const locA = getMappedLocation(locationTree, destinationList[idxA].location.id);
      const locB = getMappedLocation(locationTree, destinationList[idxB].location.id);
      if (locA == null) return 'Err«';
      if (locB == null) return 'Err»';
      return formatDistance(locA, locB);
    },
    [locationTree],
  );

  const [visitedExpanded, setVisitedExpanded] = React.useState<boolean>(false);

  const handleToggleVisited = React.useCallback(() => {
    setVisitedExpanded((prev) => !prev);
  }, []);
  return (
    <Grid2 container direction="column" sx={{ gap: 1, flexGrow: 1, maxWidth: '600px' }}>
      <TableHeader />
      <Collapse collapsedSize="1.5em" in={visitedExpanded}>
        <Typography>
          <IconButton onClick={handleToggleVisited}>
            <DoubleArrow
              sx={{
                transform: `rotate(${visitedExpanded ? '-90deg' : '90deg'})`,
                transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
              }}
            />
          </IconButton>
          Visited Destinations
        </Typography>
        <Grid2
          container
          sx={{
            flexGrow: 1,
            alignContent: 'flex-start',
            gap: '0.5em',
            overflow: 'auto',
          }}
        >
          {visitedDestinations.map((dest, index) => {
            const distance = getDistance(index, index - 1, visitedDestinations);
            return (
              <Grid2 key={dest.id} sx={{ width: '100%' }}>
                <DestinationTableRow
                  destination={dest}
                  list={visitedDestinations}
                  distance={distance}
                />
              </Grid2>
            );
          })}
        </Grid2>
      </Collapse>
      <Grid2
        container
        sx={{
          flexGrow: 1,
          alignContent: 'flex-start',
          gap: '0.5em',
          overflow: 'auto',
        }}
      >
        {remainingDestinations.map((dest, index) => {
          const distance = getDistance(index, index - 1, remainingDestinations);
          return (
            <Grid2 key={dest.id} sx={{ width: '100%' }}>
              <DestinationTableRow
                destination={dest}
                list={remainingDestinations}
                distance={distance}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </Grid2>
  );
};
