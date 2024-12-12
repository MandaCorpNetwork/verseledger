import { FilterAlt } from '@mui/icons-material';
import { IconButton, IconButtonProps, styled } from '@mui/material';
import { memo } from 'react';

export const FilterIconButton = memo((props: IconButtonProps) => (
  <IconButton {...props}>{props.children}</IconButton>
));

FilterIconButton.displayName = 'FilterIconButton';
