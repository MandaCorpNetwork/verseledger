import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

import { useURLQuery } from '@/Utils/Hooks/useURLQuery';

import { QueryNames } from '../../Utils/QueryNames';

type SortOption = {
  label: string;
  value: string;
};

type SortBySelectProps = {
  size: 'large' | 'medium' | 'small';
  containerSize: 'small' | 'medium';
  sortOptions: SortOption[];
};

export const SortBySelect: React.FC<SortBySelectProps> = ({
  size,
  sortOptions,
  containerSize,
}) => {
  const [filters, setFilters, overwriteURLQuery] = useURLQuery();
  const [sortDirection, setSortDirection] = React.useState('desc');

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    setFilters(QueryNames.SortDirection, sortDirection);
  };

  const handleSortChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value as string;
    if (newValue === '') {
      filters.delete(QueryNames.SortBy);
      filters.delete(QueryNames.SortDirection);
      overwriteURLQuery({ ...Object.fromEntries(filters.entries()) });
    } else {
      setFilters(QueryNames.SortBy, newValue);
      setFilters(QueryNames.SortDirection, sortDirection);
    }
  };

  const SortDirectionButton: React.FC = () => {
    return (
      <IconButton onClick={toggleSortDirection} size={size}>
        {sortDirection === 'desc' ? (
          <KeyboardDoubleArrowDown fontSize={size} />
        ) : (
          <KeyboardDoubleArrowUp fontSize={size} />
        )}
      </IconButton>
    );
  };
  return (
    <FormControl size={containerSize}>
      <InputLabel id="sort-by-label" color="secondary">
        Sort By
      </InputLabel>
      <Select
        autoWidth
        color="secondary"
        variant="outlined"
        label="Sort By"
        onChange={handleSortChange}
        sx={{
          minWidth: '100px',
          '&:hover': {
            boxShadow: '0 0 10px rgb(24,252,252)',
          },
        }}
        startAdornment={
          filters.has(QueryNames.SortBy) !== false && <SortDirectionButton />
        }
      >
        <MenuItem value="">None</MenuItem>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            dense
            sx={{ display: 'flex' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
