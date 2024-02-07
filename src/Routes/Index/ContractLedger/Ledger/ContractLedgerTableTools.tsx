import {
  AccessTime,
  AutoAwesomeMotion,
  Group,
  SatelliteAlt,
  StarBorder,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button
} from '@mui/material';
import React, { useState } from 'react';
import { AccessTimeFilterMenuDropdown } from '../Global/AccessTimeFilterMenuDropdown';

export const ContractLedgerTableTools: React.FC<unknown> = () => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  //Sort By Dropdown

  return (
    <Box>
      <Box>
        <h4>SearchBar</h4>

        <TextField
          id="Contract-Table-SearchBar"
          label="Search Contracts"
          variant="outlined"
        />
      </Box>
      <Box sx={{ marginTop: '1.5em' }}>
        <h4>Filter Buttons</h4>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <AutoAwesomeMotion sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
        <AccessTimeFilterMenuDropdown />
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <Group sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <Typography sx={{ color: 'secondary.main', fontSize: '1.5em' }}>¤</Typography>
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <SatelliteAlt sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
        <IconButton sx={{ color: 'text.primary', width: '55px' }}>
          <StarBorder sx={{ color: 'secondary.main', width: '55px' }} />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: '1.5em' }}>
        <h4>SortBy Drop Down</h4>
        <FormControl>
          <InputLabel id="Contract-Table-Sort-By">Sort By</InputLabel>
          <Select
            label="Sort By"
            variant="outlined"
            value={sortBy}
            onChange={handleSort}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: { backgroundColor: 'primary.main' },
                },
              },
            }}
            sx={{ color: 'text.secondary', width: '15em' }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="pay">Pay</MenuItem>
            <MenuItem value="contract-title">Contract Title</MenuItem>
            <MenuItem value="bid-status">Bid Status</MenuItem>
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="time-left">Time Left</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
