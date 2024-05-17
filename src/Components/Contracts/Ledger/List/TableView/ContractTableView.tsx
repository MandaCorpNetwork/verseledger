import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';

type ContractRowProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contracts: any[];
  onPick: (id: string | null) => void;
};

interface Column {
  id: 'title' | 'type' | 'subtype' | 'owner' | 'pay' | 'location' | 'bidTime';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'subtype', label: 'Subtype', minWidth: 100 },
  { id: 'owner', label: 'Owner', minWidth: 100 },
  { id: 'pay', label: 'Pay', minWidth: 100 },
  { id: 'location', label: 'Location', minWidth: 100 },
  { id: 'bidTime', label: 'Bid Time', minWidth: 100 },
];

export const ContractTableView: React.FC<ContractRowProps> = ({ contracts, onPick }) => {
  return (
    <Box>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow
              key={contract.id}
              hover
              onClick={() => onPick(contract.id)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{contract.title}</TableCell>
              <TableCell>{contract.type}</TableCell>
              <TableCell>{contract.subtype}</TableCell>
              <TableCell>{contract.owner}</TableCell>
              <TableCell>{contract.pay}</TableCell>
              <TableCell>{contract.location}</TableCell>
              <TableCell>
                {dayjs(contract.bidEnd).format('MM/DD/YYYY HH:mm:ss')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
