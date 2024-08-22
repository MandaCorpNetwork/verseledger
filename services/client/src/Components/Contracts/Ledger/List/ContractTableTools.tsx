import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { FilterAlt } from '@mui/icons-material';
import { Badge, Box, Button, Collapse, Typography } from '@mui/material';
import { SearchBar } from '@Utils/Filters/SearchBar';
import { SortBySelect } from '@Utils/Filters/SortBySelect';
//import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import React, { useRef, useState } from 'react';

import { useSoundEffect } from '@/AudioManager';
import { DropdownFilter } from '@/Common/Components/App/DropdownFilter';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

export const ContractTableTools: React.FC<unknown> = () => {
  const { playSound } = useSoundEffect();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters] = useURLQuery();
  const [open, setOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    playSound('clickMain');
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
    <DigiBox
      data-testid="ContractLedger-ColumnTwo__TableToolsContainer"
      ref={toolsRef}
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'relative',
        py: '.5em',
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
          background: 'linear-gradient(145deg, rgb(8,22,80,.8), rgba(0,73,150,.5))',
          justifyContent: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          p: '1em',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          borderLeft: '1px solid rgba(14,35,80,0.2)',
          borderRight: '1px solid rgba(14,35,80,0.2)',
          borderBottom: '1px solid rgba(14,35,80,0.2)',
          boxShadow: `
            0px 4px 8px rgba(0, 0, 0, 0.3),
            0px 8px 16px rgba(0, 0, 0, 0.2),
            0px 12px 24px rgba(0, 0, 0, 0.1)
          `,
        }}
      >
        <DropdownFilter filter="Subtype" label="SubTypes" />
        <DropdownFilter filter="Locations" label="Locations" />
        <DropdownFilter filter="Scheduling" label="Scheduling" />
        <DropdownFilter filter="EmployerRating" label="Ratings" />
        <DropdownFilter filter="PayRange" label="Compensation" />
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
    </DigiBox>
  );
};
