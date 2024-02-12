import {
  AutoAwesomeMotion,
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
import { ContractOwnerTypeFilterMenuDropdown } from '../Global/ContractOwnerTypeFilterMenuDropdown';
import { EmployerRatingFilterMenuDropdown } from '../Global/EmployerRatingFilterMenuDropdown';
import { LocationFilterMenuDropdown } from '../Global/LocationFilterMenuDropdown';
import { UECRangeDropdownFilter } from '../Global/UECRangeDropdownFilter';
import { SubTypeDropdownFilter } from '../Global/SubTypeDropdownFilter';

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
        <SubTypeDropdownFilter />
        <AccessTimeFilterMenuDropdown />
        <ContractOwnerTypeFilterMenuDropdown />
        <UECRangeDropdownFilter />
        <LocationFilterMenuDropdown />
        <EmployerRatingFilterMenuDropdown />
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
