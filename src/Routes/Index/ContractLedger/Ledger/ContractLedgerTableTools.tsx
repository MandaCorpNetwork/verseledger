import { AutoAwesomeMotion, SatelliteAlt, StarBorder } from '@mui/icons-material';
import {
  Box,
  Button,
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
} from '@mui/material';
import React, { useState } from 'react';

import { AccessTimeFilterMenuDropdown } from '../Global/AccessTimeFilterMenuDropdown';
import { ContractOwnerTypeFilterMenuDropdown } from '../Global/ContractOwnerTypeFilterMenuDropdown';
import { EmployerRatingFilterMenuDropdown } from '../Global/EmployerRatingFilterMenuDropdown';
import { LocationFilterMenuDropdown } from '../Global/LocationFilterMenuDropdown';
import { SubTypeDropdownFilter } from '../Global/SubTypeDropdownFilter';
import { UECRangeDropdownFilter } from '../Global/UECRangeDropdownFilter';

export const ContractLedgerTableTools: React.FC<unknown> = () => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  //Sort By Dropdown

  return (
    <Box
      id="Contract-Table-Tools-Box"
      sx={{
        display: 'flex',
        border: '1px solid #18fcfc',
        width: '60%',
      }}
    >
      <Box id="Contract-Table-Filter-Box" sx={{ marginTop: '1.5em', display: 'flex' }}>
        <SubTypeDropdownFilter />
        <AccessTimeFilterMenuDropdown />
        <ContractOwnerTypeFilterMenuDropdown />
        <UECRangeDropdownFilter />
        <LocationFilterMenuDropdown />
        <EmployerRatingFilterMenuDropdown />
      </Box>
      <Box id="Contract-Table-Sort-By-Box" sx={{ marginTop: '1.5em' }}>
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
      <Box id="Contract-Table-SearchBar-Box" sx={{ marginTop: '1.5em' }}>
        <TextField
          id="Contract-Table-SearchBar"
          label="Search Contracts"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};
