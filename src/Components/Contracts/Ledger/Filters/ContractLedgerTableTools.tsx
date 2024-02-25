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
import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AccessTimeDropdownFilter } from '@/Components/Contracts/Ledger/Filters/AccessTimeDropdownFilter';
import { ContractOwnerTypeDropdownFilter } from '@/Components/Contracts/Ledger/Filters/ContractOwnerTypeDropdownFilter';
import { EmployerRatingSliderFilter } from '@/Components/Contracts/Ledger/Filters/EmployerRatingSliderFilter';
import { LocationDropdownFilter } from '@/Components/Contracts/Ledger/Filters/LocationDropdownFilter';
import { SubTypeDropdownFilter } from '@/Components/Contracts/Ledger/Filters/SubTypeDropdownFilter';
import { UECRangeInputFilter } from '@/Components/Contracts/Ledger/Filters/UECRangeInputFilter';

export const ContractLedgerTableTools: React.FC<unknown> = () => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  //Sort By Dropdown
  const [open, setOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box
      id="Contract-Table-Tools-Box"
      ref={toolsRef}
      sx={{
        display: 'flex',
        border: '3px ridge ',
        borderColor: 'text.disabled',
        height: '4.5em',
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
        <Typography sx={{ fontWeight: 'bold' }}>Filter</Typography>
      </Button>
      <Collapse
        id="Contract-Table-Filter-Drawer"
        key="Contract-Table-Filter-Drawer"
        in={open}
        sx={{
          position: 'absolute',
          top: '100%',
          width: '100%',
          zIndex: '50',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
            zIndex: '50',
            bgcolor: 'primary.dark',
            opacity: '.9',
            justifyContent: 'space-between',
            gap: '1em',
            flexWrap: 'wrap',
          }}
        >
          <SubTypeDropdownFilter />
          <AccessTimeDropdownFilter />
          <ContractOwnerTypeDropdownFilter />
          <LocationDropdownFilter />
          <UECRangeInputFilter />
          <EmployerRatingSliderFilter />
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
