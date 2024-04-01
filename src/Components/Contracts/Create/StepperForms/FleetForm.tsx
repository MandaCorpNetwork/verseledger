import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function fleetAllocationData(
  name: string,
  make: string,
  model: string,
  crewCount: number,
  crewTotal: number,
  owner: string,
  captain: string,
) {
  const crewAllocation = `${crewCount} / ${crewTotal}`;
  return {
    name,
    make,
    model,
    crewCount,
    crewAllocation,
    owner,
    captain,
  };
}

const rows = [
  fleetAllocationData(
    'Insurrection',
    'Polaris',
    'RSI',
    3,
    14,
    'ThreeCrown',
    'ThreeCrown',
  ),
];

export const FleetForm: React.FC<unknown> = () => {
  return (
    <Box>
      <FormControl>
        <FormControlLabel label={'Use Selected Ship'} control={<Switch />} />
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Crew Allocation</TableCell>
            <TableCell>Captain</TableCell>
            <TableCell>Owner</TableCell>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.make}</TableCell>
                <TableCell>{row.crewAllocation}</TableCell>
                <TableCell>{row.captain}</TableCell>
                <TableCell>{row.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
