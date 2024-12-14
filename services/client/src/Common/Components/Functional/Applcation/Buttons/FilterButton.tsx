import { FilterAlt } from '@mui/icons-material';
import { Badge, IconButton, type IconButtonProps, useTheme } from '@mui/material';
import { useFilterUtils } from '@Utils/Hooks/useFilterUtils';
import type React from 'react';

export const FilterButton: React.FC<IconButtonProps> = (props) => {
  const theme = useTheme();
  const filterUtils = useFilterUtils();
  /** Uses filterCount Function from FilterUtils */
  const filterCount = filterUtils.filterCount();

  return (
    <Badge badgeContent={filterCount} color="error" variant="dot" overlap="circular">
      <IconButton
        color="secondary"
        size={theme.breakpoints.down('md') ? 'small' : 'medium'}
        {...props}
      >
        <FilterAlt />
      </IconButton>
    </Badge>
  );
};
