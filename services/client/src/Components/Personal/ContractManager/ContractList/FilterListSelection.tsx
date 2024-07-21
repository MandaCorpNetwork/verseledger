import { PlayArrow } from '@mui/icons-material';
import { Badge, Box, Paper, Popper, Typography } from '@mui/material';
import { LocationsFilter } from '@Utils/Filters/LocationsFilter';
import { SubTypeFilter } from '@Utils/Filters/SubtypeFilter';
import { UECRangeFilter } from '@Utils/Filters/UECRangeFilter';
// import { QueryNames } from '@Utils/QueryNames';
import React, { useState } from 'react';

// import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

type FilterListSelectionProps = {
  filterName: string;
};

export const FilterListSelection: React.FC<FilterListSelectionProps> = ({
  filterName,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  // const [filters] = useURLQuery();
  const [leaveTimeoutId, setLeaveTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'SubType':
        return <SubTypeFilter size="small" />;
      case 'Locations':
        return <LocationsFilter size="small" />;
      case 'Pay Range':
        return <UECRangeFilter size="small" innerSpace="dense" />;
    }
  };

  const filterComponent = getFilterComponent(filterName);

  // const getFilterCount = (filterName: string) => {
  //   switch (filterName) {
  //     case 'SubType':
  //       return filters.getAll(QueryNames.Subtype).length;
  //     case 'Locations':
  //       return filters.getAll(QueryNames.Locations).length;
  //     case 'Pay Range':
  //       return (
  //         (filters.has(QueryNames.UECRangeMax) ? 1 : 0) +
  //         (filters.has(QueryNames.UECRangeMin) ? 1 : 0)
  //       );
  //     default:
  //       return 0;
  //   }
  // };

  // const getFilterValues = (filterName: string) => {
  //   switch (filterName) {
  //     case 'SubType':
  //       return filters.getAll(QueryNames.Subtype);
  //     case 'Locations':
  //       return filters.getAll(QueryNames.Locations);
  //     case 'Pay Range':
  //       return [filters.get(QueryNames.UECRangeMin), filters.get(QueryNames.UECRangeMax)];
  //     default:
  //       return [];
  //   }
  // };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (leaveTimeoutId) {
      clearTimeout(leaveTimeoutId);
      setLeaveTimeoutId(null);
    }
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setAnchorEl(null);
      setOpen(false);
    }, 100);
    setLeaveTimeoutId(timeoutId);
  };

  // const filterValues = getFilterValues(filterName);
  // const isFiltersSet = (filterValues.length = 0);

  return (
    <Badge
      // badgeContent={getFilterCount(filterName)}
      color="error"
      max={99}
      overlap="circular"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          border: '2px solid',
          // borderColor: open || isFiltersSet ? 'secondary.main' : 'text.disabled',
          borderRadius: '5px',
          m: '.2em',
          p: '.5em',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Typography variant="body2">{filterName}</Typography>
        <PlayArrow fontSize="small" color={open ? 'secondary' : 'inherit'} />
        <Box sx={{ diaplay: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement="right"
            modifiers={[
              {
                name: 'offset',
                enabled: true,
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          >
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '.5em' }}>
              {filterComponent}
              {filterName !== 'Pay Range' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '200px',
                    mt: '.5em',
                    flexWrap: 'wrap',
                    borderTop: '2px solid',
                    borderBottom: '2px solid',
                    borderColor: 'secondary.dark',
                    borderRadius: '5px',
                    padding: '.5em',
                    // justifyContent: !isFiltersSet ? 'center' : '',
                    // alignItems: !isFiltersSet ? 'center' : '',
                  }}
                >
                  {/* {!isFiltersSet ? (
                    <Typography variant="body2">No Filters Set</Typography>
                  ) : (
                    filterValues.map((value, index) => (
                      <Chip
                        key={index}
                        label={value && value.charAt(0).toUpperCase() + value.slice(1)}
                        size={'small'}
                        variant="outlined"
                        color="secondary"
                        sx={{ m: '.2em' }}
                        //onDelete={}
                      />
                    ))
                  )} */}
                </Box>
              )}
            </Paper>
          </Popper>
        </Box>
      </Box>
    </Badge>
  );
};
