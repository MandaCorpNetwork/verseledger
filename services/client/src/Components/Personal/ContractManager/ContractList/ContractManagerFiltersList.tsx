// ContractMangerFiltersList.tsx
import { ClearOutlined } from '@mui/icons-material';
import { IconButton, Paper, Popper, Tooltip } from '@mui/material';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { FilterListSelection } from './FilterListSelection';

type ContractManagerFilterListProps = {
  isOpen: boolean;
  anchor: HTMLElement | null;
};

export const ContractManagerFilterList: React.FC<ContractManagerFilterListProps> = ({
  isOpen,
  anchor,
}) => {
  const [filters, , overwriteURLQuery] = useURLQuery();
  const handleFilterClear = () => {
    filters.delete(QueryNames.Subtype);
    filters.delete(QueryNames.Locations);
    filters.delete(QueryNames.UECRangeMax);
    filters.delete(QueryNames.UECRangeMin);
    const clearedFilters = { ...Object.fromEntries(filters.entries()) };
    overwriteURLQuery(clearedFilters);
  };

  const isFiltersSet =
    filters.has(QueryNames.Subtype) ||
    filters.has(QueryNames.Locations) ||
    filters.has(QueryNames.UECRangeMax) ||
    filters.has(QueryNames.UECRangeMin);

  return (
    <Popper open={isOpen} anchorEl={anchor} placement="bottom-start">
      <Paper
        sx={{ p: '.5em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Tooltip title="Clear Filters" arrow placement="right">
          <IconButton
            size="small"
            color="error"
            onClick={handleFilterClear}
            sx={{
              alignSelf: 'start',
              '& .MuiTouchRipple-child': {
                backgroundColor: 'error.main',
              },
            }}
            disabled={!isFiltersSet}
          >
            <ClearOutlined color={isFiltersSet ? 'error' : 'action'} fontSize="small" />
          </IconButton>
        </Tooltip>
        <FilterListSelection filterName="SubType" />
        <FilterListSelection filterName="Locations" />
        <FilterListSelection filterName="Pay Range" />
      </Paper>
    </Popper>
  );
};
