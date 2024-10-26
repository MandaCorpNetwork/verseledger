import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

type CustomTableProps = {
  destinations: IDestination[];
};

export const CustomDestinationTable: React.FC<CustomTableProps> = ({ destinations }) => {
  return (
    <DigiDisplay
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
        </Table>
      </TableContainer>
    </DigiDisplay>
  );
}
