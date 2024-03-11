import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function createItem(id: number, scu: number, item: string, type: string) {
  return {
    scu,
    item,
    type,
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
  createItem(1, 15, 'Copper', 'Mineral'),
  createItem(2, 10, 'Iron', 'Mineral'),
  createItem(3, 5, 'Silver', 'Mineral'),
  createItem(4, 1, 'Gold', 'Mineral'),
  createItem(5, 1, 'Platinum', 'Mineral'),
  createItem(6, 0.01, 'Karna (2)', 'Personal Weapon'),
  createItem(7, 0.05, 'Pitambu (80)', 'Sustinance'),
  createItem(8, 0.01, 'Synergy (80)', 'Sustinance'),
];

export const CargoManifestManager: React.FC<unknown> = () => {
  return (
    <TableContainer
      component={Box}
      sx={{
        height: '100%',
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
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>SCU</TableCell>
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
          <TableRow key={row.id}>
            <TableCell>{row.item}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.scu}</TableCell>
            <TableCell align="center">{row.controller}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
