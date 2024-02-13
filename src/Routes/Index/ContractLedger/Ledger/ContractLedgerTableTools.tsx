import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { MouseEvent, useRef, useState } from 'react';

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
  const [open, setOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <Box
      id="Contract-Table-Tools-Box"
      ref={toolsRef}
      sx={{
        display: 'flex',
        border: '2px ridge ',
        borderColor: 'primary.main',
        height: '4.5em',
        width: '50%',
        marginLeft: '5%',
        marginTop: '.5em',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Button
        id="filter-button"
        variant="outlined"
        onClick={handleClick}
        sx={{
          margin: '.5em',
          padding: '1em',
          maxHeight: '30%',
          marginLeft: '3em',
        }}
      >
        <FilterAltIcon />
        <Typography>Filter</Typography>
      </Button>
      <Collapse
        id="Contract-Table-Filter-Drawer"
        key="Contract-Table-Filter-Drawer"
        in={open}
        sx={{
          position: 'absolute',
          top: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '1em',
          }}
        >
          <SubTypeDropdownFilter />
          <AccessTimeFilterMenuDropdown />
          <ContractOwnerTypeFilterMenuDropdown />
          <UECRangeDropdownFilter />
          <LocationFilterMenuDropdown />
          <EmployerRatingFilterMenuDropdown />
        </Box>
      </Collapse>
      <Typography variant="h4">Contract Ledger</Typography>
      <Box
        id="Contract-Table-Search-Sort-Box"
        sx={{ display: 'flex', flexDirection: 'row', marginRight: '1em' }}
      >
        <Box id="Contract-Table-Sort-By-Box" sx={{ marginRight: '1em' }}>
          <FormControl>
            <InputLabel id="Contract-Table-Sort-By">Sort By</InputLabel>
            <Select
              label="Sort By"
              variant="outlined"
              value={sortBy}
              onChange={handleSort}
              autoWidth
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: { backgroundColor: 'primary.main' },
                  },
                },
              }}
              sx={{
                minWidth: '6em',
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="pay">Pay</MenuItem>
              <MenuItem value="contract-title">Contract Title</MenuItem>
              <MenuItem value="bid-status">Bid Status</MenuItem>
              <MenuItem value="location">Location</MenuItem>
              <MenuItem value="time-left">Time Left</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box id="Contract-Table-SearchBar-Box">
          <TextField
            id="Contract-Table-SearchBar"
            label="Search Contracts"
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
};
