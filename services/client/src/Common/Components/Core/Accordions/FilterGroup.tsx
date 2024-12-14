import { Accordion, type SxProps } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

//TODO: Attempt Diving into Accordion Styles to correctly Style the different states.
const defaultStyle: SxProps<Theme> = (_theme: Theme) => ({
  boxShadow: 'none',
  background: 'transparent',
  border: 'none',
  '&:before': {
    display: 'none',
  },
});

export const FilterGroup = styled(Accordion)(({ theme }) => ({
  ...generateStyles(theme, defaultStyle(theme), 'FilterGroup'),
}));
