import { AddModerator, CheckCircle } from '@mui/icons-material';
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

function createCrewman(id: number, role: string, name: string, created: boolean) {
  const controller =
    name === 'Empty' ? (
      <Button
        color="success"
        variant="contained"
        size="small"
        sx={{ borderRadius: '10px', fontSize: '.75em' }}
      >
        Invite
      </Button>
    ) : (
      <Button
        color="error"
        variant="contained"
        size="small"
        sx={{ borderRadius: '10px', fontSize: '.75em' }}
      >
        Dismiss
      </Button>
    );
  return {
    created: created ? (
      <AddModerator fontSize="small" color="info" />
    ) : (
      <CheckCircle fontSize="small" color="primary" />
    ),
    role,
    name,
    controller,
  };
}
const crewmanRows = [
  createCrewman(1, 'Captain', 'ThreeCrown', false),
  createCrewman(2, 'First Mate', 'Maaros', false),
  createCrewman(3, 'Sensors', 'Bottom', false),
  createCrewman(4, 'TopTurret', 'Empty', false),
  createCrewman(5, 'BottomTurret', 'Empty', false),
  createCrewman(6, 'Engineer', 'Blizz', true),
  createCrewman(7, 'CargoCrew', 'W0lf', true),
];

export const CrewManifestOverview: React.FC<unknown> = () => {
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
            <TableCell colSpan={2}>Role</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">
              <Button
                color="secondary"
                variant="contained"
                size="small"
                sx={{ borderRadius: '10px', fontSize: '.75em' }}
              >
                Create Role
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {crewmanRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '& > *': { fontSize: '.65em', padding: '0', margin: '0' } }}
            >
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell>{row.controller}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
