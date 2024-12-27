import { Box, styled, type SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyle: SxProps<Theme> = (_theme: Theme) => ({
  display: 'inline-flex',
  border: '1px solid',
  padding: '0 0.5em',
  gap: '0.2em',
  maxHeight: '120px',
});

export const PayDisplayBox = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyle(theme), 'PayDisplayBox'),
}));
