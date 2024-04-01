import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function createItem(id: number, scu: number, item: string) {
  return {
    scu,
    item,
    controller: (
      <Button
        color="error"
        variant="contained"
        size="small"
        sx={{ borderRadius: '10px', fontSize: '.75em' }}
      >
        Offload
      </Button>
    ),
  };
}
const cargoRows = [
  createItem(1, 15, 'Copper'),
  createItem(2, 10, 'Iron'),
  createItem(3, 5, 'Silver'),
  createItem(4, 1, 'Gold'),
  createItem(5, 1, 'Platinum'),
  createItem(6, 0.01, 'Karna (2)'),
];

export const CargoManifestOverview: React.FC<unknown> = () => {
  return (
    <TableContainer
      component={Box}
      sx={{
        height: 'calc(100%)',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgb(8, 29, 68)',
          borderRadius: '20px',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          background: 'rgb(121, 192, 244, .5)',
        },
      }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow sx={{ '& > *': { fontSize: '.7em', padding: '0', margin: '0' } }}>
            <TableCell>Item</TableCell>
            <TableCell>SCU (50/100)</TableCell>
            <TableCell align="center">
              <Button
                color="success"
                variant="contained"
                size="small"
                sx={{ borderRadius: '10px', fontSize: '.75em' }}
              >
                Add Item
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cargoRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '& > *': { fontSize: '.65em', padding: '0', margin: '0' } }}
            >
              <TableCell>{row.item}</TableCell>
              <TableCell>{row.scu}</TableCell>
              <TableCell align="center">{row.controller}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
