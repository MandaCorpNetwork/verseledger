import { Box, styled, SxProps, Theme } from '@mui/material';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  position: 'relative',
};

export const ComponentContainer = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles, 'ComponentContainer'),
}));
