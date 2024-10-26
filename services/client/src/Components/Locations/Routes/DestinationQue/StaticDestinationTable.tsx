import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
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

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'destination', label: 'Destination', align: 'left' },
  { id: 'reason', label: 'Stop Reason', align: 'center' },
  { id: 'distance', label: 'Travel Distance', align: 'center' },
];

type StaticDestinationTableProps = {
  destinations: IDestination[];
};

export const StaticDestinationTable: React.FC<StaticDestinationTableProps> = ({
  destinations,
}) => {
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
    <DigiBox
      data-testid="RouteTool-RouteViewer__DestinationQue_Container"
      sx={{ flexGrow: '1', justifyContent: 'flex-start', overflow: 'hidden' }}
    >
      <TableContainer
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
        <Table stickyHeader>
          <TableBody>
            {sortedDestinations.map((place, index) => (
              <TableRow key={place.id} hover>
                <TableCell>
                  {`${index + 1}. `}
                  <LocationChip
                    locationId={place.location.id}
                    sx={{ maxWidth: '120px' }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{place.reason}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {index === 0
                    ? '—'
                    : formatDistance(
                        place.location,
                        sortedDestinations[index - 1].location,
                      )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DigiBox>
  );
};
