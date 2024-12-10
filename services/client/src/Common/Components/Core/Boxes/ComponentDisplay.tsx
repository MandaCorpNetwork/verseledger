import { Box, styled, SxProps, Theme } from '@mui/material';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
};

export const ComponentDisplay = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles, 'ComponentDisplay'),
}));

export default ComponentDisplay;
