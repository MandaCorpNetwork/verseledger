import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'destination', label: 'Destination', align: 'left' },
  { id: 'reason', label: 'Stop Reason', align: 'center' },
  { id: 'time', label: 'Travel Time', align: 'center' },
];

export const DestinationQue: React.FC = () => {
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
            {tempDestinationData.map((place, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  {`${index + 1}. `}
                  {place.destination}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{place.reason}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{place.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DigiBox>
  );
};

const tempDestinationData = [
  { destination: 'Lorville', reason: 'Mission', time: '5 minutes' },
  { destination: 'Everus Harbor', reason: 'Mission', time: '1 minute' },
  { destination: 'Crusader', reason: 'Crew Stop', time: '7 minutes' },
  { destination: 'Colliope', reason: 'Mission', time: '9 minutes' },
];
