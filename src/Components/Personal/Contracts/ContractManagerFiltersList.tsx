// ContractMangerFiltersList.tsx
import { LocationsFilter } from '@Common/Filters/LocationsFilter';
import { SubTypeFilter } from '@Common/Filters/SubTypeFilter';
import { UECRangeFilter } from '@Common/Filters/UECRangeFilter';
import { PlayArrow } from '@mui/icons-material';
import { Badge, Box, Chip, Paper, Popper, Typography } from '@mui/material';
import React, { useState } from 'react';

type ContractManagerFilterListProps = {
  isOpen: boolean;
  anchor: HTMLElement | null;
};

type FilterListSelectionProps = {
  filterName: string;
};

const FilterListSelection: React.FC<FilterListSelectionProps> = ({ filterName }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [leaveTimeoutId, setLeaveTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'Archytype':
        return (
          <SubTypeFilter
            value={selectedFilters}
            onChange={setSelectedFilters}
            size="small"
          />
        );
      case 'Locations':
        return (
          <LocationsFilter
            value={selectedFilters}
            onChange={setSelectedFilters}
            size="small"
          />
        );
      case 'PriceRange':
        return <UECRangeFilter />;
    }
  };

  const filterComponent = getFilterComponent(filterName);

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

  return (
    <Badge
      badgeContent={selectedFilters.length}
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
          borderColor:
            open || selectedFilters.length > 1 ? 'secondary.main' : 'text.disabled',
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
                  justifyContent: selectedFilters.length < 1 ? 'center' : '',
                  alignItems: selectedFilters.length < 1 ? 'center' : '',
                }}
              >
                {selectedFilters.length < 1 ? (
                  <Typography variant="body2">No Filters Set</Typography>
                ) : (
                  selectedFilters.map((filter, index) => (
                    <Chip
                      key={index}
                      label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                      size={'small'}
                      variant="outlined"
                      color="secondary"
                      sx={{ m: '.2em' }}
                      onDelete={() =>
                        setSelectedFilters((currentFilters) =>
                          currentFilters.filter((f) => f !== filter),
                        )
                      }
                    />
                  ))
                )}
              </Box>
            </Paper>
          </Popper>
        </Box>
      </Box>
    </Badge>
  );
};

export const ContractManagerFilterList: React.FC<ContractManagerFilterListProps> = ({
  isOpen,
  anchor,
}) => {
  return (
    <Popper open={isOpen} anchorEl={anchor} placement="bottom-start">
      <Paper sx={{ p: '.5em', display: 'flex', flexDirection: 'column' }}>
        <FilterListSelection filterName="Archytype" />
        <FilterListSelection filterName="Locations" />
        <FilterListSelection filterName="Pay Range" />
      </Paper>
    </Popper>
  );
};
