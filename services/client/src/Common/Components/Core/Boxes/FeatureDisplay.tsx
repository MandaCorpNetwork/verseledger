import { Box, styled, type SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyle: SxProps<Theme> = {} as SxProps<Theme>;

export const FeatureDisplay = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyle, 'FeatureDisplay'),
}));
