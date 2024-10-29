import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { Float3, MathX } from 'vl-shared/src/math';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { DestinationTableRow } from './TableRow';

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
      sx={{ flexGrow: '1', justifyContent: 'flex-start', overflow: 'hidden', p: '1em' }}
    >
      <TableContainer
        data-testid="RouteTool-RouteViewer-DestinationQue-CustomTable__Table_Container"
        sx={{
          maxHeight: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(0,73,130)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
        }}
      >
        <Table
          data-testid="RouteTool-RouteViewer-DestinationQue-CustomTable__Table"
          stickyHeader
        >
          <TableHead data-testid="RouteTool-RouteViewer-DestinationQue-CustomTable-Table__Header_Wrapper">
            <TableRow data-testid="RouteTool-RouteViewer-DestinationQue-CustomTable-Table__Header_Row">
              {columns.map((column) => (
                <TableCell
                  data-testid="RouteTool-RouteViewer-DestinationQue-CustomTable-Table__Header_Cell"
                  key={column.id}
                  align={column.align}
                  component="th"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody data-testid="RouteTool-RouteViewer-DestinationQue-CustomTable-Table__Body_Wrapper">
            {sortedDestinations.map((place, index) => {
              return (
                <DestinationTableRow
                  data-testid={`RouteTool-RouteViewer-DestinationQue-CustomTable-Table-Body__TableRow_${place.id}`}
                  key={place.id}
                  draggable
                  destination={place}
                  distance={
                    index === 0
                      ? '—'
                      : formatDistance(
                          place.location,
                          sortedDestinations[index - 1].location,
                        )
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </GlassDisplay>
  );
};
