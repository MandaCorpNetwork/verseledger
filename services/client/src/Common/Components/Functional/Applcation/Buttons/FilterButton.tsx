import { FilterAlt } from '@mui/icons-material';
import { Badge, IconButton, type IconButtonProps, useTheme } from '@mui/material';
import type React from 'react';

type FilterButtonProps = IconButtonProps & {
  filterCount: number;
};

export const FilterButton: React.FC<FilterButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <Badge
      badgeContent={props.filterCount}
      color="error"
      variant="dot"
      overlap="circular"
    >
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
