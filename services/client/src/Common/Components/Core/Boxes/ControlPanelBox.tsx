import { Box, styled, SxProps, Theme } from '@mui/material';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '0.3em 0.5em',
  gap: '0.3em',
};

export const ControlPanelBox = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles, 'ControlPanel'),
}));
