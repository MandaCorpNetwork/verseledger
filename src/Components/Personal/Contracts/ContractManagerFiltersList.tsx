// ContractMangerFiltersList.tsx
import { LocationsFilter } from '@Common/Filters/LocationsFilter';
import { SubTypeFilter } from '@Common/Filters/SubTypeFilter';
import { UECRangeFilter } from '@Common/Filters/UECRangeFilter';
import { PlayArrow } from '@mui/icons-material';
import { Box, Paper, Popper, Typography } from '@mui/material';
import React from 'react';

type ContractManagerFilterListProps = {
  isOpen: boolean;
  anchor: HTMLElement | null;
};

type FilterListSelectionProps = {
  filterName: string;
};

const FilterListSelection: React.FC<FilterListSelectionProps> = ({ filterName }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const getFilterComponent = (filterName: string) => {
    switch (filterName) {
      case 'Archytype':
        return <SubTypeFilter />;
      case 'Locations':
        return <LocationsFilter />;
      case 'PriceRange':
        return <UECRangeFilter />;
    }
  };

  const filterComponent = getFilterComponent(filterName);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        mt: '.5em',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography variant="body2">{filterName}</Typography>
      <Box sx={{ diaplay: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PlayArrow fontSize="small" />
        <Popper open={open} anchorEl={anchorEl} placement="right-end">
          <Paper sx={{ p: '.5em' }}>
            {filterComponent}
            <Box></Box>
          </Paper>
        </Popper>
      </Box>
    </Box>
  );
};

export const ContractManagerFilterList: React.FC<ContractManagerFilterListProps> = ({
  isOpen,
  anchor,
}) => {
  return (
    <Popper open={isOpen} anchorEl={anchor} placement="bottom-start">
      <Paper sx={{ p: '.5em' }}>
        <FilterListSelection filterName="Archytype" />
        <FilterListSelection filterName="Locations" />
        <FilterListSelection filterName="Pay Range" />
      </Paper>
    </Popper>
  );
};
