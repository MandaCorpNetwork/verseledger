import { Stack, type SxProps } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = {
  alignItems: 'stretch',
  flexGrow: 1,
  padding: '0.5em',
  gap: '0.3em',
};

export const DropdownStack = styled(Stack)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles, 'DropdownStack'),
}));
