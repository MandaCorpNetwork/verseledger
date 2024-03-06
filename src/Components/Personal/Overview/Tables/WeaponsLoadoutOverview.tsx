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

function createWeapon(
  id: number,
  hardpoint: string,
  size: number,
  weapon: string,
  ammo: number,
  type: string,
) {
  const ammoController = (
    <Button
      color="error"
      variant="contained"
      size="small"
      disabled={type !== 'balistic'}
      sx={{ borderRadius: '10px', fontSize: '.75em' }}
    >
      Depleted
    </Button>
  );
  return {
    hardpoint,
    size,
    weapon,
    ammo,
    type,
    ammoController,
  };
}

const weaponRows = [
  createWeapon(1, 'Fixed', 3, 'Badger', 33, 'energy'),
  createWeapon(2, 'Fixed', 2, 'Badger', 33, 'energy'),
  createWeapon(3, 'Turret', 3, 'Badger', 33, 'energy'),
  createWeapon(4, 'Turret', 3, 'Badger', 33, 'energy'),
  createWeapon(5, 'Turret', 3, 'Scorpian', 220, 'balistic'),
  createWeapon(6, 'Turret', 3, 'Scorpian', 220, 'balistic'),
];

export const WeaponsLoadoutOverview: React.FC<unknown> = () => {
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
            <TableCell>Hardpoint</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Weapon</TableCell>
            <TableCell>Ammo</TableCell>
            <TableCell>
              <Button
                color="info"
                variant="contained"
                size="small"
                sx={{ borderRadius: '10px', fontSize: '.75em' }}
              >
                Rearm
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weaponRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '& > *': { fontSize: '.65em', padding: '0', margin: '0' } }}
            >
              <TableCell>{row.hardpoint}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell align="center">{row.weapon}</TableCell>
              <TableCell>{row.ammo}</TableCell>
              <TableCell>{row.ammoController}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}