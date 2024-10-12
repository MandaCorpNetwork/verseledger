import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
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

type DestinationQueProps = {
  destinations: IDestination[];
};

export const DestinationQue: React.FC<DestinationQueProps> = ({ destinations }) => {
  const sortedDestinations = React.useMemo(() => {
    return [...destinations].sort((a, b) => a.stopNumber - b.stopNumber);
  }, [destinations]);
  return (
    <Box
      data-testid="RouteTool-RouteViewer__DestinationQue_Container"
      sx={{ flexGrow: '1', display: 'flex' }}
    >
      <DigiBox></DigiBox>
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
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} component="th">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDestinations.map((place, index) => (
                <TableRow key={place.id} hover>
                  <TableCell>
                    {`${index + 1}. `}
                    <LocationChip locationId={place.location.id} />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{place.reason}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {index === 0 ? '—' : `km`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DigiBox>
    </Box>
  );
};
