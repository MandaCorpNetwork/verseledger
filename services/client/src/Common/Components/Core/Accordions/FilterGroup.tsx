import { Accordion, type SxProps } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyle: SxProps<Theme> = (_theme: Theme) => ({
  boxShadow: 'none',
  background: 'transparent',
  border: 'none',
  '&:before': {
    display: 'none',
  },
});

/**
 * @description An Accordion for Displaying Filter Components in a Dropdown to keep the filters Organized and collapsable
 * ___
 * TODO:
 * Attempt Diving into Accordion Styles to correctly Style the different states.
 */
export const FilterGroup = styled(Accordion)(({ theme }) => ({
  ...generateStyles(theme, defaultStyle(theme), 'FilterGroup'),
}));
