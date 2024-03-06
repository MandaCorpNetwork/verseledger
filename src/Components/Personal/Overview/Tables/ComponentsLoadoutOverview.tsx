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

function createComponent(
  id: number,
  type: string,
  size: number,
  component: string,
  online: boolean,
) {
  const controller = (
    <Button
      color="error"
      variant="contained"
      size="small"
      sx={{ borderRadius: '10px', fontSize: '.75em' }}
    >
      Offline
    </Button>
  );
  return {
    type,
    size,
    component,
    online,
    controller,
  };
}

const componentRows = [
  createComponent(1, 'Shield', 2, 'Aspis', true),
  createComponent(2, 'Shield', 2, 'Aspis', true),
  createComponent(3, 'Power Plant', 2, 'Diligence', true),
  createComponent(4, 'Power Plant', 2, 'Diligence', true),
  createComponent(5, 'Cooler', 2, 'CoolCore', true),
  createComponent(6, 'Cooler', 2, 'CoolCore', true),
  createComponent(7, 'Q Drive', 2, 'Bolon', true),
];

export const ComponentsLoadoutOverview: React.FC<unknown> = () => {
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
            <TableCell>Type</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Component</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {componentRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '& > *': { fontSize: '.65em', padding: '0', margin: '0' } }}
            >
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell align="center">{row.component}</TableCell>
              <TableCell>{row.controller}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}