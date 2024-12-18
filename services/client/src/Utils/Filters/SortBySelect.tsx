import { useSoundEffect } from '@Audio/AudioManager';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type React from 'react';

type SortOption = {
  label: string;
  value: string;
};

type SortBySelectProps = {
  containerSize: 'small' | 'medium';
  sortOptions: SortOption[];
};

/** @deprecated */
export const SortBySelect: React.FC<SortBySelectProps> = ({
  sortOptions,
  containerSize,
}) => {
  const sound = useSoundEffect();
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
        onClick={() => sound.playSound('denied')}
        disabled
        sx={{
          minWidth: '100px',
          '&:hover': {
            boxShadow: '0 0 10px rgb(24,252,252)',
          },
        }}
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
