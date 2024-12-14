import { Accordion, type SxProps } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyle: SxProps<Theme> = (_theme: Theme) => ({});

export const FilterGroup = styled(Accordion)(({ theme }) => ({
  ...generateStyles(theme, defaultStyle(theme), 'FilterGroup'),
}));
