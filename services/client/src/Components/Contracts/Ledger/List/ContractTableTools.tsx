import { FilterAlt } from '@mui/icons-material';
import { Badge, Box, Button, Collapse, Typography } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import { SortBySelect } from '@Utils/Filters/SortBySelect';
//import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import React, { useRef, useState } from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { CLFilterDropdown } from './CLFilterDropdown';

export const ContractTableTools: React.FC<unknown> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters] = useURLQuery();
  const [open, setOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const filterCount = filters.getAll(QueryNames.Subtype).length;
  //   filters.getAll(QueryNames.Locations).length +
  //   filters.getAll(QueryNames.TimeRemaining).length +
  //   (filters.has(QueryNames.UECRangeMax) ? 1 : 0) +
  //   (filters.has(QueryNames.UECRangeMin) ? 1 : 0) +
  //   (filters.has(QueryNames.EmployerRating) ? 1 : 0);

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
      data-testid="ContractLedger-ColumnTwo__TableToolsContainer"
      ref={toolsRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        mt: '1em',
        py: '.5em',
        mx: '1em',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '10px',
        borderLeft: '1px solid rgba(14,49,141,0.5)',
        borderRight: '1px solid rgba(14,49,141,0.5)',
        boxShadow: '0 5px 15px rgba(14,49,141,.8)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background:
            'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
          opacity: 0.6,
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <Badge
        data-testid="ContractLedger-TableTools__FilterBadge"
        badgeContent={filterCount}
        color="error"
        variant="standard"
        overlap="rectangular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          opacity: open ? 1 : 0.8,
        }}
      >
        <Button
          data-testid="ContractLedger-TableTools__FilterButton"
          onClick={handleClick}
          color="secondary"
          variant="outlined"
          startIcon={<FilterAlt />}
          size="small"
          sx={{
            '&:hover': {
              boxShadow: '0 0px 10px',
            },
          }}
        >
          Filters
        </Button>
      </Badge>
      <Collapse
        data-testid="ContractLedger-TableTools__FilterDrawer"
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
          data-testid="ContractLedger-TableTools-FilterDrawer__FilterDisplayContainer"
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
          <CLFilterDropdown filter="Subtype" label="Contract SubType" />
          <CLFilterDropdown filter="Locations" label="Contract Locations" />
          <CLFilterDropdown filter="TimeRemaining" label="Bid Time Remaining" />
          <CLFilterDropdown filter="EmployerRating" label="Employer Rating" />
          <CLFilterDropdown filter="PayRange" label="Contract Pay Range" />
        </Box>
      </Collapse>
      <Typography
        data-testid="ContractLedger-TableTools__Title"
        variant="h5"
        sx={{ color: 'text.secondary', textShadow: '1px 1px 2px rgba(0,73,130,0.8)' }}
      >
        Contract Browser
      </Typography>
      <Box
        data-testid="ContractLedger-TableTools__SortandSearchWrapper"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Box
          data-testid="ContractLedger-TableTools-SortandSearch__SortByWrapper"
          sx={{ marginRight: '1em' }}
        >
          <SortBySelect size="small" sortOptions={sortOptions} containerSize="small" />
        </Box>
        <Box data-testid="ContractLedger-TableTools-SortandSearch__SearchWrapper">
          <SearchBar
            size="small"
            label="Search Contracts"
            placeholder="Title, Contractors, Ships..."
          />
        </Box>
      </Box>
    </Box>
  );
};
