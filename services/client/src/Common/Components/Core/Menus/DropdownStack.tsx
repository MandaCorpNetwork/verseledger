import { Stack, SxProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = {
  alignItems: 'stretch',
  flexGrow: 1,
};

export const DropdownStack = styled(Stack)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles, 'DropdownStack'),
}));
