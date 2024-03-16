import { Language, Rocket } from '@mui/icons-material';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { LocationSelection } from '@/Common/LocationSelection';

function createItem(
  id: number,
  name: string,
  scu: number,
  type: string,
  location: string,
) {
  const moveButton = <Button>Move</Button>;
  const offloadButton = <Button>Offload</Button>;
  return {
    name,
    scu,
    type,
    location,
    moveButton,
    offloadButton,
  };
}

const itemRows = [
  createItem(1, 'Aspis', 10, 'Shield', 'New Babbage'),
  createItem(2, 'Aspis', 10, 'Shield', 'New Babbage'),
  createItem(3, 'Diligence', 10, 'Power Plant', 'New Babbage'),
  createItem(4, 'Diligence', 10, 'Power Plant', 'New Babbage'),
  createItem(5, 'CoolCore', 10, 'Cooler', 'New Babbage'),
  createItem(6, 'CoolCore', 10, 'Cooler', 'New Babbage'),
  createItem(7, 'Bolon', 10, 'Q Drive', 'New Babbage'),
  createItem(8, 'Bolon', 10, 'Q Drive', 'New Babbage'),
  createItem(9, 'Bolon', 10, 'Q Drive', 'New Babbage'),
  createItem(10, 'Bolon', 10, 'Q Drive', 'New Babbage'),
  createItem(11, 'Bolon', 10, 'Q Drive', 'New Babbage'),
];

export const LogisticsApp: React.FC<unknown> = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '10%' }}>
        <ToggleButtonGroup orientation="vertical">
          <ToggleButton value="SelectShip">
            <Rocket />
          </ToggleButton>
          <ToggleButton value="SelectLocation">
            <Language />
          </ToggleButton>
        </ToggleButtonGroup>
        <LocationSelection />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '90%' }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '65%', height: '100%' }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>SCU</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>
                    <Button>Add Item</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.scu}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.moveButton}</TableCell>
                    <TableCell>{row.offloadButton}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: '35%', height: '100%' }}
        ></Box>
      </Box>
    </Box>
  );
};
