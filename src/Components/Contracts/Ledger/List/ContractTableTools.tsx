import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Badge, Box, Button, Collapse, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';

import { QueryNames } from '@/Common/Definitions/QueryNames';
import { SearchBar } from '@/Common/Filters/SearchBar';
import { SortBySelect } from '@/Common/Filters/SortBySelect';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { CLFilterDropdown } from './CLFilterDropdown';

export const ContractTableTools: React.FC<unknown> = () => {
  const [filters] = useURLQuery();
  const [open, setOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const filterCount =
    filters.getAll(QueryNames.SubType).length +
    filters.getAll(QueryNames.Locations).length +
    filters.getAll(QueryNames.TimeRemaining).length +
    (filters.has(QueryNames.UECRangeMax) ? 1 : 0) +
    (filters.has(QueryNames.UECRangeMin) ? 1 : 0) +
    (filters.has(QueryNames.EmployerRating) ? 1 : 0);

  const sortOptions = [
    {
      label: 'Rating',
      value: 'rating',
    },
    {
      label: 'Pay',
      value: 'pay',
    },
    {
      label: 'Contract Title',
      value: 'title',
    },
    {
      label: 'Bid Status',
      value: 'bidStatus',
    },
    {
      label: 'Location',
      value: 'location',
    },
    {
      label: 'Time Remaining',
      value: 'timeRemain',
    },
  ];

  return (
    <Box
      data-testid="ContractLedger-ContractBrowser__TableToolsContainer"
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
      <Badge badgeContent={filterCount} color="error" variant="dot" overlap="rectangular">
        <Button
          data-testid="ContractLedger-ContractBrowser-TableTools__FilterButton"
          variant="outlined"
          onClick={handleClick}
          startIcon={<FilterAltIcon />}
          sx={{
            marginLeft: '3em',
          }}
        >
          Filter
        </Button>
      </Badge>
      <Collapse
        data-testid="ContractLedger-ContractBrowser-TableTools__FilterDrawer"
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
          data-testid="ContractLedger-ContractBrowser-TableTools-FilterDrawer__FilterDisplayContainer"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1em',
            zIndex: '50',
            bgcolor: 'primary.dark',
            opacity: '.9',
            justifyContent: 'flex-start',
            gap: '1em',
            flexWrap: 'wrap',
            borderRadius: '10px',
          }}
        >
          <CLFilterDropdown filter="SubType" label="Contract SubType" />
          <CLFilterDropdown filter="Locations" label="Contract Locations" />
          <CLFilterDropdown filter="Time Remaining" label="Bid Time Remaining" />
          <CLFilterDropdown filter="Employer Rating" label="Employer Rating" />
          <CLFilterDropdown filter="Pay Range" label="Contract Pay Range" />
        </Box>
      </Collapse>
      <Typography></Typography>
      <Box
        id="Contract-Table-Search-Sort-Box"
        sx={{ display: 'flex', flexDirection: 'row', marginRight: '1em' }}
      >
        <Box id="Contract-Table-Sort-By-Box" sx={{ marginRight: '1em' }}>
          <SortBySelect size="medium" sortOptions={sortOptions} containerSize="medium" />
        </Box>
        <Box id="Contract-Table-SearchBar-Box">
          <SearchBar
            size="medium"
            label="Search Contracts"
            placeholder="Title, Contractors, Ships..."
          />
        </Box>
      </Box>
    </Box>
  );
};
