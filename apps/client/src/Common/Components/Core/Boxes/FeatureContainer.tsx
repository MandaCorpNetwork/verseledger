import { Box, styled, type SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};
export const FeatureContainer = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles, 'FeatureContainer'),
}));

export default FeatureContainer;
